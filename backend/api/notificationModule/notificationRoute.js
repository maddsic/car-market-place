'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const Auth = require('../middlewares/authMiddleware');

const NotificationRepository = require('./notificationRepository');
const NotificationService = require('./notificationService');
const NotificationController = require('./notificationController');


// Dependency Injection Wiring
const notificationRepository = new NotificationRepository(models);
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

// User Endpoints
router.get('/', Auth.checkAuth, notificationController.getNotifications);
router.get('/unread', Auth.checkAuth, notificationController.getUnreadNotificationsCount);
router.patch('/:id/read', Auth.checkAuth, notificationController.markAsRead);
router.patch('/read-all', Auth.checkAuth, notificationController.markAllAsRead);

// Admin Endpoints
router.post('/send', Auth.isAdmin, notificationController.sendToDealer);

module.exports = router;

