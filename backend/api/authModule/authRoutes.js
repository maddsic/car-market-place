const express = require('express');
const router = express.Router();
const models = require('../models');
const { authLimiter, resetPasswordRateLimiter, forgotPasswordRateLimiter } = require('../middlewares/rateLimiter');

const AuthController = require('./authController');
const AuthService = require('./authService');
const AuthRepository = require('./authRepository');

const authRepository = new AuthRepository(models);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// 1. Authentication routes with rate limiting
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);

// 2. Password reset routes with specific rate limiting
router.post('/forgot-password', forgotPasswordRateLimiter, authController.requestResetCode);
router.post('/reset-password', resetPasswordRateLimiter, authController.resetPassword);

module.exports = router;
