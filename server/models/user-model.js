const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  type: { type: String, default: 'User' },
  password: { type: String }
},{
    timestamps:true
});

//Encrypt the password created
UserSchema.pre('save', function(next) {
    !this.isModified("password") ? next() :
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const user = mongoose.model('User', UserSchema);
module.exports = user;