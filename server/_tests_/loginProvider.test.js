import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Provider from "../models/Provider";
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
    await Provider.deleteMany({});
});

describe("Login Provider", () => {
    it("should return a logged in provider", async () => {

        // define and create a provider
        const testProvider = {
        providerName: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: 'testpassword'
        };

        // add provider to database
        const provider = await resolvers.Mutation.addProvider(null, testProvider);

        const result = await resolvers.Mutation.loginProvider(null, {
            email: testProvider.email,
            password: testProvider.password
        });

        expect(result.token).toBeDefined();

        expect(result).toBeDefined();
        expect(result.provider.email).toBe(testProvider.email);
    })
})