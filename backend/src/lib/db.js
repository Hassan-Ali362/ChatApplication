import mongoose from 'mongoose';

import { ENV } from './env.js';

const mongoURL = ENV.MONGO_URL;

const connectDB = async () => {  
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); 
    }   
};

export default connectDB;