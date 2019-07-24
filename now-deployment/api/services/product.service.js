// services/product.service.js

const Product = require('../models/product.model');

module.exports = {
  getAll: async query => {
    return await Product.find(query);
  },
  getById: async id => {
    return await Product.findById(id);
  },
  updateById: async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
      safe: true
    });
  }
};
