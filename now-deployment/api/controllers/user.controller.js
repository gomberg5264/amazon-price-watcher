// controllers/user.controller.js
// Handles all CRUD operations on the User Model

const User = require('../models/user.model');

module.exports = {
  // GET
  getById: (req, res) => {
    User.findById(req.params.id)
      .then(user => res.status(202).json(user))
      .catch(err => res.status(422).json(err));
  },
  getProducts: (req, res) => {
    User.findById(req.params.id, 'savedProducts')
      .populate('savedProducts')
      .then(productArray => res.status(202).json(productArray))
      .catch(err => res.status(422).json(err));
  },

  // POST
  create: (req, res) => {
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(422).json(err));
  },

  // PUT
  appendProduct: (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { savedProducts: req.body.productId }
      },
      { safe: true, upsert: true, new: true }
    )
      .then(updatedUser => res.status(201).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },
  removeProduct: (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { savedProducts: { $in: [req.params.pid] } }
      },
      { new: true, safe: true }
    )
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  // DELETE
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(removed => res.status(202).json(removed))
      .catch(err => res.status(422).json(err));
  }
};
