# NodeJS Blog System

A complete blog system built with NodeJS, Express, and MongoDB during a 14-day learning journey.

## 🚀 Learning Progress
- [x] Day 1: Project Setup & Basic Express Server
- [x] Day 2: Async Programming & Basic Routing
- [ ] Day 3: Database Integration
- [ ] Day 4: Models & Basic CRUD
- [ ] Day 5: API Routes & Controllers
- [ ] Day 6: File Upload & Documentation
- [ ] Day 7: Authentication Setup
- [ ] Day 8: Authorization & Security
- [ ] Day 9: Comment System
- [ ] Day 10: Search & Advanced Features
- [ ] Day 11: Testing Setup
- [ ] Day 12: Performance Optimization
- [ ] Day 13: Deployment Preparation
- [ ] Day 14: Final Features & Polish

## 🛠 Tech Stack
- NodeJS
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Jest (Testing)
- Other dependencies will be added as we progress

## 📁 Project Structure
```markdown
blog-system/
├── src/
│   ├── config/
│   │   ├── database.js     # Database configuration
│   │   └── app.js         # App configuration
│   ├── models/
│   │   ├── User.js        # User model
│   │   ├── Post.js        # Blog post model
│   │   └── Comment.js     # Comment model
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   ├── posts.js       # Post management routes
│   │   └── comments.js    # Comment routes
│   ├── middleware/
│   │   ├── auth.js        # Authentication middleware
│   │   └── validation.js  # Input validation
│   ├── utils/
│   │   ├── logger.js      # Logging utility
│   │   └── helpers.js     # Helper functions
│   └── app.js             # Main application file
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
└── README.md
```

## 🚦 Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Setup environment variables (will be added)
4. Run development server: `npm run dev`

## 📝 Daily Progress Notes
### Day 1: Project Setup
- Initial project structure
```
# Create root directory
mkdir -p blog-system

# Create src directory and its subdirectories
cd blog-system
mkdir -p src/{config,models,controllers,routes,middleware,utils}
mkdir -p tests/{unit,integration}

# Create files in config
touch src/config/{database.js,app.js}

# Create files in models
touch src/models/{User.js,Post.js,Comment.js}

# Create files in controllers
touch src/controllers/{authController.js,postController.js,commentController.js}

# Create files in routes
touch src/routes/{auth.js,posts.js,comments.js}

# Create files in middleware
touch src/middleware/{auth.js,validation.js}

# Create files in utils
touch src/utils/{logger.js,helpers.js}

# Create main app file
touch src/app.js

# Create root files
touch {package.json,README.md}

# Verify structure
tree

```
- Basic Express server setup
```
cd nodejs-blog-system
npm install -y

```
```
Set start file for production and development in packet.json

"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}

```
- Add project dependency:
```
express: web API management 
corns: handle Cross-Origin Resource Sharing
dotenv: handle variable environment
helmet: handle security
nodemon: auto-reload whenever file changed

npm install express dotenv cors helmet
npm install --save-dev nodemon

```

- Environment configuration
```
create a file with .env and add variables

PORT=3000
NODE_ENV=development

```
  
- Add simple code to App.js and test
```
// src/app.js, import libraries, and framework need to be used.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Create an instance of express
const app = express();

// Middleware, use libraries in express instance created.
app.use(helmet()); // manage security
app.use(cors()); // handle cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check
// Get method with 2 params: endpoint and handler
// endpoint: '/health'
// handler has params: req and res within req is the request, and res is the response and next use to call next middleware action
app.get('/health', (req, res, next) => {
    try {
        res.json({
            status: 'OK',
            time: new Date(),
        });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
```
Run the server with dev mode

```
npm run dev
```
Open web browser and test
```
localhost:3000/health
```
### Day 2: Async Programming & Basic Routing

### Day 3: Database Integration
Data flow
![Designing data intensive application-2024-12-05-034330](https://github.com/user-attachments/assets/c45ec078-bb99-479f-a96c-4f441031d393)

We will use MongoDB for this project with the Mongoose libraries for database handling
```
npm install mongoose
```
First, we need to set MONGODB_URI in .env file
MONGODB_URI=mongodb://localhost:27017/blog_system
MONGODB_TEST_URI=mongodb://localhost:27017/blog_system_test
```
Go to the config folder and edit the database.js file

```

const mongoose = require('mongoose');

// Connect to the database
const connectDB = async () => {
    try {
        // Enable strict query mode for better error handling
        mongoose.set('strictQuery', true);

        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            // Configuration options for stable connection
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: `, conn.connection.host);

        // Handle connection events
        connection.on('disconnected', handleConnectionDisconnected);

        connection.on('connected', handleConnectionConnected);

        connection.on('error', handleConnectionError);
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

```

## 🧪 Testing
(Will be added as we implement testing)

## 📚 API Documentation
(Will be added as we build APIs)
