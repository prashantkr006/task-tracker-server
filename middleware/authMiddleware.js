const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env

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

module.exports = { authenticateUser };
