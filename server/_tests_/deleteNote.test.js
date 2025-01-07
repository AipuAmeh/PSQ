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

describe("Delete a Chart Note", () => {
    it("should return a deleted chart note", async () => {
        // create chart note and save to database
        const chartNote1 = new ChartNote({
            dateCreated: new Date(),
            subject: 'Test Note 1',
            noteText: 'This is a test note content 1',
          });
          await chartNote1.save();
        // test delete pt resolver using parameter
        // of note id
          const results = await resolvers.Mutation.deleteChartNote(null, {
            noteId: chartNote1._id
          });

        expect(results).toBeDefined();
    })
})