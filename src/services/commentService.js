const VersionedBase = require('../versionedBase');
class CommentService extends VersionedBase {
    constructor(commentRepository) {
        const defaultHandlers = {
            v1: {
                addComment: this.addCommentV1.bind(this),
                getCommentByID: this.getCommentsByIDV1.bind(this),
                editComment: this.editCommentV1.bind(this),
                deleteComment: this.deleteCommentV1.bind(this)
            }
        };

        super({...defaultHandlers,...handlers });
        this.commentRepository = commentRepository;
    }

    async addCommentV1(data) {
        // Implement adding comment logic
    }

    async editCommentV1(data) {
        // Implement updating comment logic
    }

    async deleteCommentV1(data) {
        // Implement deleting comment logic
    }

    async getCommentsByIDV1(data) {
        // Implement adding comment logic
    }
}

module.exports = CommentService;