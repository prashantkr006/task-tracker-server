// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config

function createToken(payload) {
  return jwt.sign(payload, process.env.jwtsecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.jwtsecret);
  } catch (error) {
    return null; // Token is invalid or expired
  }
}

module.exports = {
  createToken,
  verifyToken,
};
