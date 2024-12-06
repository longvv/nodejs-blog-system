// src/schemas/postSchema.js
const mongoose = require('mongoose');

// Schema definition for blog posts
const postSchema = {
    title: {
        type: String,
        required: [true, 'Post title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Post content is required'],
        minlength: [10, 'Content must be at least 10 characters long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    tags: [{
        type: String,
        trim: true
    }],
    featuredImage: {
        type: String,
        default: null
    },
    viewCount: {
        type: Number,
        default: 0
    }
};

module.exports = postSchema;