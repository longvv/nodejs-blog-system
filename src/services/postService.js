class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    findPosts(conditions) {
        this.postRepository.find(conditions);
    }
}