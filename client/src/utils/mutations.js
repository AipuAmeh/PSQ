import { gql } from "@apollo/client";

export const ADD_PROVIDER = gql`
  mutation addProvider(
    $providerName: String!
    $email: String!
    $password: String!
  ) {
    addProvider(
      providerName: $providerName
      email: $email
      password: $password
    ) {
      token
      provider {
        _id
        providerName
        email
      }
    }
  }
`;

export const ADD_PATIENT = gql`
  mutation addPatient(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $dob: String!
    $email: String!
    $password: String!
  ) {
    addPatient(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      dob: $dob
      email: $email
      password: $password
    ) {
      token
      patient {
        _id
        firstName
        lastName
        userName
        email
      }
    }
  }
`;

export const LOGIN_PATIENT = gql`
  mutation loginPatient($email: String!, $password: String!) {
    loginPatient(email: $email, password: $password) {
      token
      patient {
        _id
        firstName
        lastName
        userName
        email
      }
    }
  }
`;

export const LOGIN_PROVIDER = gql`
  mutation loginProvider($email: String!, $password: String!) {
    loginProvider(email: $email, password: $password) {
      token
      provider {
        _id
        providerName
        email
      }
    }
  }
`;
