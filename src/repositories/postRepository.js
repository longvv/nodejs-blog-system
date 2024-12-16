const Post = require('../models/Post');
class PostRepository extends BaseRepository {
    constructor() {
    }

    //Create a post
    async create(data, options) {
        try {
            const model = await Post();
            return await model.create(data, options);
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    async findBySlug(slug) {
        return await this.getModel().findOne({ slug });
    }
}

module.exports = PostRepository;