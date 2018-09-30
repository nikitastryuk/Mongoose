const mongoose = require('mongoose');

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
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
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

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
