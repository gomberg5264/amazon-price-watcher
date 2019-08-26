// routes/product.route.js
// Product Endpoints

const router = require('express').Router();
const productController = require('../controllers/product.controller');

const { checkAuthenticatedUser } = require('../config/auth');

router.use(checkAuthenticatedUser);

router
  .route('/')
  .get(productController.getAll)
  .post(productController.create);

router
  .route('/:id')
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.remove);

module.exports = router;
