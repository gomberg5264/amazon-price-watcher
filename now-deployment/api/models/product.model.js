// models/product.model.js
// Schema for the Product to be stored

const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

// ! Currently allowing duplicate URLs in the product list

const ProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    match: [/^https:\/\/www\.amazon\.ca\/.+/g, 'is not a valid url']
  },
  name: {
    type: String
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  priceChange: {
    type: Number
  },
  onSale: {
    type: Boolean
  }
});

// Make sure each URL is unique
// ProductSchema.plugin(uniqueValidator, {
//   message: 'is already in the database'
// });

const Product = mongoose.model('Product', ProductSchema, 'all_products');

module.exports = Product;
