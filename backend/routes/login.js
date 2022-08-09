const express = require('express');
const router = express.Router();
const LoginController = require('../controller/LoginController');

router.post('/login',LoginController.login)
router.post('/register', LoginController.register)
router.get('/register', LoginController.register)

module.exports = router;