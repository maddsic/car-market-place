const { processProfileImage } = require('../../helpers/processCarImage');
const { Car, Review, Activity, User } = require('../../models');
const { fn, col, literal } = require('sequelize');

// Repository layer interacts directly with the database models
class DealerRepository {

  // HELPER
  async findById(userId) {
    return await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    })
  }

  async getDealerCarStats(dealerId) {
    return await Car.findOne({
      where: { userId: dealerId },
      attributes: [
        [fn('COUNT', col('carId')), 'totalListings'],
        [
          fn(
            'SUM',
            literal("CASE WHEN status = 'available' THEN 1 ELSE 0 END")
          ),
          'availableListings',
        ],
        [
          fn('SUM', literal("CASE WHEN status = 'sold' THEN 1 ELSE 0 END")),
          'soldListings',
        ],
      ],
      raw: true,
    });
  }

  async getDealerCarReviewCount(dealerId) {
    return Review.count({
      where: { dealerId },
    });
  }

  async findDealerCars(dealerId) {
    // Let's see if we can get a count first to verify connectivity
    const count = await Car.count({ where: { userId: dealerId } });
    console.log(`Database check: Found ${count} cars for ID ${dealerId}`);
    return await Car.findAll({
      where: { userId: dealerId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findActivityByUserId(userId, limit = 5) {
    return await Activity.findAll({
      where: { userId },
      order: [['CreatedAt', 'DESC']],
      limit,
    });
  }

  async getDealerProfileCardData(userId) {
    const user = await User.findOne({
      where: { userId },
      attributes: ['first_name', 'last_name', 'username', 'email', 'phone', 'address', 'avatarUrl', 'createdAt',
        [fn('COUNT', col('reviews.reviewId')), 'reviewCount'],
      ],
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: [[fn('COUNT', col('reviewId')), 'reviewCount']],
        }
      ],
      group: ['User.userId'],
      subQuery: false,
      raw: true,
    })

    return processProfileImage(user);
  }

  async updateDealerProfile(userId, profileData) {
    return await User.update(profileData, {
      where: { userId },
    })
  }


}

module.exports = DealerRepository;
