import { gql } from "@apollo/client";

export const QUERY_PROVIDER = gql`
  query currentProvider($providerId: ID!) {
    provider(providerId: $providerId) {
      _id
      providerName
      password
      email
    }
  }
`;

export const QUERY_CURRENT_PATIENT = gql`
  query currentPatient($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      firstName
      lastName
      userName
      email
      password
      dob
      chartNotes {
        dateCreated
        subject
        noteText
      }
    }
  }
`;

export const QUERY_ALL_PATIENTS = gql`
  query getAllPatients {
    allPatients {
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
