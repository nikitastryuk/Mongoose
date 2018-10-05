const Post = require('../models/Post');

/*
Find the newest post and it's author.
Add related to found post only read comments.
Sort comments by timestamp.
*/
const findNewestPostAndAuthor = async () => {
    const post = await Post.aggregate([
        { $sort: { timestamp: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments',
            },
        },
        {
            $unwind: '$comments',
        },
        {
            $match: { 'comments.isRead': { $eq: true } },
        },
        {
            $sort: { 'comments.timestamp': -1 },
        },
        {
            $group: {
                _id: '$_id',
                content: { $first: '$content' },
                timestamp: { $first: '$timestamp' },
                author: { $first: '$author' },
                comments: { $push: '$comments' },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
            },
        },
        {
            $addFields: {
                author: { $arrayElemAt: ['$author', 0] },
            },
        },
        {
            $project: {
                'author.__v': false,
                'comments.__v': false,
                'comments.author': false,
                'comments.isRead': false,
                'comments.post': false,
            },
        },
    ]);
    console.log(post[0]);
};


module.exports = findNewestPostAndAuthor;
