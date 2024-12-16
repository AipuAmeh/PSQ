import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Provider from "../models/Provider";
import resolvers from "../schema/resolvers";
import { signProviderToken } from "../utils/jwt";

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

  describe('Add Provider Resolver', () => {
    it('should return created provider', async () => {

      const testProvider = {
        providerName: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: 'testpassword'
      };

      const testToken = {
        email: testProvider.email,
        providerName: testProvider.providerName,
        _id: testProvider._id
      };

      const token = signProviderToken(testToken);

      const result = await resolvers.Mutation.addProvider(null, testProvider);

      expect(token).toBeDefined();

      expect(result).toBeDefined();
      expect(result.provider.providerName).toBe(testProvider.providerName);
      expect(result.provider.email).toBe(testProvider.email);    
    })
  })