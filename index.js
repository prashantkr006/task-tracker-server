const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const signoutRoute = require('./routes/signoutRoute')
require("dotenv").config();
const cors = require('cors');

const app = express();

//setup CORS origin
const allowedOrigins = ['http://localhost:3000', 'https://task-tracks.netlify.app'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// auth Routes
app.use('/auth', authRoutes);

// tasks routes
app.use('/tasks', taskRoutes);

// signout routes
app.use('/signout', signoutRoute);

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
