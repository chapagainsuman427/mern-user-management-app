const mongoose = require('mongoose');

// Defining the schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  country: String,
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
  userNotes: String,
});

module.exports = mongoose.model('User', userSchema);
