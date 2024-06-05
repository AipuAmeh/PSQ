import Patient from '../models/Patient.js';
import Provider from '../models/Provider.js';
import { signPatientToken, signProviderToken } from '../utils/jwt.js';
import AuthenticationError from '../utils/error.js';

const resolvers = {
Query: {
    patient: async (parent, { patientId }) => {
        return await Patient.findById({ _id: patientId });
    },
    provider: async (parent, { providerId }) => {
        return await Provider.findById({ _id: providerId });
    },
    allPatients: async (parent) => {
        return Patient.find();
    }
},
Mutation: {
    addPatient: async (parent, { firstName, lastName, dob, userName, email, password}) => {
        try {
            const patient = await Patient.create({ firstName, lastName, dob, userName, email, password });
            const token = await signPatientToken(patient);
            console.log('ADDING PATIENT', patient);
            console.log('PATIENTS TOKEN', token);
            return { token, patient };    
        } catch (error) {
            console.log(error.message);
        }

    },
    addProvider: async (parent, { providerName, email, password }) => {
        const provider = await Provider.create({ providerName, email, password });
        const token = signProviderToken(provider);
        return { token, provider };
    },
    loginPatient: async (parent, { email, password }) => {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            throw AuthenticationError;
        };
        const correctPw = await patient.isCorrectPassword(password);
        if (!correctPw) {
            throw AuthenticationError;
        }
        const token = signPatientToken(patient);
        return { token, patient };
    },
    loginProvider: async (parent, { email, password }) => {
        const provider = await Provider.findOne({ email });
        if (!provider) {
            throw AuthenticationError;
        }
        const correctPw = await provider.isCorrectPassword(password);
        if (!correctPw) {
            throw AuthenticationError;
        };
        const token = signProviderToken(provider);
        return { token, provider };
    }
}
};

export default resolvers;