const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware for authenticating user
router.use(authenticateUser);

// Create a task
router.post('/create', taskController.createTask);

// Get all tasks
router.get('/', taskController.getTasks);

// GET task by taskID
router.get('/:taskId', taskController.getTaskById);

// Update a task
router.put('/update/:taskId', taskController.updateTask);

// Delete a task
router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;
