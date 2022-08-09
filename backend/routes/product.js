const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

router.get('/',ProductController.getProducts)
router.post('/add', ProductController.AddProduct)
router.get('/:id', ProductController.getProductsById)
router.post('/delete/:id', ProductController.DeleteProductsById)
//router.post('/update', ProductController.UpdateProductsById)

module.exports = router;