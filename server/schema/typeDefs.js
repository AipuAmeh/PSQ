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

type patientAuth {
    token: ID!
    patient: Patient
}

type Query {
    patient(patientId: ID!): Patient
    provider(providerId: ID!): Provider 
}

type Mutation {
    addPatient(firstName:String!, lastName: String!, dob:String!,userName: String!, email: String!, password: String!): patientAuth

}
`;

export default typeDefs;