const faker = require('faker');

const db = require('../config/connection');
const { Message, User } = require('../models');

db.once('open', async () => {
  await Message.deleteMany({});
  await User.deleteMany({});

  //? create user data (50 users?)
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create providers
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let providerId = userId;

    while (providerId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      providerId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { providers: providerId } });
  }

  // create messages
  let createdMessage = [];
  for (let i = 0; i < 100; i += 1) {
    const messageText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdMessage = await Message.create({ messageText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { messages: createdMessage._id } }
    );

    createdMessages.push(createdMessage);
  }

  // create replies
  for (let i = 0; i < 100; i += 1) {
    const replyBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomMessageIndex = Math.floor(Math.random() * createdMessages.length);
    const { _id: messageId } = createdMessages[randomMessageIndex];

    await Message.updateOne(
      { _id: messageId },
      { $push: { replies: { replyBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
