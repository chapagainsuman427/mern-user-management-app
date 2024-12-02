const User = require('../model/User.js');
const mongoose = require('mongoose');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // return the user data
  } catch (err) {
    console.error('Error in getUserById:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: err.message });
  }
};

// Bulk delete users
const bulkDeleteUsers = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty IDs array' });
  }

  try {
    // Validate the format of IDs (ensure they are ObjectIds)
    const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
    await User.deleteMany({ _id: { $in: objectIds } });
    res.status(200).json({ message: `${ids.length} user(s) deleted successfully` });
  } catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, bulkDeleteUsers };
