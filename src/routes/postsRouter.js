const BaseRouter = require('./baseRouter');
const PostController = require('../controllers/postController');
const PostService = require('../services/postService');
const auth = require('../middleware/auth');

class PostRouter extends BaseRouter {
    constructor() {
        const service = new PostService();
        super(PostController, service);
        this.defineRoutes();
    }

    defineRoutes() {
        this.router.post('/posts', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'createPost', [auth], req, res, next);
        });

        this.router.put('/posts', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'editPost', [auth], req, res, next);
        });

        this.router.delete('/posts', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'deletePost', [auth], req, res, next);
        });

        this.router.delete('/posts/:id', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'getPostByID', [auth], req, res, next);
        });
    }
}

module.exports = PostRouter;