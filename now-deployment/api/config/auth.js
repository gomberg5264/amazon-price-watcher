module.exports = {
  checkAuthenticated: (req, res) => {
    if (req.isAuthenticated())
      res.status(200).json({ Success: 'User is authenticated. Forwarding...' });
    else {
      res.status(400).json({ Error: 'User not authenticated' });
    }
  }
};
