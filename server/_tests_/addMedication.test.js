import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import resolvers from "../schema/resolvers";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Patient.deleteMany({});
});

describe("Add Medication to Patient", () => {
    it("should return a patient with an added medication", async () => {
        // create patient and save to database
        const patient = new Patient({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            dob: new Date('1999-01-16'),
            username: 'testuser',
            password: 'testuserpassword',
          });
          await patient.save();
        // set medication name to const variable
        const medication = 'Lisinopril'
        // set results to resolver mutation 
        const results = await resolvers.Mutation.addMedication(null, {
            patientId: patient._id,
            medications: medication
        });

        // verify results are defined
        expect(results).toBeDefined();
        expect(results.medications[0]).toBe(medication);
    })
})
