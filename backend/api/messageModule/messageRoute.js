const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/authMiddleware')

const MessageRepository = require('./messageRepository');
const MessageService = require('./messageService');
const MessageController = require('./messsageController');

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

// Create a new message (from buyer)
router.post('/create', messageController.creatMessage);

// Get all messages for a specific dealer
router.get('/dealer', Auth.checkAuth, Auth.isAgent, messageController.getAllDealerMessages);

// Mark a message as read
router.patch('/:id/read', messageController.updateReadStatus);

module.exports = router;
