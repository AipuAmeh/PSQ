import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";
import Provider from "../models/Provider.js";
import { signPatientToken, signProviderToken } from "../utils/jwt.js";
import AuthenticationError from "../utils/error.js";
import BadRequestError from "../utils/error.js";
import { sendPasswordResetEmail } from "../mail/mailService.js";
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    patient: async (parent, { patientId }) => {
      return await Patient.findById({ _id: patientId });
    },
    provider: async (parent, { providerId }) => {
      return await Provider.findById({ _id: providerId });
    },
    allPatients: async (parent) => {
      return Patient.find();
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
    changePatientAccountDetails: async (parent, { _id, userName, email, password}) => {
      try {
        // find one and update patient
        const patient = await Patient.findByIdAndUpdate(
       _id, { 
        userName: userName,
        email: email,
        password: password
      }, 
          { new: true,
            returnDocument: "after"
           }
        );
        if (!patient) {
          throw new AuthenticationError;
        }
        console.log(`Updated patient: ${patient}`);
        return patient;
      } catch (error) {
        console.log(error);
     throw new Error('Failed to update patient details');
      }
    },
  },
};

export default resolvers;
