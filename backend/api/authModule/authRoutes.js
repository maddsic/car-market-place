const express = require('express');
const router = express.Router();
const models = require('../models');
const { authLimiter } = require('../middlewares/rateLimiter');

const AuthController = require('./authController');
const AuthService = require('./authService');
const AuthRepository = require('./authRepository');

const authRepository = new AuthRepository(models);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
// 🆕 Password recovery endpoints
router.post('/forgot-password', authLimiter, authController.requestResetCode);
router.post('/reset-password', authLimiter, authController.resetPassword);

module.exports = router;
