const User = require('../models/User');

/*
Find all users within a radius and get distance to them (km).
Age within [10-20] range.
Split name to firstName and lastName.
Add posts related to all users.
Sort posts by timestamp.
Sort users by age.
*/

const findUsersWithinRadius = async (coordinates, radius) => {
    const users = await User.aggregate([
        {
            $geoNear: {
                near: { type: 'Point', coordinates },
                spherical: true,
                maxDistance: 1000 * radius,
                distanceField: 'distance',
                distanceMultiplier: 1 / 1000,
                query: { age: { $gte: 10, $lte: 20 } },
            },
        },
        {
            $addFields: {
                firstName: { $arrayElemAt: [{ $split: ['$name', ' '] }, 0] },
                lastName: { $arrayElemAt: [{ $split: ['$name', ' '] }, 1] },
            },
        },
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
        {
            $group: {
                _id: '$_id',
                firstName: { $first: '$firstName' },
                lastName: { $first: '$lastName' },
                distance: { $first: '$distance' },
                age: { $first: '$age' },
                posts: { $push: '$posts' },
            },
        },
        {
            $sort: { age: -1 },
        },
        {
            $project: {
                'posts.likes': false,
                'posts.__v': false,
            },
        },
    ]);
    users.forEach(user => console.log(user));
};

module.exports = findUsersWithinRadius;
