class PostRepository extends BaseRepository {
    constructor(model, options) {
        super(model);
    }

    async findBySlug(slug) {
        return await this.model.findOne({ slug });
    }
}