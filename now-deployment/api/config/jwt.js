// config/jwt.js

const expressJwt = require('express-jwt');
const userService = require('../services/user.service');

/**
 * Authenticates routes using ExpressJWT
 */
const jwt = () => {
  const secret = process.env.JWT_SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes
      '/api/users/authenticate',
      '/api/users/register'
    ]
  });
};

const isRevoked = async (req, payload, done) => {
  const user = await userService.getById(payload.sub);

  // revoke token
  if (!user) {
    return done(null, true);
  }

  done();
};

module.exports = jwt;
