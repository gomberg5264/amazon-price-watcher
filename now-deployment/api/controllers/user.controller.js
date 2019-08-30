// controllers/user.controller.js
// Handles all CRUD operations on the User Model

const passport = require('passport');

const userService = require('../services/user.service');

module.exports = {
  // GET
  logout: (req, res) => {
    req.logout();
    res.sendStatus(204);
  },

  getAll: (req, res) => {
    userService
      .getAll()
      .then(users => (users ? res.json(users) : res.sendStatus(404)))
      .catch(err => res.status(422).json(err));
  },

  getById: (req, res) => {
    userService
      .getById(req.user.id)
      .then(user => (users ? res.json(user) : res.sendStatus(404)))
      .catch(err => res.status(422).json(err));
  },

  getProducts: (req, res) => {
    userService
      .getProducts(req.user.id)
      .then(productArray =>
        productArray ? res.json(productArray) : res.sendStatus(404)
      )
      .catch(err => res.status(422).json(err));
  },

  verify: (req, res) => {
    res.sendStatus(200);
  },

  // POST
  authenticate: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(404).json({ error: 'User not found' });

      req.logIn(user, err => {
        if (err) return next(err);
        res.sendStatus(202);
      });
    })(req, res, next);
  },

  register: (req, res) => {
    userService
      .create(req.body)
      .then(newUser => res.status(201).json(newUser))
      .catch(err => res.status(422).json(err));
  },

  addProduct: (req, res) => {
    userService
      .addProduct(req.user.id, req.body.url)
      .then(updatedUser => res.status(201).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  // PUT
  update: (req, res) => {
    userService
      .update(req.user.id, req.body)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  // DELETE
  removeProduct: (req, res) => {
    userService
      ._removeProduct(req.user.id, req.params.pid)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    userService
      ._remove(req.user.id)
      .then(() => res.status(202).json({}))
      .catch(err => res.status(422).json(err));
  }
};
