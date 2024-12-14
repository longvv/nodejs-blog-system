const helmets = require('helmet');
const express = require('express');
const cors = require('cors');
const {initializeValidationStrategies} = require('../src/validations/index');
require('dotenv').config();
const {connectDB} = require('../src/config/database');
const postRouter = require('../src/routes/posts');

const app = express();

// Middleware
app.use(helmets());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Register routers
app.use('/api/posts', postRouter);

//Get server heath
app.get('/health', (req, res, next) => {
    try {
        var _uptime = Math.round(process.uptime());
        res.json({
            status: 'OK',
            time: new Date(),
            uptime: _uptime,
        });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'Internal Server Error',
        error: err.message,
    });
});

app.use((err, req, res, next) => {
    res.status(400).json({
        status: 'Bad Request',
        error: err.message,
    });
});

const PORT = process.env.PORT;

connectDB().then(() => {
    // Initialize validation strategies
    initializeValidationStrategies();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        console.log('Database connected');
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});