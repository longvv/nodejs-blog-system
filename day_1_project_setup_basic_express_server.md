1. Init project folder structure
   ```markdown
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
