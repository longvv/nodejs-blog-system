const CommentService = require('./commentService');

class CommentServiceFactory {
    createServiceVersion1() {
        return new CommentService(new CommentRepository());
    }
}