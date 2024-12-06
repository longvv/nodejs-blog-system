const commentSchema = require('../schemas/commentSchema');
class Comment extends baseModel {

    constructor(content, author) {
        super('Comment', commentSchema);
        this.content = content;
        this.author = author;
    }

    updateComment(content) {
        try {
            this.getValidationStrategy().validateContent(content).then(() => {
                this.content = content;
                this.save();
            }).catch(err => {
                console.error('Failed to update comment:', err.message);
            });
        } catch (error) {
            throw new Error('Invalid commnent: ' + error.message);
        }
    }

    destroy() {

    }
}