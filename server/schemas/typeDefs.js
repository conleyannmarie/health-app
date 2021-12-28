// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
   type User {
      _id: ID
      username: String
      email: String
      doctorCount: Int
      messages: [Message]
      doctors: [User]
   }

   type Message {
      _id: ID
      messageText: String
      createdAt: String
      username: String
      replyCount: Int
      replys: [Reply]
   }

   type Reply {
      _id: ID
      replyBody: String
      createdAt: String
      username: String
   }

   type Query {
      me: User
      users: [User]
      user(username: String!): User
      messages(username: String): [Message]
      message(_id: ID!): Message
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      addMessage(messageText: String!): Message
      addReply(messageId: ID!, replyBody: String!): Message
      addDoctor(doctorId: ID!): User
   }

   type Auth {
      token: ID!
      user: User
   }
`;

// export the typeDefs
module.exports = typeDefs;
