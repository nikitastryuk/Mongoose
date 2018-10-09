const User = require('../models/User');

/*
Get users min,max,avg age
*/

const getUsersAgeData = async () => {
    const data = await User.aggregate([
        {
            $group: {
                _id: false,
                minAge: { $min: '$age' },
                maxAge: { $max: '$age' },
                avgAge: { $avg: '$age' },
            },

        },
        {
            $project: {
                _id: false,
            },
        },
    ]);
    console.log(data);
};

module.exports = getUsersAgeData;
