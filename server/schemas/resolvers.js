// Import Thought & Users
const { User, Message, Appointment } = require('../models');

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

      //* Get all providers by specialty
      providers_by_spec: async (parent, { specialty }) => {
         const params = specialty ? { specialty } : {};
         return User.find(params).sort({ username: 1 });
      },

      //* Get all appointments by username and date
      getAppointments: async (parent, { username }) => {
         return Appointment.find({ username: username }).sort({ date: 1 });
      },

      //* Get all appointments by provider
      getApptsProvider: async (parent, { apptWith, apptDate }) => {
         return Appointment.find({ apptWith: apptWith, apptDate: apptDate }).sort({ date: 1 });
      },

      messages: async (parent, { username }) => {
         const params = username ? { username } : {};
         return Message.find(params).sort({ createdAt: -1 });
      },
      message: async (parent, { _id }) => {
         return Message.findOne({ _id });
      },
   },
   Mutation: {
      addUser: async (parent, args) => {
         const user = await User.create(args);
         const token = signToken(user);

         return { token, user };
      },

      addAppt: async (parent, args, context) => {
         console.log('file: resolvers.js ~ line 76 ~ args, context', args, context);
         if (context.user) {
            const appointment = await Appointment.create({ ...args, username: context.user.username });
            await User.findByIdAndUpdate(
               { _id: context.user._id },
               { $push: { appointments: appointment._id } },
               { new: true }
            );
            return appointment;
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      addMessage: async (parent, args, context) => {
         if (context.user) {
            // const thought = await Message.create({ ...astFromValue, username: context.user.username });
            const message = await Message.create({ ...args, username: context.user.username });

            await User.findByIdAndUpdate(
               { _id: context.user._id },
               { $push: { messages: message._id } },
               //! Without this flag, Mongo would return the original document instead
               //! of updated document.
               { new: true }
            );

            return message;
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
