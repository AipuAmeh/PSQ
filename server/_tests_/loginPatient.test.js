import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import { signPatientToken } from "../utils/jwt";
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

describe("Login Patient", () => {
  it("should return a logged in patient", async () => {
    // define a patient
    const testPatient = {
      firstName: "John",
      lastName: "Doe",
      dob: new Date("1999-01-15"),
      userName: "testuser2",
      email: "johndoe@email.com",
      password: 'testuserpassword',
    };

    // Add patient to database
    const patient = await resolvers.Mutation.addPatient(null, testPatient);

    // Use login mutation to login patient
    const result = await resolvers.Mutation.loginPatient(null, {
      email: testPatient.email,
      password: testPatient.password,
    });

    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.patient.email).toBe(testPatient.email);
  });
});
