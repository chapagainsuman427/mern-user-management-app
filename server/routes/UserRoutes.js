const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust path as needed
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);  // Log error for debugging
    res.status(500).json({ error: 'Error fetching users', details: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Error retrieving user details:', err);  // Log error for debugging
    res.status(500).json({ error: 'Error retrieving user details', details: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error adding user:', err);  // Log error for debugging
    res.status(500).json({ error: 'Error adding user', details: err.message });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);  // Log error for debugging
    res.status(500).json({ error: 'Error updating user', details: err.message });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid ObjectId format' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);  // Log error for debugging
    res.status(500).json({ error: 'Error deleting user', details: err.message });
  }
});

// Bulk delete users
router.delete('/', async (req, res) => {
  const { ids } = req.body;

  // Validate the ids array
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty IDs array' });
  }

  // Validate each ID is a valid ObjectId
  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

  if (validIds.length === 0) {
    return res.status(400).json({ error: 'No valid ObjectId found' });
  }

  console.log('Valid IDs:', validIds); // Log valid IDs to check

  try {
    // Convert valid IDs to ObjectId format
    const objectIds = validIds.map((id) => mongoose.Types.ObjectId(id));
    console.log('Converted ObjectIds:', objectIds); // Log converted ObjectIds

    // Perform the bulk delete operation
    const deletedUsers = await User.deleteMany({ _id: { $in: objectIds } });

    console.log('Deleted Users:', deletedUsers); // Log result of delete operation

    if (deletedUsers.deletedCount === 0) {
      return res.status(404).json({ error: 'No users found to delete' });
    }

    res.status(200).json({ message: `${deletedUsers.deletedCount} user(s) deleted successfully` });
  } catch (err) {
    console.error('Error during bulk delete operation:', err); // Log specific error
    res.status(500).json({ error: 'Error deleting users', details: err.message });
  }
});

module.exports = router;
