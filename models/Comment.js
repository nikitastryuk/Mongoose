const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const CommentSchema = Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    isRead: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
}, { collection: 'comments' });

// Model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
