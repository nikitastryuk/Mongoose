// Mongoose
const mongoose = require('mongoose');

// Set promises
mongoose.Promise = global.Promise;

mongoose.connection
    .once('open', () => console.info('Sucessfully connected to database'))
    .on('error', () => {
        throw new Error('Unable to connect to database');
    });

module.exports = db => mongoose.connect(process.env.DB || db, { useNewUrlParser: true });
