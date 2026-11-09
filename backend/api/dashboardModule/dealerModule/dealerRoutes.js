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
router.put('/profile-update', Auth.checkAuth, Auth.isAgent, (req, res, next) => profileUploader.single('avatarUrl')(req, res, (err) => {
  if (err) {
    console.error('Error uploading profile image:', err);

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Image size exceeds the 5MB limit. Please upload a smaller image.',
      })
    }
    return res.status(400).json({
      success: false,
      message: err.message || 'Image upload failed. Please verify the file format and try again.'
    })
  }
  next();
}),
  dealerController.updateDealerProfile);

module.exports = router;
