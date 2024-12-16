const postSchema = require('../schemas/postSchema');
class Post extends BaseModel {
    
    constructor() {
        super('Post', postSchema);
    }

    updatePostContent(content, updatedAt) {
        this.content = content;
        this.updatedAt = updatedAt;
    }

    destroy() {
        
    }
}

module.exports = Post;