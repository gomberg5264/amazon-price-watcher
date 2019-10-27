// routes/scraper.route.js

const rateLimit = require('express-rate-limit');

const router = require('express').Router();
const scraperController = require('../controllers/scraper.controller');

const { checkScrapeKey } = require('../config/auth');

const allLimiter = rateLimit({
  windowMs: 22 * 60 * 60 * 1000, // 22 hours
  max: 1,
  message: 'Too many requests sent, try again in 22 hours',
});

const individualLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6,
  message:
    'Too many individual product scrapes, please try again in 15 minutes',
});

// Auth Middleware
router.use(checkScrapeKey);

// Rate Limiter Middleware
// router.use('/', allLimiter);
router.use('/:pid', individualLimiter);

// Endpoints
router.route('/').put(scraperController.scrapeAndUpdateAll);
router.route('/:pid').put(scraperController.scrapeAndUpdateById);

module.exports = router;
