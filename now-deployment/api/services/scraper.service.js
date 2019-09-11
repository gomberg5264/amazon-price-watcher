// services/scraper.service.js

const productService = require('./product.service');
const axios = require('axios');
const cheerio = require('cheerio');

const SCRAPERAPI_KEY = process.env.SCRAPERAPI_KEY;

/**
 * Iterates through master list of products, then updating each one.
 * @returns Array of updated products from the database
 */
const scrapeAndUpdateAll = async () => {
  const products = await productService.getAll();
  console.log(products);
  if (!products) throw new Error('Cannot retrieve all products');

  const asyncArray = products.map(
    async product => await scrapeAndUpdateProduct(product)
  );

  console.log('===========');
  console.log(asyncArray);

  if (!asyncArray)
    throw new Error('Cannot create async array of products to scrape');

  return await Promise.all(asyncArray);
};

/**
 * Updates specfic product document given by productId.
 * @param {ObjectId} productId Id of particular product's document
 * @returns Updated product document
 */
const scrapeAndUpdateById = async productId => {
  const product = await productService.getById(productId);

  if (!product) throw 'Product does not exist';

  return await scrapeAndUpdateProduct(product);
};

/**
 * Updates a product document based on returned scraped data from url
 * @param {Object} product MongoDB document object for the specific product
 * @returns Updated product document
 */
const scrapeAndUpdateProduct = async product => {
  const pageData = await scrapeProductByUrl(product.url, product.currentPrice);

  return await productService.updateById(product._id, pageData);
};

/**
 * Scrapes the given url
 * @param {String} productUrl Amazon product url
 * @param {Number} currentPrice Product's known urrent price. 0 if unknown
 */
const scrapeProductByUrl = async (productUrl, currentPrice) => {
  const hide = true;
  const scraperUrl = hide
    ? `http://api.scraperapi.com?api_key=${SCRAPERAPI_KEY}&url=${productUrl}`
    : productUrl;

  const { data } = await axios.get(scraperUrl);
  const pageData = parseData(currentPrice, data);

  console.log(pageData);

  return pageData;
};

/**
 * Extracts required data from Amazon HTML. i.e. change in price, on sale status, etc.
 * @param {Float} oldPrice currentPrice field of currently non-updated product document
 * @param {String} html HTML scraped from Amazon product page
 * @returns {Object} Object containing all extracted data (named identically to document fields)
 */
const parseData = (oldPrice, html) => {
  const $ = cheerio.load(html);

  // Product Title
  const name = $('div#titleSection span#productTitle')
    .text()
    .trim();

  // Current Price
  const ourPrice = $('div#price span#priceblock_ourprice').text();
  const dealPrice = $('div#price span#priceblock_dealprice').text();
  let currentPrice = dealPrice ? dealPrice : ourPrice;

  console.log(currentPrice);

  currentPrice = parseFloat(currentPrice.replace(/^\D+/g, ''));

  if (!currentPrice) throw 'Cannot scrape price from the page';

  // Price Change
  const priceChange = oldPrice > 0 ? currentPrice - oldPrice : 0;

  // On Sale Status
  const onSale = $('div#price span.a-text-strike').length > 0;

  return {
    name,
    currentPrice,
    priceChange,
    onSale
  };
};

module.exports = {
  scrapeAndUpdateAll,
  scrapeAndUpdateById,
  scrapeProductByUrl
};
