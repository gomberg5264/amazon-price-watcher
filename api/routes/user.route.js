// routes/user.routers.js
// Defines all endpoints that handle the User collection in the database

const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/').post(userController.create);

router
  .route('/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.remove);

router
  .route('/:id/products')
  .get(userController.getProducts)
  .put(userController.appendProduct);

router.route('/:id/products/:pid').put(userController.removeProduct);

module.exports = router;
