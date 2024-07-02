import { gql } from "@apollo/client";

export const QUERY_PROVIDER = gql`
  query currentProvider($providerId: ID!) {
    provider(providerId: $providerId) {
      _id
      providerName
      email
    }
  }
`;

export const QUERY_CURRENT_PATIENT = gql`
  query currentPatient($patientId: ID!) {
    provider(patientId: $patientId) {
      _id
      firstName
      lastName
      userName
      email
      password
      dob
    }
  }
`;
