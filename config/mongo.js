// Mongoose
const mongoose = require('mongoose');

// Set promises
mongoose.Promise = global.Promise;
// createIndex() instead of ensureIndex()
mongoose.set('useCreateIndex', true);

mongoose.connection
    .once('open', () => console.log('Sucessfully connected to database'))
    .on('error', () => console.log('Unable to connect to database'));

module.exports = db => mongoose.connect(process.env.DB || db, { useNewUrlParser: true });
