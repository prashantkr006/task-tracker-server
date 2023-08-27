const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require("dotenv").config();
const cors = require('cors');

const app = express();

// Set up CORS with dynamic origin
// app.use(cors({
//     origin: (origin, callback) => {
//         // Allow requests from localhost:3000 (your React app)
//         if (origin === 'http://localhost:3000') {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true, // Allow cookies to be sent
// }));
app.use(cors())

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// auth Routes
app.use('/auth', authRoutes);

// tasks routes
app.use('/tasks', taskRoutes);

// Connect to the MongoDB database using the configuration
mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
    console.log('Connected to Database');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
