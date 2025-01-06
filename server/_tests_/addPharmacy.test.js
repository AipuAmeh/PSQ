import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import Pharmacy from "../models/Pharmacy";
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
    await Pharmacy.deleteMany({});
});

describe("Add Pharmacy model to Patient", () => {
    it("should return a patient with an added pharmacy", async () => {
        // create pharmacy and add it to database
        const pharmacy = new Pharmacy({
            _id: new mongoose.Types.ObjectId(),
            pharmacyName: 'CVS Pharmacy',
            address: '123 Pharmacy Lane',
            state: 'WA',
            zipcode: '99356',
            phone: '123456789'
        });
        await pharmacy.save();
        // create patient and add it to database
        const patient = new Patient({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            dob: new Date('1999-01-16'),
            username: 'testuser',
            password: 'testuserpassword',
          });
          await patient.save();
        // return await resolver addPharmacyToPatient 
        const results = await resolvers.Mutation.addPharmacy(null, {
            patientId: patient._id,
            pharmacyName: pharmacy.pharmacyName,
            address: pharmacy.address,
            state: pharmacy.state,
            zipcode: pharmacy.zipcode,
            phone: pharmacy.phone
        });

        expect(results).toBeDefined();
    })
})