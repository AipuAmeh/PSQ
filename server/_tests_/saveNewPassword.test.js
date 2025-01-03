import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import resolvers from "../schema/resolvers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signPatientToken } from "../utils/jwt";

const JWT_SECRET = "testsecret";

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

        // create an original password
        const originalPassword = 'testuserpassword';
        // hash password and place into new patient object
        // like model does in 'pre save'
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        // create a test patient and save them
        const testPatient = new Patient({
            firstName: "John",
            lastName: "Doe",
            dob: new Date("1999-01-15"),
            userName: "testuser2",
            email: "johndoe@email.com",
            password: hashedPassword,
        });
        await testPatient.save();

        // generate token using JWT
        const tokenPayload = {
            email: testPatient.email,
            userName: testPatient.userName,
            _id: testPatient._id
        };
        const token = await signPatientToken(tokenPayload);

        // create a new password that we want to save and update
        // test patient with
        let newPassword = "testpassword234";

        // test the saveNewPassword resolver using parameters
        // set patient ID to String to stringify the ID for
        // identification
        const result = await resolvers.Mutation.saveNewPassword(null, {
            newPassword, 
            patientId: testPatient._id.toString(), 
            token
        });

          // Verify results
    const updatedPatient = await Patient.findById(testPatient._id);
    const isPasswordUpdated = await bcrypt.compare(newPassword, updatedPatient.password);

        expect(result).toBeDefined();
        expect(result.updatedPatient).toBeDefined();
        expect(isPasswordUpdated).toBe(true);
        expect(testPatient.email).toBe(updatedPatient.email);
    })
})