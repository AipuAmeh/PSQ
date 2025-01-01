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

  describe('Add Patient Resolver', () => {
    it('should return created patient', async () => {

    let testPatient = {
                firstName: 'John',
                lastName: 'Doe',
                dob: new Date('1999-01-15'),
                userName: 'testuser2',
                email: 'johndoe@email.com',
                password: expect.anything(),
            };

    const testToken = {
            email: testPatient.email,
            userName: testPatient.userName,
            _id: testPatient._id
        };

   const token = signPatientToken(testToken);

    const result = await resolvers.Mutation.addPatient(null, testPatient);

        // testing for token
        expect(token).toBeDefined();

        // testing for adding a patient
        expect(result).toBeDefined();
        expect(result.patient.firstName).toBe(testPatient.firstName);
        expect(result.patient.lastName).toBe(testPatient.lastName);
        expect(result.patient.dob).toBe(testPatient.dob);
        expect(result.patient.userName).toBe(testPatient.userName);
        expect(result.patient.email).toBe(testPatient.email);
    
        // password is hashed so wont be defined
        expect(result.patient.password).toStrictEqual(testPatient.password);
    })
  })