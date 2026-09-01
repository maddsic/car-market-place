const { User, Car, Sequelize } = require('../models');

// Repository for accessing dealer data from the database
class DealerRepository {
  // Get all dealers with the count of their cars and reviews
  async getAllDealersWithCarCount() {
    return User.findAll({
      where: { role: 'agent' },
      attributes: [
        'username',
        'phone',
        'address',
        'role',
        'userId',
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('cars.carId'))), 'carsCount'],
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('reviews.reviewId'))), 'reviewCount'],
      ],
      include: [
        {
          model: Car,
          as: 'cars',
          attributes: [],
          required: false, // Set to true if you only want dealers who have cars
        },
        {
          model: Review,
          as: 'dealerReviews', // Adjust this alias to match your association definition
          attributes: [],
          required: false, // Set to false so dealers with 0 reviews are still returned
        },
      ],
      group: ['User.userId'],
      subQuery: false,
    });
  }
  // Search dealers based on filters and include the count of their cars
  async searchDealersWithFilters(filters) {
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
