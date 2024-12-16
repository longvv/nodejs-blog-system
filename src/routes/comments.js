const CommentControllerFactory = require('../controllers/comment/commentControllerFactory');
const CommentServiceFactory = require('../services/comment/commentServiceFactory');

class CommentRouter extends BaseRouter {
    constructor() {
        super();
        const serviceFactory = new CommentServiceFactory();
        const controllerFactory = new CommentControllerFactory(serviceFactory);
        this.markAsSupported('v1');
        this.registerVersion('v1', () => controllerFactory.createCommentControllerVersion1());
        this.defineRoutes();
    }

    defineRoutes() {
        this.get('/comments/:id', 'getCommentById');
    }
}

module.exports = CommentRouter;