const VersionedBase = require('../versionedBase');
class PostService extends VersionedBase {
    constructor(postRepository) {
        const defaultHandlers = {
            v1: {
                createPost: this.createPostV1.bind(this),
                editPost: this.editPostV1.bind(this),
                deletePost: this.deletePostV1.bind(this),
                getPostByID: this.getPostByIDV1.bind(this),
            }
        };

        super({...defaultHandlers,...handlers });
        this.postRepository = postRepository;
    }

    //Create post
    async createPostV1(data) {
        try {
            const slug = generateSlug(data.title);
            data.slug = slug;
            const post = await this.postRepository.create(data);
            return post;
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    async editPostV1(data) {
        try {
            const result = await this.postRepository.edit(data);
            return result;
        }
        catch (error) {
            throw new Error(`Error editing post: ${error.message}`);
        }
    }

    async deletePostV1(data) {
        try {
            const result = await this.postRepository.delete(data);
            return result;
        }
        catch (error) {
            throw new Error(`Error deleting post: ${error.message}`);
        }
    }

    //Find posts
    async getPostByIDV1(conditions) {
        try {
            const result = await this.postRepository.find(conditions);
            return result;
        }
        catch (error) {
            throw new Error(`Error finding post: ${error.message}`);
        }
    }

    // Helper method to generate URL-friendly slugs
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}

module.exports = PostService;