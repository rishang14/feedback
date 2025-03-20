import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const data=  await mongoose.connect(process.env.DBURL as string);
 
    console.log('MongoDB connected successfully',data);
  } catch (error) {
    console.log('Error connecting to database...', error);
  }
};

export default connectDB;