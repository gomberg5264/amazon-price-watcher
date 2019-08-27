// routes/user.routers.js
// Defines all endpoints that handle the User collection in the database

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { checkAuthenticatedUser } = require('../config/auth');

// PUBLIC

//router.route('/register').post(userController.register);
router.route('/verify').get(userController.verify);
router.route('/login').post(userController.authenticate);
router.route('/logout').get(userController.logout);

// Protect private routes

router.use(checkAuthenticatedUser);

// PRIVATE

router
  .route('/')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.remove);

router
  .route('/products')
  .get(userController.getProducts)
  .post(userController.addProduct);

router.route('/products/:pid').delete(userController.removeProduct);

module.exports = router;
