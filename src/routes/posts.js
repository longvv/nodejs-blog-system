const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const auth = require('../middleware/auth');

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postControllerVer1 = new PostController(postService);

// Middleware check version
const versionCheck = (req, res, next) => {
    const version = req.headers['accept-version'] || 'v1';
    
    switch(version) {
        case 'v1':
            req.controller = postControllerVer1;
            break;
        default:
            return res.status(400).json({ error: 'Unsupported API version' });
    }
    next();
};

// Apply middleware to all routes in this router
router.use(versionCheck);

// POST /posts
router.post('/posts', auth, postController.createPost.bind(postController));

module.exports = router;