import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js'; // Ensure the User model is properly exported with ES6
const router = express.Router();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config()
const secretKey = process.env.JWT_SECRET;

// Create a user
router.post('/add-user', async (req, res) => {
  const { userId, name, email, role } = req.body;


  // Hash the default password
  const defaultPassword = "qwe123";
  // const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Generate unique ID for the user
  // const userId = 'user' + Date.now();

  
  const newUser = new User({
    userId,
    name,
    email,
    password: defaultPassword,
    role,
    score: 0, // Default score
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete user by ID
router.delete('/users/delete-user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Edit user by ID (newly added)
router.put('/users/edit-user/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body; // Get updated details from the request body

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role }, // Update these fields
      { new: true } // This ensures the updated document is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});


//check that the user is registered or not

router.post('/users/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ userId });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    if (password != user.password) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;










