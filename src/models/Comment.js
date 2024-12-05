class Comment {
    commentText
    author
    #createdAt
    #updatedAt

    constructor(commentText, author, createdAt) {
        this.commentText = commentText;
        this.author = author;
        this.createdAt = createdAt;
    }

    updateComment(comment, updatedAt) {
        this.commentText = commentText;
        this.updatedAt = updatedAt;
    }

    destroy() {
        
    }
}