import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength:6
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength:6
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'], // Assuming these values for gender, you can modify them
    required: true
  },
  profilePic:{
    type:String,
    default:"",
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
