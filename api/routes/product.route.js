// routes/product.route.js
// Product Endpoints

const router = require('express').Router();
const productController = require('../controllers/product.controller');

router
  .route('/')
  .get(productController.getAll)
  .post(productController.create);

router
  .route('/:id')
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.remove);
