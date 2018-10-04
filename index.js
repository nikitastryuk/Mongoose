require('dotenv').config();
const connectToMongoDb = require('./config/mongo'),
    findUsersWithinRadius = require('./challenges/challenge1'),
    findUserWithNewestPost = require('./challenges/challenge2'),
    Post = require('./models/Post'),
    Comment = require('./models/Comment');


(async () => {
    await connectToMongoDb();
    // await findUsersWithinRadius([-30, -50], 10000);
    await findUserWithNewestPost();
})();
