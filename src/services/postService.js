class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    //Create post
    async createPost(postData) {
        try {
            const slug = generateSlug(postData.title);
            postData.slug = slug;
            const post = await this.postRepository.create(postData);
            return post;
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    //Get post

    //Update post

    //Delete post

    //Find posts
    findPosts(conditions) {
        this.postRepository.find(conditions);
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