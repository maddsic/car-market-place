const { User, Car, Sequelize } = require('../models');

// Repository for accessing dealer data from the database
class DealerRepository {
  // Get all dealers with the count of their cars
  async getAllDealersWithCarCount() {
    return User.findAll({
      where: { role: 'agent' },
      group: ['User.userId'],
      attributes: [
        'username',
        'phone',
        'address',
        'role',
        'userId',
        [Sequelize.fn('COUNT', Sequelize.col('cars.carId')), 'carsCount'],
      ],
      include: {
        model: Car,
        as: 'cars',
        attributes: [],
        required: true, // Ensure only dealers with cars are included
      },
    });
  }
  // Search dealers based on filters and include the count of their cars
  async searchDealersWithFilters(filters) {
    // Build case-insensitive ILike/Like filters for strings
    const carWhere = {};
    if (filters.make) carWhere.make = { [Op.iLike || Op.like]: `%${filters.make}%` };
    if (filters.model) carWhere.model = { [Op.iLike || Op.like]: `%${filters.model}%` };
    if (filters.condition) carWhere.condition = filters.condition;

    return User.findAll({
      where: { role: 'agent' },
      group: ['User.userId'],
      attributes: [
        'userId',
        'username',
        'phone',
        'address',
        'role',
        [Sequelize.fn('COUNT', Sequelize.col('cars.carId')), 'carsCount'],
      ],
      include: [
        {
          model: Car,
          as: 'cars',
          where: filters,
          attributes: [],
          required: true,
        },
      ],
      group: [
        'User.userId',
        'User.username',
        'User.phone',
        'User.address',
        'User.role'
      ],
      subQuery: false,

    });
  }

  // Get a specific dealer by userId with their cars filtered by the provided criteria
  async getDealerWithFilteredCars(userId, filters) {
    return User.findOne({
      where: { role: 'agent', userId },
      attributes: ['userId', 'username', 'phone', 'address', 'role', 'email'],
      include: [
        {
          model: Car,
          as: 'cars',
          where: filters,
          attributes: [
            'carId',
            'make',
            'model',
            'condition',
            'price',
            'imageUrl',
          ],
          required: true,
        },
      ],
    });
  }
}

module.exports = DealerRepository;
