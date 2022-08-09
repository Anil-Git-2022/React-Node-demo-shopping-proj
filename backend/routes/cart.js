const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController');

router.post('/add',CartController.addProductCart)
router.get('/:id',CartController.getCartData)

module.exports = router;