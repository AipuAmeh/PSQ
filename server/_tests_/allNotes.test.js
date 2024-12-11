import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ChartNote from "../models/ChartNote";

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

  describe('All Notes Resolver', () => {
    it('should return all notes in database', async () => {
     // create 2 chart notes for mock data
       await ChartNote.create([
        {
            _id: new mongoose.Types.ObjectId(),
            dateCreated: new Date(),
            subject: 'Test Note 2',
            noteText: 'This is a test note content 2',
        },
        {
            _id: new mongoose.Types.ObjectId(),
            dateCreated: new Date(),
            subject: 'Test Note 1',
            noteText: 'This is a test note content 1',
        }
    ]);
        const result = await ChartNote.find()
        .sort({ _id: 1 });

        expect(result).toBeDefined();
        expect(result.length).toBe(2);
        expect(result[0].subject).toBe('Test Note 2')
        expect(result[1].noteText).toBe('This is a test note content 1');
    });
  })