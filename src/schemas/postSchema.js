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

// Add indexes for performance optimization
const indexes = [
    // Compound index for efficient querying by status and date
    { status: 1, createdAt: -1 },
    
    // Text index for full-text search
    {
        title: 'text',
        content: 'text',
        tags: 'text'
    },
    
    // Index for slug lookups
    { slug: 1 },
    
    // Compound index for author's posts
    { author: 1, createdAt: -1 }
];


module.exports = {
    schema: postSchema,
    indexes: indexes
};