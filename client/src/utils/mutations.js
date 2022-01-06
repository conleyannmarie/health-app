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

export const ADD_APPT = gql`
   mutation addAppt($username: String, $apptDate: Date!, $apptTime: String!, $apptWith: User!, $confirmed: Boolean!) {
      addAppt(username: $username, apptDate: $apptDate, apptTime: $apptTime, apptWith: $apptWith, confirmed: $confirmed)
   }
`;

