const express = require("express");
const { checkAuth } = require("../../middlewares/verifyToken");
const router = express.Router();

const AuthMiddleware = require("../../middlewares/authenticateAgent");

const DealerRepository = require("./dealerRepository");
const DealerService = require("./dealerService")
const DealerController = require("./dealerController");

const dealerRepository = new DealerRepository();
const dealerService = new DealerService(dealerRepository);
const dealerController = new DealerController(dealerService);

// SEARCH DEALERS
router.get("/stats", checkAuth, dealerController.getDealerDashboardStats);
router.get("/activities", checkAuth, dealerController.getRecentActivities);
router.get("/inventory", AuthMiddleware.checkAgent, dealerController.getDealerCars);
router.get("/inventory", AuthMiddleware.checkAgent, dealerController.getDealerCars);


module.exports = router;
