import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import ChartNote from "../models/ChartNote";
import Pharmacy from "../models/Pharmacy";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('All Patients Resolver', () => {
    beforeEach(async () => {

    // Create and save chart note documents
        const chartNote1 = new ChartNote({
            _id: new mongoose.Types.ObjectId(),
            dateCreated: new Date(),
            subject: 'Test Note 1',
            noteText: 'This is a test note content 1',
          });
          await chartNote1.save();

        
        const chartNote2 = new ChartNote({
            _id: new mongoose.Types.ObjectId(),
            dateCreated: new Date(),
            subject: 'Test Note 2',
            noteText: 'This is a test note content 2',
          });
          await chartNote2.save();
        
          // Create and save Pharmacy documents
          const pharmacy1 = new Pharmacy({
            _id: new mongoose.Types.ObjectId(),
            pharmacyName: 'Pharmacy1',
            address: '123 Address',
            state: 'VA',
            zipcode: '12345',
            phone: '3361234567',
          }).save();
        
          const pharmacy2 = new Pharmacy({
            _id: new mongoose.Types.ObjectId(),
            pharmacyName: 'Pharmacy2',
            address: '456 Another Address',
            state: 'NC',
            zipcode: '67890',
            phone: '3369876543',
          }).save();

    // Create 3 patients for mock data
        await Patient.create([
       {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Donald',
        lastName: 'Duck',
        dob: new Date('1999-01-16'),
        username: 'testuser1',
        email: 'donald@email.com',
        password: 'testuserpassword',
        chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
        pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
       }, 
       {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'John',
        lastName: 'Doe',
        dob: new Date('1999-01-15'),
        username: 'testuser2',
        email: 'johndoe@email.com',
        password: 'testuserpassword',
        chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
        pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
       },
       {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Mickey',
        lastName: 'Mouse',
        dob: new Date('1999-01-14'),
        username: 'testuser3',
        email: 'mickeymouse@email.com',
        password: 'testuserpassword',
        chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
        pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
       }
        ]);
    });

    afterEach(async () => {
        // Clear the database after each test
        await Patient.deleteMany({});
        await ChartNote.deleteMany({});
        await Pharmacy.deleteMany({});
      });

    it('should return all patients in the database', async () => {
        const result = await Patient.find()
        .populate('chartNotes')
        .populate('pharmacies')
        .sort({ firstName: 1});

        expect(result).toBeDefined();
        expect(result.length).toBe(3);
        expect(result[0].firstName).toBe('Donald');
        expect(result[1].firstName).toBe('John');
        expect(result[2].firstName).toBe('Mickey');
    })
})
