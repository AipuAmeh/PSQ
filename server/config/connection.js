import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI )

export default mongoose.connection;