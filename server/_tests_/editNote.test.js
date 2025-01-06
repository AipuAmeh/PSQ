import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ChartNote from "../models/ChartNote";
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
    await ChartNote.deleteMany({});
});

describe("Edit a Chart Note", () => {
    it("should return an edited chart note", async () => {
        // create chart note
        const chartNote1 = new ChartNote({
            dateCreated: new Date(),
            subject: 'Test Note 1',
            noteText: 'This is a test note content 1',
          });
          await chartNote1.save();
        // create updated fields and set to an empty object
        const updatedFields = {};
        updatedFields.subject = 'PSYCH';
        updatedFields.noteText = 'I always rock the new new';
        // check results from resolvers function
const results = resolvers.Mutation.editChartNote(null, {
    noteId: chartNote1._id,
    updatedFields
});
        // verify result
const foundNote = await ChartNote.findById(chartNote1._id);

expect(results).toBeDefined();
expect(chartNote1._id).toStrictEqual(foundNote._id);
    })
})