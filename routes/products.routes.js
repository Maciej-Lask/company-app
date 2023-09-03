const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller'); 


router.get('/products', productController.getProducts);

router.get('/products/random', productController.getRandomProduct);

router.get('/products/:id', productController.getProductById);

router.post('/products', productController.createProduct);

router.put('/products/:id', productController.updateProductById);

router.delete('/products/:id', productController.deleteProductById);

module.exports = router;
