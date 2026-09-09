const { User, Car, Review, Sequelize } = require('../models');

// Repository for accessing dealer data from the database
class DealerRepository {
  // Get all dealers with the count of their cars
  async getAllDealersWithCarCount() {
    try {
      return await User.findAll({
        where: { role: 'agent' },
        attributes: [
          'userId',
          'username',
          'phone',
          'address',
          'role',
          'avatarUrl',
          // Distinct count of cars owned by the agent
          [
            Sequelize.fn(
              'COUNT',
              Sequelize.fn('DISTINCT', Sequelize.col('cars.carId'))
            ),
            'carsCount'
          ],
          // Average overall experience rating rounded to 1 decimal place (defaults to 0 if no reviews)
          [
            Sequelize.fn(
              'COALESCE',
              Sequelize.fn(
                'ROUND',
                Sequelize.fn('AVG', Sequelize.col('dealerReviews.overallExperience')),
                1
              ),
              0
            ),
            'avgRating'
          ],
          // Distinct count of reviews received using the correct PK reviewId
          [
            Sequelize.fn(
              'COUNT',
              Sequelize.fn('DISTINCT', Sequelize.col('dealerReviews.reviewId'))
            ),
            'reviewsCount'
          ],
        ],
        include: [
          {
            model: Car,
            as: 'cars',
            attributes: [],
            required: true, // Only returns dealers with at least 1 car
          },
          {
            model: Review,
            as: 'dealerReviews',
            attributes: [],
            required: false, // Left join to calculate reviews if present
          }
        ],
        group: [
          'User.userId',
          'User.username',
          'User.phone',
          'User.address',
          'User.role',
          'User.avatarUrl'
        ],
        raw: true,
        subQuery: false,
      });
    } catch (error) {
      console.error("Error in getAllDealersWithCarCount:", error);
      throw error;
    }
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
          where: carWhere,
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
