// models/User.js
// Defines the User Schema that stores user information

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  hash: {
    type: String,
    required: true
  },
  enableAlert: {
    type: Boolean,
    required: true
  },
  savedProducts: [
    {
      productName: String,
      productId: String
    }
  ]
});

// Define Unique Validator Plugin
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

// Define password methods
// UserSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
//     .toString('hex');
// };

// UserSchema.methods.validPassword = function(password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
//     .toString('hex');
//   return this.hash === hash;
// };

// Create model
const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
