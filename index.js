require('dotenv').config();
const connectToMongoDb = require('./config/mongo');

(async () => {
    await connectToMongoDb();
})();
