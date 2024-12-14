const postSchema = require('../schemas/postSchema');
class Post extends BaseModel {
    
    constructor(title, content, tags, status, author) {
        super('Post', postSchema);
        this.title = title;
        this.content = content;
        this.status = status;
        this.tags = tags;
        this.author = author,
        this.featuredImage = null;
        this.viewCount = 0;
    }

    updatePostContent(content, updatedAt) {
        this.content = content;
        this.updatedAt = updatedAt;
    }

    destroy() {
        
    }
}