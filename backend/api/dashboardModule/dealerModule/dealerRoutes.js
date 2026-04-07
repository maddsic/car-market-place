const express = require('express');
const router = express.Router();

const Auth = require('../../middlewares/authMiddleware');

const DealerRepository = require('./dealerRepository');
const DealerService = require('./dealerService');
const DealerController = require('./dealerController');
const { profileUploader } = require('../../helpers/upload');

const dealerRepository = new DealerRepository();
const dealerService = new DealerService(dealerRepository);
const dealerController = new DealerController(dealerService);

// SEARCH DEALERS
router.get('/stats', Auth.checkAuth, dealerController.getDealerDashboardStats);
router.get('/activities', Auth.checkAuth, dealerController.getRecentActivities);
router.get(
  '/inventory',
  Auth.isAgent,
  dealerController.getDealerCars
);
router.get(
  '/inventory',
  Auth.checkAuth,
  dealerController.getDealerCars
);
router.get('/profile-card', Auth.checkAuth, dealerController.getDealerProfileCardData);
router.put('/profile-update', Auth.checkAuth, Auth.isAgent, profileUploader.single('avatarUrl'), dealerController.updateDealerProfile);

module.exports = router;
