class PostRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    //Create a post
    async create(data, options) {
        try {
            return await this.model.create(data, options);
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    async findBySlug(slug) {
        return await this.model.findOne({ slug });
    }
}