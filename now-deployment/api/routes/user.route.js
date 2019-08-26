// routes/user.routers.js
// Defines all endpoints that handle the User collection in the database

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { checkAuthenticated } = require('../config/auth');

// PUBLIC

//router.route('/register').post(userController.register);
router.route('/login').post(userController.authenticate);
router.route('/logout').get(userController.logout);

// Protect private routes

router.use(checkAuthenticated);

// PRIVATE

router
  .route('/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.remove);

router
  .route('/:id/products')
  .get(userController.getProducts)
  .post(userController.appendProduct);

router.route('/:id/products/:pid').delete(userController.removeProduct);

module.exports = router;
