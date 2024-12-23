const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Connect to the database
const connectDB = async () => {
    try {
        // Enable strict query mode for better error handling
        mongoose.set('strictQuery', true);

        // Log environment information for debugging
        const mongoURI = process.env.MONGODB_URI;

        const connection = await mongoose.connect(mongoURI);

        console.log(`MongoDB Connected: `, connection.connection.host);

        // Handle connection events
        connection.connection.on('disconnected', handleConnectionDisconnected);

        connection.connection.on('connected', handleConnectionConnected);

        connection.connection.on('error', handleConnectionError);
    }
    catch (err) {
        handleConnectionException(err);
        process.exit(1);
    }
}

// Check connection is ready connected
const checkConnection = () => {
    return mongoose.connect.readystate === STATES.connected;
}

const disconnectDatabase = async () => {
    try {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
    catch (err) {
        console.log('disconnect database error: ', err.message);
    }
}

const clearDatabase = () => {
    mongoose.connection.db.dropDatabase();
    console.log('Database cleared');
}

// Observable connection events
function handleConnectionConnected() {
    console.log('MongoDB connection established');
}

function handleConnectionDisconnected() {
    console.log('MongoDB connection lost');
}

function handleConnectionError(err) {
    console.error('MongoDB connection error:', err.message);
}

function handleConnectionException(err) {
    console.error('Could not connect to MongoDB:', err.message);
}


// Public functions
module.exports = {
    connectDB,
    disconnectDatabase,
    checkConnection,
    clearDatabase,
};