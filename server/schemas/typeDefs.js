// import the gql tagged template function
const { gql } = require('apollo-server-express');
// const { Date } = require('graphql-scalars');

// create our typeDefs
const typeDefs = gql`
   scalar Date

   type Message {
      _id: ID
      messageText: String
      createdAt: String
      username: String
   }

   type User {
      _id: ID
      username: String
      email: String
      isProvider: Boolean
      specialty: String
      npiNumber: String
      appointments: [Appointment]
      messages: [Message]
   }

   type Appointment {
      _id: ID
      username: String
      apptDate: Date
      apptTime: String
      apptWith: String
      confirmed: Boolean
   }

   type Query {
      me: User
      users: [User]
      user(username: String!): User
      messages(username: String): [Message]
      message(_id: ID!): Message
      providers_by_spec(specialty: String): [User]
      provider(username: String!, isProvider: Boolean!, specialty: String!): User
      getAppointments(username: String!): [Appointment]
      getApptsProvider(apptWith: String!, apptDate: Date!): [Appointment]
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(
         username: String!
         email: String!
         password: String!
         isProvider: Boolean
         specialty: String
         npiNumber: String
      ): Auth
      addAppt(username: String, apptDate: Date!, apptTime: String!, apptWith: String, confirmed: Boolean!): Appointment
      addMessage(messageText: String!): Message
      addProvider(providerId: ID!): User
   }

   type Auth {
      token: ID!
      user: User
   }
`;

// export the typeDefs
module.exports = typeDefs;
