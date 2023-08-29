// routes/signOutRoutes.js
const express = require('express');
const signOutController = require('../controllers/signOutController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware for authenticating user
router.use(authenticateUser);

router.get('/', signOutController.signOut);

module.exports = router;
