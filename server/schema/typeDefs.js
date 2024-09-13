const typeDefs = `#graphql

type Pharmacy {
    _id: ID
    pharmacyName: String
    address: String
    state: String
    zipcode: Int
    phone: String
}


type ChartNote {
    _id: ID
    dateCreated: String
    subject: String
    noteText: String
}

type Provider {
    _id: ID
    providerName: String
    email: String
    password: String
    patients: [Patient]
}

type Patient {
    _id: ID
    firstName: String
    lastName: String
    dob: String
    userName: String
    email: String
    password: String
    chartNotes: [ChartNote]
    medications: [String]
    pharmacies: [Pharmacy]
}

type patientAuth {
    token: ID!
    patient: Patient
}

type providerAuth {
    token: ID!
    provider: Provider
}

type Query {
    patient(patientId: ID!): Patient
    provider(providerId: ID!): Provider 
    allPatients: [Patient]
}

type Mutation {
    addPatient(firstName:String!, lastName: String!, dob:String!,userName: String!, email: String!, password: String!): patientAuth
    addProvider(providerName: String!, email: String!, password: String!): providerAuth
    loginPatient(email: String!, password: String!): patientAuth
    loginProvider(email: String!, password: String!): providerAuth
    sendResetPasswordEmail(email: String!): patientAuth
    saveNewPassword(newPassword: String!, patientId: ID!, token: String!): patientAuth
    changePatientAccountDetails(_id: ID!, userName: String, email: String, password: String): Patient
    deletePatientAccount(_id: ID!): Patient
    addChartNoteToPatient(patientId: ID!, dateCreated: String!, subject: String!, noteText: String!): Patient
    addMedication(patientId: ID!, medications: String): Patient
    addPharmacy(patientId: ID!, pharmacyName: String!, address: String!, state: String!, zipcode: Int!, phone: String!): Patient
    editChartNote(noteId: ID!, dateCreated: String, subject: String, noteText: String): ChartNote
    deleteChartNote(noteId: ID!): ChartNote
}
`;

export default typeDefs;
