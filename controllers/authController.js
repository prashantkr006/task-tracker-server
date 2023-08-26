// controllers/authController.js
const bcrypt = require('bcrypt');
const { validatePassword } = require('../utils/validation');
const jwtUtils = require('../utils/jwt');
const User = require('../models/User');
const logger = require('../utils/logger');


async function registerUser(req, res) {
  try {
    const { name, username, email, password } = req.body;

    // Check if the email or username is already in use
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }

    // Check password complexity
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a JWT token
    const token = jwtUtils.createToken({ userId: user._id });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    logger.error('An error occurred while processing login:', error); // Log the error
    res.status(500).json({ message: 'An error occurred on the server' });
  }

}

module.exports = {
  registerUser,
  loginUser
};
