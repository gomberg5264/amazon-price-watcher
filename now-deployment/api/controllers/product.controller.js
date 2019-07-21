// controller/producct.controller.js
// Handles all Product CRUD operations

const Product = require('../models/product.model');

const scraperController = require('../controllers/scraper.controller');

module.exports = {
  getAll: (req, res) => {
    Product.find(req.query)
      .then(products => res.status(202).json(products))
      .catch(err => res.status(422).json(err));
  },
  getById: (req, res) => {
    Product.findById(req.params.id)
      .then(product => res.status(202).json(product))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    scraperService.scrapePage(req.body.url);
    Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedProduct => res.status(202).json(updatedProduct))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(removed => res.status(202).json(removed))
      .catch(err => res.status(422).json(err));
  }
};
