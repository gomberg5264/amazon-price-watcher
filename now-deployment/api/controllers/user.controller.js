// controllers/user.controller.js
// Handles all CRUD operations on the User Model

const passport = require('passport');

const userService = require('../services/user.service');

module.exports = {
  // GET
  getAll: (req, res) => {
    userService
      .getAll()
      .then(users => (users ? res.json(users) : res.sendStatus(404)))
      .catch(err => res.status(422).json(err));
  },

  getById: (req, res) => {
    userService
      .getById(req.params.id)
      .then(user => (users ? res.json(user) : res.sendStatus(404)))
      .catch(err => res.status(422).json(err));
  },

  getProducts: (req, res) => {
    userService
      .getProducts(req.params.id)
      .then(productArray =>
        productArray ? res.json(productArray) : res.sendStatus(404)
      )
      .catch(err => res.status(422).json(err));
  },

  // POST
  authenticate: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) res.json({ error: 'No user' });
      req.logIn(user, err => {
        if (err) return next(err);
        res.json(req.user);
      });
    })(req, res, next);
  },

  register: (req, res) => {
    userService
      .create(req.body)
      .then(newUser => res.status(201).json(newUser))
      .catch(err => res.status(422).json(err));
  },

  // PUT
  appendProduct: (req, res) => {
    userService
      .addProduct(req.params.id, req.body.productId)
      .then(updatedUser => res.status(201).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    userService
      .update(req.params.id, req.body)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  removeProduct: (req, res) => {
    userService
      ._removeProduct(req.params.id, req.params.pid)
      .then(updatedUser => res.status(202).json(updatedUser))
      .catch(err => res.status(422).json(err));
  },

  // DELETE
  remove: (req, res) => {
    userService
      ._remove(req.params.id)
      .then(() => res.status(202).json({}))
      .catch(err => res.status(422).json(err));
  }
};
