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

describe("Delete Patient Account", () => {
    it("should delete a patient account", async () => {

        // create a test patient and save 
        const testPatient = new Patient({
            firstName: "John",
            lastName: "Doe",
            dob: new Date("1999-01-15"),
            userName: "testuser2",
            email: "johndoe@email.com",
            password: "testuserpassword",
        });
        await testPatient.save();

        // test deletePatient resolver using parameter of 
        // patient id
        const result = await resolvers.Mutation.deletePatientAccount(null, {
            _id: testPatient._id.toString()
        });

        expect(result).toBeDefined();

    })
})