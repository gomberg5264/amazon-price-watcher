const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/user.model');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (username, password, done) => {
        // Match user

        User.findOne({ email: username }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false);

          bcrypt.compare(password, user.hash, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, '-hash', (err, user) => {
      done(err, user);
    });
  });
};
