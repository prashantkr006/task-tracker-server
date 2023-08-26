<h1>Task Tracker Backend Setup Guide</h1>

<p>This guide will walk you through the process of setting up the backend server for the Task-tracker project on your local machine. The backend server is built using Node.js and Express.</p>

<h2>Prerequisites</h2>

<p>Before you begin, make sure you have the following software installed on your machine:</p>

<ul>
  <li>Node.js: <a href="https://nodejs.org/">Download and install Node.js</a></li>
  <li>MongoDB: <a href="https://www.mongodb.com/try/download/community">Download and install MongoDB</a></li>
</ul>

<h2>Getting Started</h2>

<ol>
  <li><strong>Clone the Repository:</strong></li>
</ol>

<pre><code>git clone https://github.com/your-username/task-tracker-backend.git
cd task-tracker-backend
</code></pre>

<ol start="2">
  <li><strong>Install Dependencies:</strong></li>
</ol>

<pre><code>npm install
</code></pre>

<ol start="3">
  <li><strong>Configuration:</strong></li>
</ol>

<p>Create a <code>config.js</code> file in the root directory of the project. Add the following content to it:</p>

<pre><code>module.exports = {
    mongoURI: '<your-mongodb-uri>',
    jwtsecret: '<your-jwt-secret>'
}
</code></pre>

<p><strong>Note:</strong> Replace <code>&lt;your-mongodb-uri&gt;</code> with your MongoDB connection URI, and <code>&lt;your-jwt-secret&gt;</code> with a secure secret for JWT token generation.</p>
<p><em>Make sure to keep this file private and do not commit it to version control.</em></p>

<ol start="4">
  <li><strong>Start the Server:</strong></li>
</ol>

<pre><code>npm start
</code></pre>

<p>The server will start running on <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<h2>Usage</h2>

<p>Access the API at <a href="http://localhost:3000/api">http://localhost:3000/api</a>. You can use tools like <a href="https://www.postman.com/">Postman</a> to test the API endpoints.</p>

<h2>Additional Notes</h2>

<ul>
  <li>Make sure MongoDB is running. If not, start MongoDB using the appropriate command for your system.</li>
  <li>Do not commit sensitive information like MongoDB URIs and JWT secrets to version control. Use environment variables or other secure methods for production deployment.</li>
</ul>

<h2>Contributing</h2>

<p>If you'd like to contribute to this project, fork the repository, create a new branch, make your changes, and submit a pull request.</p>

<h2>License</h2>

<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
