// services/product.service.js

const Product = require('../models/product.model');

module.exports = {
  getAll: query => {
    return Product.find(query);
  },
  getById: id => {
    return Product.findById(id);
  },
  updateById: (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
      safe: true
    });
  }
};
