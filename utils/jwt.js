// utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(payload) {
  return jwt.sign(payload, config.jwtsecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtsecret);
  } catch (error) {
    return null; // Token is invalid or expired
  }
}

module.exports = {
  createToken,
  verifyToken,
};
