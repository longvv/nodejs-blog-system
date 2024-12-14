class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    //POST /posts
    async createPost(req, res, next) {
        try {
            const { title, content, tags, user } = req.body;

            const postData = {
                title: title,
                content: content,
                author: user.id,
                status: tags,
            }

            const post = await this.postService.createPost(postData);

            res.status(201).json({
                message: 'Post created successfully',
                post: post
            });
            
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PostController;