// /config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yushinbox:golfstrimmar1966@golfstrimmar.lfcsq.mongodb.net/blog');
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
