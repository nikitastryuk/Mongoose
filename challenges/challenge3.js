const Post = require('../models/Post'),
    mongoose = require('mongoose');

/*
Find user total likes, posts, comments
*/
const findUserTotal = async (userId) => {
    const id = mongoose.Types.ObjectId(userId);
    const total = await Post.aggregate([
        {
            $match: { author: { $eq: id } },
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments',
            },
        },
        {
            $group: {
                _id: null,
                totalLikes: {
                    $sum: { $size: '$likes' },
                },
                totalPosts: {
                    $sum: 1,
                },
                totalСomments: {
                    $sum: { $size: '$comments' },
                },
            },
        },
        {
            $project: {
                _id: false,
            },
        },
    ]);
    console.log(total[0]);
};


module.exports = findUserTotal;
