const express = require('express');
const router = express.Router();
const { authLimiter, resetPasswordRateLimiter, forgotPasswordRateLimiter } = require('../middlewares/rateLimiter');

const models = require('../models');
// Importing the necessary modules for authentication
const AuthRepository = require('./authRepository');
const AuthService = require('./authService');
const AuthController = require('./authController');

const NotificationRepository = require('../notificationModule/notificationRepository');
const NotificationService = require('../notificationModule/notificationService');

const authRepository = new AuthRepository(models);
const notificationRepository = new NotificationRepository(models);
const notificationService = new NotificationService(notificationRepository);
const authService = new AuthService(authRepository, notificationService);
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
