const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticateUser, authorizeUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware for authenticating user
router.use(authenticateUser);

// Get all tasks
router.get('/', taskController.getTasks);

// Create a task
router.post('/create', authorizeUser, taskController.createTask);

// GET task by taskID
router.get('/:taskId', authorizeUser, taskController.getTaskById);

// Update a task
router.put('/update/:taskId', authorizeUser, taskController.updateTask);

// Delete a task
router.delete('/delete/:taskId', authorizeUser, taskController.deleteTask);

module.exports = router;
