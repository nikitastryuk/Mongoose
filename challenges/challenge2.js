const User = require('../models/User');

/*
Find user with the newest post and post itself.
Total likes quantity.
Add related to found post unread comments.
Sort comments by timestamp.
*/
const findUserWithNewestPost = async () => {
    const user = await User.aggregate([
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'author',
                as: 'posts',
            },
        },
        {
            $unwind: '$posts',
        },
        {
            $sort: { 'posts.timestamp': -1 },
        },
        // {
        //     $project: {
        //         post: { $arrayElemAt: ['$posts', 0] },
        //     },
        // },
    ]);
    console.log(user);
};

module.exports = findUserWithNewestPost;
