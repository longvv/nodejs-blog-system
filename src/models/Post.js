const postSchema = require('../schemas/postSchema');
class Post extends BaseModel {
    
    constructor(title, content, author) {
        super('Post', postSchema);
        this.title = title;
        this.content = content;
        this.author = author;
        this.status = 'draft';
        this.tags = [];
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