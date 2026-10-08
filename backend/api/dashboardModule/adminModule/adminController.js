const { sendResponse } = require("../../helpers/response");

class AdminController {
  constructor(AdminService) {
    this.AdminService = AdminService;
  }

  // 1. Get dashboard statistics for admin
  getDashboardStats = async (req, res) => {
    try {
      const stats = await this.AdminService.getDashboardStats();
      return sendResponse(res, 200, true, "Dashboard statistics retrieved successfully", stats);
    } catch (error) {
      console.error("Admin Error: fetching dashboard stats:", error);
      return sendResponse(res, 500, false, "Internal Server Error", null);
    }
  }

  // 2. Get latest registered users
  getRecentUsers = async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 5;
      const recentUsers = await this.AdminService.getRecentUsers(limit);
      return sendResponse(res, 200, true, "Recent users retrieved successfully", recentUsers);
    } catch (error) {
      console.error("Admin Error: fetching recent users:", error);
      return sendResponse(res, 500, false, "Internal Server Error", null);
    }
  }

  // 3. Get all users with optional role or search filter
  getAllUsers = async (req, res) => {
    try {
      const { role, search } = req.query;
      const users = await this.AdminService.getAllUsers({ role, search });
      return sendResponse(res, 200, true, "Users retrieved successfully", users);
    } catch (error) {
      console.error("Admin Error: fetching all users:", error);
      return sendResponse(res, 500, false, "Internal Server Error", null);
    }
  }

  getAllCars = async (req, res) => {
    try {
      const { status, search } = req.query;
      const cars = await this.AdminService.listAllCars({ status, search });
      return res.status(200).json({ success: true, data: cars });
    } catch (error) {
      console.error('Admin getAllCars error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = AdminController;
