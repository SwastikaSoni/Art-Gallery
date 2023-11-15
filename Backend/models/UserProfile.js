// Backend/models/UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
