import mongoose from 'mongoose';

// Define the schema for a User
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  score: {
    type: Number,
    default: 0,
  },
});

// Create a model for User using the schema
const User = mongoose.model('User', userSchema);

export default User; // Correct ES Module export

