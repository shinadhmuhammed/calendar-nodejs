import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/outlook';

    if (!MONGO_URL) {
      throw new Error('MONGO_URL is not defined in environment variables.');
    }
    console.log(`Connecting to MongoDB at ${MONGO_URL}`);

    await mongoose.connect(MONGO_URL, {
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;  
  }
};

export default connectDB;
