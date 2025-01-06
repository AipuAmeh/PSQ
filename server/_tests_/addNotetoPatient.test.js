import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import ChartNote from "../models/ChartNote";
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
    await ChartNote.deleteMany({});
});

describe("Add a Chart Note to a Patient", () => {
    it("should add a chart note to patient account", async () => {
        // create a chart note
        const chartNote1 = new ChartNote({
            dateCreated: new Date(),
            subject: 'Test Note 1',
            noteText: 'This is a test note content 1',
          });
          await chartNote1.save();

        // create a patient
        const patient = new Patient({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            dob: new Date('1999-01-16'),
            username: 'testuser',
            password: 'testuserpassword',
          });
          await patient.save();

        // find patient and add chart note to set and populate chart 
        // notes
        const results =  await resolvers.Mutation.addChartNoteToPatient(null, {
            patientId: patient._id,
            dateCreated: chartNote1.dateCreated,
            subject: chartNote1.subject,
            noteText: chartNote1.noteText
        });

        expect(results).toBeDefined();
        expect(patient).toBeDefined();
        expect(chartNote1).toBeDefined();
    })
})