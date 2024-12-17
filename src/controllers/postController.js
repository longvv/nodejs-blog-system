const VersionedBase = require('../versionedBase');
class PostController extends VersionedBase {
    constructor(postService, handlers = {}) {
        const defaultHandlers = {
            v1: {
                createPost: this.createPostV1.bind(this),
                editPost: this.editPostV1.bind(this),
                deletePost: this.deletePostV1.bind(this),
                getPostByID: this.getPostByIDV1.bind(this),
            }
        };

        super({...defaultHandlers,...handlers });
        this.postService = postService;
    }

    async createPostV1(req, res, next) {
        try {
            const { title, content, tags, user } = req.body;

            const postData = {
                title: title,
                content: content,
                author: user.id,
                status: tags,
            }

            const post = await this.postService.execute('v1', 'createPost', postData);

            res.status(201).json({
                message: 'Post created successfully',
                post: post
            });
            
        } catch (err) {
            next(err);
        }
    }

    async editPostV1(req, res, next) {
        try {
            const result = await this.postService.execute('v1', 'editPost', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async deletePostV1(req, res, next) {
        try {
            const result = await this.postService.execute('v1', 'deletePost', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getPostByIDV1(req, res, next) {
        try {
            const result = await this.postService.execute('v1', 'getPostByID', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PostController;