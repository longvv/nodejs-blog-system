const BaseRouter = require('./baseRouter');
const CommentController = require('../controllers/commentController');
const CommentService = require('../services/commentService');

class CommentRouter extends BaseRouter {
    constructor() {
        const service = new CommentService();
        super(CommentController, service);
        this.defineRoutes();
    }

    defineRoutes() {
        this.router.get('/comments/:id', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version,'getCommentById',req, res, next);
        });
    }
}

module.exports = CommentRouter;