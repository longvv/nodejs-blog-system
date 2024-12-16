const PostController = require('./postController');
class PostControllerFactory {
    constructor(serviceFactory) {
        this.serviceFactory = serviceFactory;
    } 

    createPostControllerVersion1() {
        const service = this.serviceFactory.createServiceVersion1();
        return new PostController(service);
    }
}

module.exports = PostControllerFactory