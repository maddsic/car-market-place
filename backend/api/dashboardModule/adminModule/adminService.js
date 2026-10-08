class AdminService {
  constructor(AdminRepository) {
    this.AdminRepository = AdminRepository;
  }

  // 1. Get dashboard statistics for admin
  async getDashboardStats() {
    return this.AdminRepository.getDashboardStats();
  }

  // 2. Get latest registered users
  async getRecentUsers(limit = 5) {
    return this.AdminRepository.getRecentUsers(limit);
  }

  // 3. Get all users with optional role or search filter
  async getAllUsers({ role, search }) {
    return this.AdminRepository.getAllUsers({ role, search });
  }

  // Add inside AdminService class:
  async listAllCars(filters) {
    return await this.AdminRepository.getAllCars(filters);
  }
}

module.exports = AdminService;
