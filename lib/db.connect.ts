import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const data=  await mongoose.connect(process.env.DBURL as string,{
      dbName:"Review-vault"
    }); 

    console.log('MongoDB connected successfully',data.modelNames()); 
    //@ts-ignore
  //  const dummy=  await mongoose.connection.db.collection("testCollection").insertOne({ test: "data" }); 
    // console.log(dummy,"i have created successfully ")
 
  } catch (error) {
    console.log('Error connecting to database...', error);
  }
};

export default connectDB; 

