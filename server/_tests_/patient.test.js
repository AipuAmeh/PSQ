import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Patient from '../models/Patient';
import ChartNote from '../models/ChartNote';
import Pharmacy from '../models/Pharmacy';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Current Patient Resolver', () => {
  it('should return a patient from the database', async () => {
    // Create and save ChartNote documents
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
    });
    await pharmacy1.save();

    const pharmacy2 = new Pharmacy({
      _id: new mongoose.Types.ObjectId(),
      pharmacyName: 'Pharmacy2',
      address: '456 Another Address',
      state: 'NC',
      zipcode: '67890',
      phone: '3369876543',
    });
    await pharmacy2.save();

    // Create and save a Patient document with references to chart notes and pharmacies
    const patient = new Patient({
      _id: new mongoose.Types.ObjectId(),
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date('1999-01-16'),
      username: 'testuser',
      password: 'testuserpassword',
      chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
      pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
    });
    await patient.save();

    // Query the database to retrieve the patient
    const foundPatient = await Patient.findById(patient._id)
      .populate('chartNotes')
      .populate('pharmacies');

    // Assertions
    expect(foundPatient).toBeDefined();
    expect(foundPatient.firstName).toBe('John');
    expect(foundPatient.lastName).toBe('Doe');
    expect(foundPatient.chartNotes.length).toBe(2);
    expect(foundPatient.pharmacies.length).toBe(2);

    // Verify content of populated chart notes and pharmacies
    expect(foundPatient.chartNotes[0].subject).toBe('Test Note 1');
    expect(foundPatient.pharmacies[0].pharmacyName).toBe('Pharmacy1');
  });
});
