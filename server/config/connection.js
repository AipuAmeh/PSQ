import mongoose from 'mongoose';

mongoose.connect(process.env.MONDODB_URI || 'mongodb://localhost:27017/psychquiconsult');

export default mongoose.connection;