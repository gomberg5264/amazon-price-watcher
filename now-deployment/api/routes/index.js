// routes/index.js
// Seperation of route pathways to suitable controller

const router = require('express').Router();
const userRoutes = require('./user.route');
const productRoutes = require('./product.route');
const scraperRoutes = require('./scraper.route');

router.use('/api/scrape', scraperRoutes); // Endpoint should only be used by Heroku Scheduled Task

router.use('/api/users', userRoutes); // Public API

// ! Remove product endpoint as all services are used through the /user endpoint
//router.use('/api/products', productRoutes);

module.exports = router;
