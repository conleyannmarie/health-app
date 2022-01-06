import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
   query thoughts($username: String) {
      thoughts(username: $username) {
         _id
         thoughtText
         createdAt
         username
         reactionCount
         reactions {
            _id
            createdAt
            username
            reactionBody
         }
      }
   }
`;

export const QUERY_THOUGHT = gql`
   query thought($id: ID!) {
      thought(_id: $id) {
         _id
         thoughtText
         createdAt
         username
         reactionCount
         reactions {
            _id
            createdAt
            username
            reactionBody
         }
      }
   }
`;

export const QUERY_PROVIDERS_BY_SPEC = gql`
   query providers_by_spec($specialty: String!) {
      providers_by_spec(specialty: $specialty) {
         _id
         username
         email
         isProvider
         specialty
         npiNumber
      }
   }
`;

export const QUERY_GET_APPT = gql`
   query getAppointments($username: String!) {
      getAppointments(username: $username) {
         _id
         username
         apptDate
         apptTime
         apptWith
         confirmed
      }
   }
`;

export const QUERY_GET_APPT_PROVIDER = gql`
   query getApptsProvider($apptWith: String!, $apptDate: Date!) {
      getApptsProvider(apptWith: $apptWith, apptDate: $apptDate) {
         _id
         username
         apptDate
         apptTime
         apptWith
         confirmed
      }
   }
`;

export const QUERY_USER = gql`
   query user($username: String!) {
      user(username: $username) {
         _id
         username
         email
         friendCount
         friends {
            _id
            username
         }
         thoughts {
            _id
            thoughtText
            createdAt
            reactionCount
         }
      }
   }
`;

//! Because we aren't passing any variables to it, we can simply name the query, and GraphQL will handle the rest
//* ALL user's data for his/her personal profile page
export const QUERY_ME = gql`
   {
      me {
         _id
         username
         email
         friendCount
         thoughts {
            _id
            thoughtText
            createdAt
            reactionCount
            reactions {
               _id
               createdAt
               reactionBody
               username
            }
         }
         friends {
            _id
            username
         }
      }
   }
`;

export const QUERY_ME_BASIC = gql`
   {
      me {
         _id
         username
         email
         friendCount
         friends {
            _id
            username
         }
      }
   }
`;
