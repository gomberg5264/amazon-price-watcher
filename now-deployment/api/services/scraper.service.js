// services/scraper.service.js

const productService = require('./product.service');
const axios = require('axios');
const cheerio = require('cheerio');

const SCRAPERAPI_KEY = process.env.SCRAPERAPI_KEY;

const scrapeAndUpdateAll = () => {
  return new Promise((resolve, reject) => {
    productService
      .getAll()
      .then(products =>
        Promise.all(products.map(product => scrapeAndUpdateProduct(product)))
      )
      .then(updatedProducts => resolve(updatedProducts))
      .catch(err => reject(err));
  });
};

const scrapeAndUpdateById = productId => {
  return new Promise((resolve, reject) => {
    productService
      .getById(productId)
      .then(product => scrapeAndUpdateProduct(product))
      .then(updatedProduct => resolve(updatedProduct))
      .catch(err => reject(err));
  });
};

const scrapeAndUpdateProduct = product => {
  return new Promise((resolve, reject) => {
    const hide = false; // Var for testing purposes only

    const scraperUrl = hide
      ? `http://api.scraperapi.com?api_key=${SCRAPERAPI_KEY}&url=${product.url}`
      : product.url;
    axios
      .get(scraperUrl) // Get product page's HTML
      .then(res => parseData(product, res.data)) // Scrape the HTML to get necessary updates
      .then(updates => productService.updateById(product._id, updates)) // Update product document
      .then(updatedProduct => resolve(updatedProduct)) // Resolve promise on success
      .catch(err => reject(err)); // Catch and return error back up the chain
  });
};

const parseData = (product, html) => {
  const $ = cheerio.load(html);

  const name = $('div#titleSection span#productTitle')
    .text()
    .trim();

  const ourPrice = $('div#price span#priceblock_ourprice').text();
  const dealPrice = $('div#price span#priceblock_dealprice').text();
  let currentPrice = dealPrice ? dealPrice : ourPrice;

  currentPrice = parseFloat(currentPrice.replace(/^\D+/g, ''));

  const priceChange =
    product.currentPrice > 0 ? currentPrice - product.currentPrice : 0;

  // check for striked out text = on sale
  const onSale = $('div#price span.a-text-strike').length > 0;

  const updatedData = {
    name,
    currentPrice,
    priceChange,
    onSale
  };

  return updatedData;
};

module.exports = {
  scrapeAndUpdateAll,
  scrapeAndUpdateById
};
