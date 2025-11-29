const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, default: 'student' },
  resumeUrl: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
