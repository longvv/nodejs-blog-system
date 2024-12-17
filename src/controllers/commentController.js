const VersionedBase = require('../versionedBase');
class CommentController extends VersionedBase {
    constructor(commentService, handlers = {}) {
        const defaultHandlers = {
            v1: {
                addComment: this.addCommentV1.bind(this),
                getCommentByID: this.getCommentsByIDV1.bind(this),
                editComment: this.editCommentV1.bind(this),
                deleteComment: this.deleteCommentV1.bind(this)
            }
        };

        super({...defaultHandlers,...handlers });
        this.commentService = commentService;
    }

    async addCommentV1(req, res, next) {
        try {
            const result = await this.commentService.execute('v1', 'addComment', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async editCommentV1(req, res, next) {
        try {
            const result = await this.commentService.execute('v1', 'editComment', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteCommentV1(req, res, next) {
        try {
            const result = await this.commentService.execute('v1', 'deleteComment', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getCommentsByIDV1(req, res, next) {
        try {
            const result = await this.commentService.execute('v1', 'getCommentsByID', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CommentController;