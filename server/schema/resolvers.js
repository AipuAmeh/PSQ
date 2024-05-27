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
            if (error.code === 11000) {
                console.error('Duplicate key error:', error.message);
                // Handle the duplicate key error, e.g., send a user-friendly message
                throw new Error('Duplicate field value: ' + Object.keys(error.keyValue).join(', '));
            } else {
                console.error('Error adding patient:', error.message);
                throw new Error('Error adding patient');
            }
        }

    },
    addProvider: async (parent, { providerName, email, password }) => {
        const provider = await Provider.create({ providerName, email, password });
        const token = signProviderToken(provider);
        return { token, provider };
    }
}
};

export default resolvers;