// controller/producct.controller.js
// Handles all Product CRUD operations

const ProductModel = require('../models/product.model');

module.exports = {
  getAll: (req, res) => {
    ProductModel.find(req.query)
      .then(products => res.status(202).json(products))
      .catch(err => res.status(422).json(err));
  },
  getById: (req, res) => {
    ProductModel.findById(req.params.id)
      .then(product => res.status(202).json(product))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    ProductModel.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    ProductModel.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedProduct => res.status(202).json(updatedProduct))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    ProductModel.findByIdAndRemove(req.params.id)
      .then(removed => res.status(202).json(removed))
      .catch(err => res.status(422).json(err));
  }
};
