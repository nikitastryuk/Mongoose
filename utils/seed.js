// Imports
const faker = require('faker'),
    mongoose = require('mongoose'),
    User = require('../models/User'),
    Post = require('../models/Post'),
    Comment = require('../models/Comment'),
    connectToMongoDb = require('../config/mongo');

// Vars
const usersCount = 10,
    postsCount = 5,
    likesCount = 5,
    commentsCount = 5,
    users = [],
    posts = [],
    comments = [];

// Seed
(async () => {
    await connectToMongoDb('mongodb://localhost:27017/mongooseCrash');
    await dropCollections();
    await createUsers();
    await createPosts();
})();

// Helpers
const dropCollections = async () => {
    const collections = await mongoose.connection.db.collections();
    await Promise.all(collections.map(collection => collection.remove()));
    console.log('Collections were removed');
};

const createUsers = async () => {
    for (let i = 0; i < usersCount; i++) {
        users.push(
            new User(
                {
                    name: faker.name.findName(),
                    age: faker.random.number({
                        min: 10,
                        max: 50,
                    }),
                    location: {
                        type: 'Point',
                        coordinates: [faker.address.longitude(), faker.address.latitude()],
                    },
                },
            ),
        );
    }
    await Promise.all(users.map(user => user.save()));
    console.log(`Users created: ${usersCount}`);
};

const createPosts = async () => {
    for (let i = 0; i < postsCount; i++) {
        posts.push(
            new Post(
                {
                    content: faker.lorem.paragraph(),
                    timestamp: new Date(faker.date.between('2018-01-01', '2018-12-12')).getTime(),
                },
            ),
        );
        // Connect user to every single like
        for (let j = 0; j < likesCount; j++) {
            let randomIndex = Math.floor(Math.random() * users.length);
            // ReRand
            while (posts[i].likes.includes(users[randomIndex]._id)) {
                randomIndex = Math.floor(Math.random() * users.length);
            }
            posts[i].likes.push(users[randomIndex]._id);
        }
    }
    await Promise.all(posts.map(post => post.save()));
    console.log(`Posts for each user created: ${postsCount}`);
};
