import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Provider from "../models/Provider";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Current Provider Resolver', () => {
    it('should return a provider from the database', async () => {
        const provider = new Provider({
            _id: new mongoose.Types.ObjectId(),
            providerName: 'Jane Doe',
            email: 'testemail@email.com',
            password: 'testuserpassword'
        });

        await provider.save();

        const foundProvider = await Provider.findById(provider._id);

        expect(foundProvider).toBeDefined();
    })
})