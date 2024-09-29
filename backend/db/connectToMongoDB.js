import mongoose from 'mongoose';

// const mongoURI = 'mongodb://localhost:27017/mydatabase';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
export default connectToMongoDB;
