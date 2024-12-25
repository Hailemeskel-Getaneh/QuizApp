import User from '../models/userModel';

// Add a new user
exports.addUser = async (req, res) => {
  const { userId, name, email, role, score } = req.body;

  try {
    // Check for missing fields
    if (!userId || !name || !email) {
      return res.status(400).json({ message: 'UserId, name, and email are required.' });
    }

    
    // Create and save the user
    const newUser = new User({ userId, name, email, role, score });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  };

  // In controllers/userController.js
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, score } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, { name, email, role, score }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  };
  