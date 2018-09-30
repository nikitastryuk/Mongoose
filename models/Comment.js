const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const CommentSchema = Schema({
    content: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
}, { collection: 'comments' });

// Model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
