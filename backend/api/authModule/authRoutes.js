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
// Route for handling verification link clicks from email
router.get('/verify-email', authController.verifyEmail);

router.post('/login', authLimiter, authController.login);

// 2. Password reset routes with specific rate limiting
router.post('/forgot-password', forgotPasswordRateLimiter, authController.sendPasswordResetCodeController);
router.post('/reset-password', resetPasswordRateLimiter, authController.verifyAndResetPasswordController);

module.exports = router;
