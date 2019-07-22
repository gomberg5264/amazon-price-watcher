// routes/scraper.route.js

const router = require('express').Router();
const scraperController = require('../controllers/scraper.controller');

router.route('/').put(scraperController.scrapeAndUpdateAll);

router.route('/:pid').put(scraperController.scrapeAndUpdateById);

module.exports = router;
