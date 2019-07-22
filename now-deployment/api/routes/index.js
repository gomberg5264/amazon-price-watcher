// routes/index.js
// Seperation of route pathways to suitable controller

const router = require('express').Router();
const userRoutes = require('./user.route');
const productRoutes = require('./product.route');
const scraperRoutes = require('./scraper.route');

router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/scrape', scraperRoutes);

module.exports = router;
