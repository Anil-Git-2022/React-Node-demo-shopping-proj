const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');

router.post('/pay',OrderController.makePayment)
router.get('/:id',OrderController.getOrders)

module.exports = router;