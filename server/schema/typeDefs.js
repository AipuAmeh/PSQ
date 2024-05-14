const typeDefs = `#graphql

type Provider {
    _id: ID
    providerName: String
    email: String
    password: String
    patients: [Patient]!
}

type Patient {
    _id: ID
    firstName: String
    lastName: String
    dob: String
    userName: String
    email: String
    password: String
}

type Query {
    patient(patientId: ID!): Patient
    provider(providerId: ID!): Provider 
}
`;

export default typeDefs;