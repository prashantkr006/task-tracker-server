// utils/logger.js
const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logStream = fs.createWriteStream(path.join(logsDirectory, 'app.log'), { flags: 'a' });

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;

  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

function error(message, error) { // Modified this line to include the error parameter
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${message}\n${error.stack}`; // Include the error stack

  console.error(logMessage);
  logStream.write(logMessage + '\n');
}

module.exports = {
  log,
  error,
};
