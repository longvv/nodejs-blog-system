const PostControllerFactory = require('../controllers/postControllerFactory');
const PostServiceFactory = require('../services/postServiceFactory');
const auth = require('../middleware/auth');

class PostRouter extends BaseRouter {
    constructor() {
        super();
        const serviceFactory = new PostServiceFactory();
        const controllerFactory = new PostControllerFactory(serviceFactory);
        this.markAsSupported('v1');
        this.registerVersion('v1', () => controllerFactory.createPostControllerVersion1());
        this.defineRoutes();
    }

    defineRoutes() {
        this.post('/posts', 'createPost', [auth]);
    }
}

module.exports = PostRouter;