const mongoose = require('mongoose'),
    Post = require('./Post'),
    Comment = require('./Comment');

const { Schema } = mongoose;

// Schema
const UserSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    // GeoJSON
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        type: {
            type: String,
            default: 'Point',
        },
    },
}, { collection: 'users' });

// Middleware
// eslint-disable-next-line
UserSchema.pre('remove', async function () {
    const posts = await Post.find({ author: this._id });
    const postIds = posts.map(post => post._id);
    await Promise.all([
        Post.deleteMany({ _id: { $in: postIds } }),
        Comment.deleteMany({ post: { $in: postIds } }),
    ]);
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
