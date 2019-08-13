// controllers/session.controller.js

const sessionService = require('../services/session.service.js');

module.exports = {
  validateSession: (req, res) => {
    sessionService
      .validateSession(req)
      .then(session =>
        session
          ? res.json(session)
          : res.status(400).json({
              message: 'Login attempt could not be validated. Please try again'
            })
      )
      .catch(err => res.status(422).json(err));
  }
};
