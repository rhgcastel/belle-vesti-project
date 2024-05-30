const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  type: { type: String, default: 'User' },
  password: { type: String, required: true, unique: false, maxlength: 60 }
}, {
  timestamps: true
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
