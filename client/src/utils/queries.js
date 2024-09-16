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
        _id
        dateCreated
        subject
        noteText
      }
      medications
      pharmacies {
      pharmacyName
      address
      state
      zipcode
      phone
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

export const QUERY_ALL_NOTES = gql`
  query getAllNotes {
    allNotes {
      _id
      subject
      noteText
      dateCreated
    }
  }
`;
