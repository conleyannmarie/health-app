import { gql } from '@apollo/client';
const { Date } = require('graphql-scalars');

export const LOGIN_USER = gql`
   mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         token
         user {
            _id
            username
         }
      }
   }
`;

export const ADD_USER = gql`
   mutation addUser(
      $username: String!
      $email: String!
      $password: String!
      $isProvider: Boolean
      $specialty: String
      $npiNumber: String
   ) {
      addUser(
         username: $username
         email: $email
         password: $password
         isProvider: $isProvider
         specialty: $specialty
         npiNumber: $npiNumber
      ) {
         token
         user {
            _id
            username
         }
      }
   }
`;

export const ADD_APPT = [
   Date,
   gql`
      mutation addAppt(
         $username: String!
         $apptDate: Date!
         $apptTime: String!
         $apptWith: User!
         $confirmed: Boolean!
      ) {
         addAppt(
            username: $username
            apptDate: $apptDate
            apptTime: $apptTime
            apptWith: $apptWith
            confirmed: $confirmed
         )
      }
   `,
];

export const ADD_FRIEND = gql`
   mutation addFriend($id: ID!) {
      addFriend(friendId: $id) {
         _id
         username
         friendCount
         friends {
            _id
            username
         }
      }
   }
`;

export const ADD_THOUGHT = gql`
   mutation addThought($thoughtText: String!) {
      addThought(thoughtText: $thoughtText) {
         _id
         thoughtText
         createdAt
         username
         reactionCount
         reactions {
            _id
         }
      }
   }
`;

export const ADD_REACTION = gql`
   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
      addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
         _id
         reactionCount
         reactions {
            _id
            reactionBody
            createdAt
            username
         }
      }
   }
`;
