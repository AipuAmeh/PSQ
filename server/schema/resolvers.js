import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Patient from "../models/Patient.js";
import Provider from "../models/Provider.js";
import ChartNote from "../models/ChartNote.js";
import Pharmacy from "../models/Pharmacy.js";
import {
  signPatientToken,
  signProviderToken,
  hashPassword,
} from "../utils/jwt.js";
import AuthenticationError from "../utils/error.js";
import BadRequestError from "../utils/error.js";
import { sendPasswordResetEmail } from "../mail/mailService.js";
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    patient: async (parent, { patientId }) => {
      return await Patient.findById({ _id: patientId })
        .populate("chartNotes")
        .populate("pharmacies");
    },
    provider: async (parent, { providerId }) => {
      return await Provider.findById({ _id: providerId });
    },
    allPatients: async (parent) => {
      return Patient.find().populate("chartNotes").populate("pharmacies");
    },
  },
  Mutation: {
    addPatient: async (
      parent,
      { firstName, lastName, dob, userName, email, password }
    ) => {
      try {
        const patient = await Patient.create({
          firstName,
          lastName,
          dob,
          userName,
          email,
          password,
        });
        const token = await signPatientToken(patient);
        return { token, patient };
      } catch (error) {
        console.log(error.message);
      }
    },
    addProvider: async (parent, { providerName, email, password }) => {
      const provider = await Provider.create({ providerName, email, password });
      const token = signProviderToken(provider);
      return { token, provider };
    },
    loginPatient: async (parent, { email, password }) => {
      const patient = await Patient.findOne({ email });
      if (!patient) {
        throw AuthenticationError;
      }
      const correctPw = await patient.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signPatientToken(patient);
      return { token, patient };
    },
    loginProvider: async (parent, { email, password }) => {
      const provider = await Provider.findOne({ email });
      if (!provider) {
        throw AuthenticationError;
      }
      const correctPw = await provider.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signProviderToken(provider);
      return { token, provider };
    },
    sendResetPasswordEmail: async (parent, { email }) => {
      const patient = await Patient.findOne({ email });
      if (patient === null) {
        throw BadRequestError;
      }
      const token = await signPatientToken(patient);
      return sendPasswordResetEmail(patient, token);
    },
    saveNewPassword: async (parent, { newPassword, patientId, token }) => {
      try {
        const patient = await Patient.findById({ _id: patientId });
        if (!patient) {
          throw AuthenticationError;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.data._id !== patientId) {
          throw AuthenticationError;
        }
        patient.password = newPassword;
        const updatedPatient = await patient.save();
        return { updatedPatient, token };
      } catch (error) {
        console.error(error);
      }
    },
    changePatientAccountDetails: async (
      parent,
      { _id, userName, email, password }
    ) => {
      try {
        // find one and update patient
        const updateFields = {};
        if (userName !== undefined) updateFields.userName = userName;
        if (email !== undefined) updateFields.email = email;
        // hash new password for safekeeping in db
        if (password !== undefined) {
          updateFields.password = password;
          const hashedPassword = await hashPassword(password);
          updateFields.password = hashedPassword;
        }
        const patient = await Patient.findByIdAndUpdate(_id, updateFields, {
          new: true,
          returnDocument: "after",
        });
        if (!patient) {
          throw new AuthenticationError();
        }
        return patient;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to update patient details");
      }
    },
    deletePatientAccount: async (parent, { _id }) => {
      const deletedPatient = Patient.findByIdAndDelete({ _id });
      return deletedPatient;
    },
    addChartNoteToPatient: async (
      parent,
      { patientId, dateCreated, subject, noteText }
    ) => {
      // create chart note
      const chartNote = await ChartNote.create({
        dateCreated,
        subject,
        noteText,
      });

      // add chart note to patient
      // populate notes to return chart note values
      const addNoteToPatient = await Patient.findByIdAndUpdate(
        patientId,
        {
          $addToSet: { chartNotes: chartNote._id },
        },
        { new: true }
      ).populate("chartNotes");

      return addNoteToPatient;
    },
    addMedication: async (parent, { patientId, medications }) => {
      // find patient by id and update
      const addPatientMedication = await Patient.findByIdAndUpdate(
        { _id: patientId },
        // add medication name to drug list
        { $addToSet: { medications: medications } },
        { new: true }
      );
      return addPatientMedication;
    },
    addPharmacy: async (
      parent,
      { patientId, pharmacyName, address, state, zipcode, phone }
    ) => {
      // add pharmacy to database
      const pharmacy = await Pharmacy.create({
        pharmacyName,
        address,
        state,
        zipcode,
        phone,
      });
      // add pharmacy to patient and populate output to return data
      const addPharmacyToPatient = await Patient.findByIdAndUpdate(
        patientId,
        { $addToSet: { pharmacies: pharmacy._id } },
        { new: true }
      ).populate("pharmacies");
      return addPharmacyToPatient;
    },
    editChartNote: async (parent, { noteId, dateCreated, subject, noteText}) => {
      try {
          // update all aspects of note
          const updatedFields = {};
          if (dateCreated !== undefined) updatedFields.dateCreated = dateCreated;
          if (subject !== undefined) updatedFields.subject = subject;
          if (noteText !== undefined) updatedFields.noteText = noteText;
              // find one and update note by noteid
          const updatedNote = await ChartNote.findByIdAndUpdate(
            { _id: noteId }, updatedFields,
            { 
              new: true, 
              returnDocument: 'after'
            },      
          );
          return updatedNote;
      } catch (error) {
        console.log(error);
      }
  
    }
  },
};

export default resolvers;
