// controllers/scraper.controller.js

const scraperService = require('../services/scraper.service');

module.exports = {
  // PUT
  scrapeAndUpdateAll: (req, res) => {
    scraperService
      .scrapeAndUpdateAll()
      .then(updatedProducts => res.status(202).json(updatedProducts))
      .catch(err => res.status(422).json(err));
  },
  scrapeAndUpdateById: (req, res) => {
    scraperService
      .scrapeAndUpdateById(req.params.pid)
      .then(updatedProduct => res.status(202).json(updatedProduct))
      .catch(err => res.status(422).json(err));
  }
};
