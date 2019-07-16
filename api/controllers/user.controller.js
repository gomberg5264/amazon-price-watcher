// controllers/user.controller.js
// Handles all CRUD operations on the User Model

const UserModel = require('../models/user.model');

module.exports = {
  // Get a user's info based on uid
  getById: (req, res) => {
    UserModel.findById(req.params.id)
      .then(user => res.status(202).json(user))
      .catch(err => res.status(422).json(err));
  },
  // Insert new User document
  create: (req, res) => {
    UserModel.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    UserModel.findByIdAndRemove(req.params.id)
      .then(removed => res.status(202).json(removed))
      .catch(err => res.status(422).json(err));
  }
};
