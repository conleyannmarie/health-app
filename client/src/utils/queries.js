import { gql } from '@apollo/client';

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

// Query specialties
export const QUERY_GET_SPEC = gql`
   query providers_by_spec($specialty: String) {
      providers_by_spec(specialty: $specialty) {
         specialty
      }
   }
`;

//doctors in tables
export const QUERY_USER = gql`
   query user($username: String!) {
      user(username: $username) {
         _id
         username
         email
      }
   }
`;

export const QUERY_USER_BY_ID = gql`
   query userById($id: ID!) {
      userById(_id: $id) {
         _id
         username
         email
         isProvider
         specialty
         npiNumber
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
      }
   }
`;

export const QUERY_ME_BASIC = gql`
   {
      me {
         _id
         username
         email
      }
   }
`;
