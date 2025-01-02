import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import resolvers from "../schema/resolvers";
import jwt from "jsonwebtoken";
import { signPatientToken } from "../utils/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

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

describe("Save New Password", () => {
    it("should save a new password", async () => {
        const testPatient = new Patient({
            firstName: "John",
            lastName: "Doe",
            dob: new Date("1999-01-15"),
            userName: "testuser2",
            email: "johndoe@email.com",
            password: 'testuserpassword',
        });
        await testPatient.save();

        const testToken = {
            email: testPatient.email,
            userName: testPatient.userName,
            _id: testPatient._id
        };

        const token = await signPatientToken(testToken);

        console.log('PATIENT:' + testPatient);

        let newPassword = "testpassword234";
        testPatient.password = newPassword;

        const updatedPatient = await testPatient.save();

        console.log('UPDATED PATIENT PASSWORD:' + updatedPatient);

        const result = await resolvers.Mutation.saveNewPassword(null, {
            newPassword: updatedPatient.password, patientId: updatedPatient._id, token: token
        });

        expect(result).toBeDefined();

    })
})