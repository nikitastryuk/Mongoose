const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const PostSchema = Schema({
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, { collection: 'posts' });

// Model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
