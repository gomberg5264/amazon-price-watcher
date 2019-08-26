module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) next();
    else {
      res.status(400).json({ Error: 'User not authenticated' });
    }
  }
};
