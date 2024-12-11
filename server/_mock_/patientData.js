import Patient from "../models/Patient";
import ChartNote from "../models/ChartNote";
import Pharmacy from "../models/Pharmacy";
import mongoose from "mongoose";

export const chartNote1 = new ChartNote({
    _id: new mongoose.Types.ObjectId(),
    dateCreated: new Date(),
    subject: 'Test Note 1',
    noteText: 'This is a test note content 1',
  });
  await chartNote1.save();

export const chartNote2 = new ChartNote({
    _id: new mongoose.Types.ObjectId(),
    dateCreated: new Date(),
    subject: 'Test Note 2',
    noteText: 'This is a test note content 2',
  });
  await chartNote2.save();

  // Create and save Pharmacy documents
  export const pharmacy1 = new Pharmacy({
    _id: new mongoose.Types.ObjectId(),
    pharmacyName: 'Pharmacy1',
    address: '123 Address',
    state: 'VA',
    zipcode: '12345',
    phone: '3361234567',
  });
  await pharmacy1.save();

  export const pharmacy2 = new Pharmacy({
    _id: new mongoose.Types.ObjectId(),
    pharmacyName: 'Pharmacy2',
    address: '456 Another Address',
    state: 'NC',
    zipcode: '67890',
    phone: '3369876543',
  });
  await pharmacy2.save();

  // Create and save a Patient document with references to chart notes and pharmacies
 export const patient1 = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Donald',
    lastName: 'Duck',
    dob: new Date('1999-01-16'),
    username: 'testuser1',
    password: 'testuserpassword',
    chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
    pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
  };

  export const patient2 = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1999-01-15'),
    username: 'testuser2',
    password: 'testuserpassword',
    chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
    pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
  };

  export const patient3 = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Mickey',
    lastName: 'Mouse',
    dob: new Date('1999-01-14'),
    username: 'testuser3',
    password: 'testuserpassword',
    chartNotes: [chartNote1._id, chartNote2._id], // Referencing chart notes by their ObjectId
    pharmacies: [pharmacy1._id, pharmacy2._id], // Referencing pharmacies by their ObjectId
  };