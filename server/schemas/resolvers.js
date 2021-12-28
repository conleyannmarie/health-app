// Import Thought & Users
const { User, Message } = require('../models');

// Import Authentication handling
const { AuthenticationError } = require('apollo-server-express');

//Import json web token function
const { signToken } = require('../utils/auth');
// const { astFromValue } = require('graphql');

const resolvers = {
   Query: {
      me: async (parent, args, context) => {
         if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }) //
               .select('-__v -password')
               .populate('messages') //
               .populate('providers');

            return userData;
         }

         throw new AuthenticationError('Not logged in');
      },

      messages: async (parent, { username }) => {
         const params = username ? { username } : {};
         return Message.find(params).sort({ createdAt: -1 });
      },
      message: async (parent, { _id }) => {
         return Message.findOne({ _id });
      },

      // Get all users
      users: async () => {
         return User.find() //
            .select('-__v -password')
            .populate('providers')
            .populate('messages');
      },

      // Get a User by username
      user: async (parent, { username }) => {
         return User.findOne({ username }) //
            .select('-__v -password')
            .populate('providers')
            .populate('messages');
      },
   },
   Mutation: {
      addUser: async (parent, args) => {
         const user = await User.create(args);
         const token = signToken(user);

         return { token, user };
      },

      addMessage: async (parent, args, context) => {
         if (context.user) {
            // const thought = await Thought.create({ ...astFromValue, username: context.user.username });
            const message = await Message.create({ ...args, username: context.user.username });

            await User.findByIdAndUpdate(
               { _id: context.user._id },
               { $push: { thoughts: message._id } },
               //! Without this flag, Mongo would return the original document instead
               //! of updated document.
               { new: true }
            );

            return message;
         }

         throw new AuthenticationError('You need to be logged in!');
      },

      addReply: async (parent, { messageId, replyBody }, context) => {
         if (context.user) {
            const updatedMessage = await Message.findOneAndUpdate(
               { _id: messageId },
               { $push: { replys: { replyBody, username: context.user.username } } },
               { new: true, runValidators: true }
            );

            return updatedMessage;
         }

         throw new AuthenticationError('You need to be logged in!');
      },

      addProvider: async (parent, { providerId }, context) => {
         if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $addToSet: { providers: providerId } },
               { new: true }
            ).populate('providers');

            return updatedUser;
         }

         throw new AuthenticationError('You need to be logged in!');
      },

      login: async (parent, { email, password }) => {
         const user = await User.findOne({ email });

         if (!user) {
            throw new AuthenticationError('Incorrect credentials');
         }

         const correctPw = await user.isCorrectPassword(password);

         if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
         }

         const token = signToken(user);
         return { token, user };
      },
   },
};

module.exports = resolvers;
