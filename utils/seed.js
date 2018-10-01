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
    commentsCount = 3,
    users = [],
    posts = [],
    comments = [];

// Seed
(async () => {
    await connectToMongoDb('mongodb://localhost:27017/mongooseCrash');
    await dropCollections();
    await createUsers();
    await createPosts();
    await createComments();
    mongoose.connection.close();
})();

// Helpers
const dropCollections = async () => {
    const collections = await mongoose.connection.db.collections();
    await Promise.all(collections.map(collection => collection.remove()));
    console.log('Collections were removed');
};

const createUsers = async () => {
    // Create n users
    for (let i = 0; i < usersCount; i++) {
        // All users (global)
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
    // For each user
    for (let n = 0; n < users.length; n++) {
        // Current user posts
        const userPosts = [];
        // Create n posts
        for (let i = 0; i < postsCount; i++) {
            const newPost = new Post(
                {
                    content: faker.lorem.paragraph(),
                    timestamp: new Date(faker.date.between('2018-01-01', '2018-12-12')).getTime(),
                },
            );
            userPosts.push(newPost);
            // Create n likes
            for (let j = 0; j < likesCount; j++) {
                let randomIndex;
                do {
                    // Random again if not unique
                    randomIndex = Math.floor(Math.random() * users.length);
                } while (userPosts[i].likes.includes(users[randomIndex]._id));
                // Connect like to post
                userPosts[i].likes.push(users[randomIndex]._id);
            }
            // Connect user to post
            userPosts[i].author = users[n]._id;
        }
        // All posts (global)
        posts.push(...userPosts);
    }
    await Promise.all(posts.map(post => post.save()));
    console.log(`Posts for each user created: ${postsCount}`);
};

const createComments = async () => {
    // For each post
    for (let i = 0; i < posts.length; i++) {
        // Current post comments
        const postComments = [];
        // Create n posts
        for (let j = 0; j < commentsCount; j++) {
            const newComment = new Comment(
                {
                    content: faker.lorem.paragraph(),
                    timestamp: new Date(faker.date.between('2018-01-01', '2018-12-12')).getTime(),
                    post: posts[i]._id,
                    user: users[Math.floor(Math.random() * users.length)]._id,
                },
            );
            postComments.push(newComment);
        }
        // All comments (global)
        comments.push(...postComments);
    }
    await Promise.all(comments.map(comment => comment.save()));
    console.log(`Comments for each post created: ${commentsCount}`);
};
