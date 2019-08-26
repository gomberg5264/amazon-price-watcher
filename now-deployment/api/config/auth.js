module.exports = {
  checkAuthenticatedUser: (req, res, next) => {
    if (req.isAuthenticated()) next();
    else {
      res.status(400).json({ Error: 'User not authenticated' });
    }
  },

  checkScrapeKey: (req, res, next) => {
    if (req.body.key === process.env.SCRAPE_KEY) next();
    else {
      res.status(403).json({ Error: "This endpoint isn't available" });
    }
  }
};
