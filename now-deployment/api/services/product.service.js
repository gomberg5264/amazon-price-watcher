// services/product.service.js

const Product = require('../models/product.model');

const { scrapeProductByUrl } = require('./scraper.service');

const getAll = async query => {
  return await Product.find(query);
};

const getById = async id => {
  return await Product.findById(id);
};

const updateById = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    upsert: true,
    safe: true
  });
};

const create = async url => {
  // Scrape the product url
  const pageData = await scrapeProductByUrl(url);
  if (!pageData) throw 'Cannot scrape page data';

  const product = new Product({ url, ...pageData });
  if (!product) throw 'Cannot create Product Model from scraped data';

  return await product.save();
};

const _remove = async id => {
  await Product.findByIdAndRemove(id);
};

module.exports = {
  getAll,
  getById,
  updateById,
  create,
  _remove
};
