require('dotenv').config();
const connectToMongoDb = require('./config/mongo'),
    // findUsersWithinRadius = require('./challenges/challenge1'),
    // findNewestPostAndAuthor = require('./challenges/challenge2'),
    // findUserTotal = require('./challenges/challenge3'),
    // deleteRandomUser = require('./challenges/challenge4'),
    getUsersAgeData = require('./challenges/challenge5');


(async () => {
    await connectToMongoDb();
    // await findUsersWithinRadius([-30, -50], 10000);
    // await findNewestPostAndAuthor();
    // await findUserTotal('5bb5e5a52ee64a13f077b456');
    // await deleteRandomUser();
    await getUsersAgeData();
})();
