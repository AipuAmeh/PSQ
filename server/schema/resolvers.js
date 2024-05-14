import Patient from '../models/Patient.js';
import Provider from '../models/Provider.js';

const resolvers = {
Query: {
    patient: async (parent, { patientId }) => {
        const patient = Patient.findById({ id: patientId });
        console.log('PATIENT', patient)
    },
    provider: async (parent, { providerId }) => {
        const provider = Patient.findById({ id: patientId });
        console.log('PROVIDER', provider)
    },
}
};

export default resolvers;