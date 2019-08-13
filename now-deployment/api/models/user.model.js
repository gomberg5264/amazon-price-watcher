// models/User.js
// Defines the User Schema that stores user information

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Product = require('./product.model');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }
  ]
});

// Define Unique Validator Plugin
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

// Create model
const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
