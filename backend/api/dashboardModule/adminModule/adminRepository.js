const { User, Car, CarImage } = require("../../models");
const { Op } = require("sequelize");

class AdminRepository {
  constructor(userModel = User, carModel = Car, carImageModel = CarImage) {
    this.User = userModel;
    this.Car = carModel;
    this.CarImage = carImageModel;
  }

  // 1. Get dashboard statistics for admin
  async getDashboardStats() {
    // Fetch total listings, total users, and total inquiries from the database
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalDealers = await User.count({ where: { role: 'agent' } });
    const totalListings = await Car.count();
    const activeListings = await Car.count({ where: { status: 'available' } });
    const totalValuations = await Car.sum('price', { where: { status: 'available' } });

    return {
      totalUsers,
      totalDealers,
      totalListings,
      activeListings,
      totalInventoryValue: totalValuations
    };
  }

  // 2. Get latest registered users
  async getRecentUsers(limit = 5) {
    const recentUsers = await User.findAll({
      attributes: ['userId', 'username', 'email', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit
    });
    return recentUsers;
  }

  // 3. Get all users with optional role or search filter
  async getAllUsers({ role, search }) {
    const where = {};

    if (role && role !== "all") {
      where.role = role;
    }

    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike ?? Op.like]: `%${search}%` } },
        { email: { [Op.iLike ?? Op.like]: `%${search}%` } },
      ];
    }

    return User.findAll({
      where,
      attributes: ["userId", "username", "email", "phone", "role", "isVerified", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
  }

  async getAllCars({ status, search }) {
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { make: { [Op.like]: `%${search}%` } },
        { model: { [Op.like]: `%${search}%` } },
        { vin: { [Op.like]: `%${search}%` } },
      ];
    }

    return this.Car.findAll({
      where,
      include: [
        {
          model: User,
          as: 'owner', // or 'user' depending on your model association
          attributes: ['userId', 'username', 'email', 'phone'],
        },
        {
          model: CarImage,
          as: 'images',
          attributes: ['imageUrl'],
          limit: 1, // just primary thumbnail
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }
}

module.exports = AdminRepository;
