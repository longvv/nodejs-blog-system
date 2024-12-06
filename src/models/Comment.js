const commentSchema = require('../schemas/commentSchema');
class Comment extends baseModel {

    constructor(content, author, createdAt) {
        super('Comment', commentSchema);
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
    }

    updateComment(content, updatedAt) {
        this.content = content;
        this.updatedAt = updatedAt;
    }

    destroy() {
        
    }
}