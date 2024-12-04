const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers
} = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
