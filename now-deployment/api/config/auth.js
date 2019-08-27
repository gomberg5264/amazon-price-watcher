module.exports = {
  checkAuthenticatedUser: (req, res, next) => {
    if (req.isAuthenticated()) next();
    else {
      res.sendStatus(403);
    }
  },

  checkScrapeKey: (req, res, next) => {
    if (req.body.key === process.env.SCRAPE_KEY) next();
    else {
      res.status(401).json({ Error: "This endpoint isn't available" });
    }
  }
};
