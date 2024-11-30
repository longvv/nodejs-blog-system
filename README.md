# NodeJS Blog System

A complete blog system built with NodeJS, Express, and MongoDB during a 14-day learning journey.

## 🚀 Learning Progress
- [x] Day 1: Project Setup & Basic Express Server
- [ ] Day 2: Async Programming & Basic Routing
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
// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet()); // Bảo mật cho ứng dụng
app.use(cors()); // Cho phép cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blog System API',
    version: '1.0.0',
    status: 'Active'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
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

## 🧪 Testing
(Will be added as we implement testing)

## 📚 API Documentation
(Will be added as we build APIs)
