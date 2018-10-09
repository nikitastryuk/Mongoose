const User = require('../models/User');

/*
Delete random user and all related collections
Pre remove middleware
*/
const deleteRandomUser = async () => {
    const usersCount = await User.countDocuments();
    const user = await User.findOne()
        .skip(Math.floor(Math.random() * usersCount))
        .limit(1);
    await user.remove();
};


module.exports = deleteRandomUser;
