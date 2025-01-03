import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "../models/Patient";
import resolvers from "../schema/resolvers";
import bcrypt from "bcrypt";
import { signPatientToken } from "../utils/jwt";

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

describe("Change Acct Details", () => {
  it("should change and save a patient's account details", async () => {
    // create an original password
    const originalPassword = "testuserpassword";
    // hash password and place into new patient object
    // like model does in 'pre save'
    const hashedPassword = await bcrypt.hash(originalPassword, 10);
    // create a test patient and save
    const testPatient = new Patient({
      firstName: "John",
      lastName: "Doe",
      dob: new Date("1999-01-15"),
      userName: "testuser2",
      email: "johndoe@email.com",
      password: hashedPassword,
    });
    await testPatient.save();

    // define a new email, password, and username
    const updateFields = {};
    updateFields.newEmail = "janedoe@test.com";
    updateFields.changedPassword = "newchangedpassword";
    updateFields.newUser = "janedoesman";

    // test the changeAcctDetails resolver using new
    // variables as parameters
    const result = resolvers.Mutation.changePatientAccountDetails(null, {
      _id: testPatient._id.toString(),
      updateFields,
    });

    // verify result
    const updatedPatient = await Patient.findById(testPatient._id);

    expect(result).toBeDefined();
    expect(updatedPatient).toBeDefined();
    expect(testPatient._id).toStrictEqual(updatedPatient._id);
  });
});
