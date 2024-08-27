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

export const RESET_PASSWORD = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      token
      patient {
        _id
        userName
        email
      }
    }
  }
`;

export const SAVE_NEW_PASSWORD = gql`
  mutation saveNewPassword(
    $newPassword: String!
    $patientId: ID!
    $token: String!
  ) {
    saveNewPassword(
      newPassword: $newPassword
      patientId: $patientId
      token: $token
    ) {
      token
      patient {
        _id
        userName
        email
      }
    }
  }
`;

export const CHANGE_ACCOUNT_DETAILS = gql`
  mutation changePatientAccountDetails(
    $_id: ID!
    $userName: String
    $email: String
    $password: String
  ) {
    changePatientAccountDetails(
      _id: $_id
      userName: $userName
      email: $email
      password: $password
    ) {
      _id
      userName
      email
      password
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deletePatientAccount($_id: ID!) {
    deletePatientAccount(_id: $_id) {
      _id
    }
  }
`;

export const ADD_PATIENT_NOTE = gql`
  mutation addChartNoteToPatient(
    $patientId: ID!
    $dateCreated: String!
    $subject: String!
    $noteText: String!
  ) {
    addChartNoteToPatient(
      patientId: $patientId
      dateCreated: $dateCreated
      subject: $subject
      noteText: $noteText
    ) {
      _id
      chartNotes {
        dateCreated
        subject
        noteText
      }
    }
  }
`;

export const ADD_PHARMACY = gql`
  mutation addPharmacy(
  $patientId: ID!
  $pharmacyName: String!
  $address: String!
  $state: String!
  $zipcode: Int!
  $phone: Int!
  ) {
  addPharmacy(
  patientId: $patientId
  pharmacyName: $pharmacyName
  address: $address
  state: $state
  zipcode: $zipcode
  phone: $phone
  ) {
  _id
  pharmacies{
  pharmacyName
  address
  state
  zipcode
  phone
  }
  }
  }
`;
