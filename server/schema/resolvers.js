import Patient from '../models/Patient.js';
import Provider from '../models/Provider.js';
import { signPatientToken, signProviderToken } from '../utils/jwt.js';

const resolvers = {
Query: {
    patient: async (parent, { patientId }) => {
        return await Patient.findById({ _id: patientId });
    },
    provider: async (parent, { providerId }) => {
        return await Provider.findById({ _id: providerId });
    },
},
Mutation: {
    addPatient: async (parent, { firstName, lastName, dob, userName, email, password}) => {
        const patient = await Patient.create({ firstName, lastName, dob, userName, email, password });
        const token = await signPatientToken(patient);
        return { token, patient };
    },
    addProvider: async (parent, { providerName, email, password }) => {
        const provider = await Provider.create({ providerName, email, password });
        const token = await signProviderToken(provider);
        return { token, provider };
    }
}
};

export default resolvers;