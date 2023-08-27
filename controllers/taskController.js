const Task = require('../models/task');
const { validateRequiredField } = require('../utils/validationUtils');
const { sendErrorResponse } = require('../utils/errorUtils'); // Import the sendErrorResponse function
const logger = require('../utils/logger'); // Import the logger
const Sequence = require('../models/Sequence');

const getNextTaskID = async () => {
    const sequenceName = 'taskID'; // Name of the sequence
    let sequence = await Sequence.findOneAndUpdate(
        { collectionName: sequenceName },
        { $inc: { value: 1 } },
        { new: true }
    );

    if (!sequence) {
        // If no sequence document exists, create one
        sequence = new Sequence({ collectionName: sequenceName, value: 1 });
        await sequence.save();
    }

    return sequence.value;
};


const taskController = {
    createTask: async (req, res) => {
        try {

            const nextTaskID = await getNextTaskID();
            req.body.taskID = nextTaskID;

            // Validate required fields
            validateRequiredField(req.body, 'title');
            validateRequiredField(req.body, 'description');
            validateRequiredField(req.body, 'priority');

            // Create the task with the generated sequence value
            const newTask = new Task(req.body);
            // Create the task
            await newTask.save();
            res.status(201).json(newTask);
        } catch (error) {
            logger.error('Error creating task', error);
            sendErrorResponse(res, 500, 'Error creating task', error.message);
        }
    },

    getTasks: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const sortBy = req.query.sortBy || 'dueDate';
            const sortOrder = req.query.sortOrder || 'asc';
            const priorityFilter = req.query.priority;

            const totalCount = await Task.countDocuments();
            const totalPages = Math.ceil(totalCount / pageSize);

            let query = Task.find();

            // Add priority filter if provided
            if (priorityFilter) {
                query = query.where('priority', priorityFilter);
            }


            // Sorting logic
            const sortOptions = {};
            if (sortBy === 'dueDate' || sortBy === 'priority') {
                sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
                if (sortBy === 'priority') {
                    // Map priority values to numerical values for sorting
                    sortOptions['priority'] = {
                        low: 1,
                        medium: 2,
                        high: 3
                    };
                }
            }

            query = query.sort(sortOptions);

            // Pagination logic
            const tasks = await query
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            res.json({
                tasks,
                totalPages,
                currentPage: page,
                pageSize,
                totalCount,
            });
        } catch (error) {
            logger.error('Error fetching tasks', error);
            sendErrorResponse(res, 500, 'Error fetching tasks', error.message);
        }
    },

    getTaskById: async (req, res) => {
        try {
            const taskId = req.params.taskId;

            const task = await Task.findOne({ taskID: taskId });

            if (!task) {
                return sendErrorResponse(res, 404, 'Task not found');
            }

            res.json(task);
        } catch (error) {
            logger.error('Error getting task by ID', error);
            sendErrorResponse(res, 500, 'Error getting task by ID', error);
        }
    },

    updateTask: async (req, res) => {
        try {
            const taskId = req.params.taskId;
            const { status, dueDate, completed, subtasks } = req.body;

            const task = await Task.findOne({ taskID: taskId });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update completed field of subtasks based on the main task's completed value
            if (completed !== undefined) {
                task.completed = completed;

                if (completed) {
                    // Set all subtasks' completed to true if the main task is completed
                    task.subtasks.forEach(subtask => {
                        subtask.completed = true;
                    });
                    task.status = 'completed';
                } else {
                    // Check if any subtask is not completed
                    const anySubtaskIncomplete = task.subtasks.some(subtask => !subtask.completed);

                    // Update main task's status based on subtask completion
                    if (anySubtaskIncomplete) {
                        task.status = 'pending';
                    } else {
                        task.status = 'completed';
                    }
                }
            }

            // Update other fields if provided
            if (status) task.status = status;
            if (dueDate) task.dueDate = dueDate;
            if (subtasks) {
                task.subtasks = subtasks;

                // If new subtasks are added, set task's completed to false and status to pending
                if (!completed && subtasks.some(subtask => !subtask.completed)) {
                    task.completed = false;
                    task.status = 'pending';
                }
            }

            const updatedTask = await task.save();

            res.json(updatedTask);
        } catch (error) {
            logger.error('Error updating task', error);
            sendErrorResponse(res, 500, 'Error updating task', error);
        }
    },

    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.taskId;
            
            const deletedTask = await Task.findOneAndDelete({ taskID: taskId });
    
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            logger.error('Error deleting task', error);
            sendErrorResponse(res, 500, 'Error deleting task', error.message);
        }
    }    
};

module.exports = taskController;
