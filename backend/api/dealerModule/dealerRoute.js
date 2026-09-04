const express = require('express');
const router = express.Router();

const DealerRepository = require('./dealerRepository');
const DealerService = require('./dealerService');
const DealerController = require('./dealerController');

const dealerRepository = new DealerRepository();
const dealerService = new DealerService(dealerRepository);
const dealerController = new DealerController(dealerService);

router.get('/', dealerController.getAllDealersWithCarCount);
// router.get('/search-dealers', dealerController.searchDealersWithFilters);
router.get(
  '/filtered-cars/:userId',
  dealerController.getDealerByIdWithFilteredCars
);

module.exports = router;
