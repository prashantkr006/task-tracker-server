const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env
const Task = require('../models/Task')
const mongoose = require('mongoose');


const authenticateUser = (req, res, next) => {
    const token = req.cookies.token; // JWT stored in the "token" cookie

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.jwtsecret); // Using the JWT secret from .env
        req.user = decodedToken; // Store user information in the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const authorizeUser = async (req, res, next) => {
    const token = req.cookies.token; // Get the token from the cookie
    const taskId = req.params.taskId;
    const userId = req.user.userId;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const task = await Task.findOne({ taskID: taskId, user: userId });
        if (!task) {
            console.log('Unauthorized Access');
            return res.status(403).json({ message: 'Forbidden' });
        }
        // User is authorized, continue to the next middleware/route handler
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { authenticateUser, authorizeUser };
