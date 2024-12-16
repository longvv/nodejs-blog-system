const PostService = require('./postService');
class PostServiceFactory {
    createPostServiceVersion1() {
        return new PostService(new PostRepository());
    }
}

module.exports = PostServiceFactory