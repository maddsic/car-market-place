const express = require('express');
const router = express.Router();

const Auth = require('../../middlewares/authMiddleware');

const AdminRepository = require('./adminRepository');
const AdminService = require('./adminService');
const AdminController = require('./adminController');

// Clean Dependency Injection Chain
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

// Admin Routes (ensure you have an isAdmin or checkAuth middleware)
router.get('/stats', Auth.isAdmin, adminController.getDashboardStats);
router.get('/recent-users', Auth.isAdmin, adminController.getRecentUsers);
router.get('/users', Auth.isAdmin, adminController.getAllUsers);
router.get('/cars', Auth.isAdmin, adminController.getAllCars);

module.exports = router;
