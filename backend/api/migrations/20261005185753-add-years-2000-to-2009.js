'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [models] = await queryInterface.sequelize.query(
      'SELECT id FROM CarModel;'
    );

    if (models.length === 0) return;

    const yearsToInsert = [];
    const startYear = 2000;
    const endYear = 2009; // Only seed missing years 2000-2009

    models.forEach(model => {
      for (let year = startYear; year <= endYear; year++) {
        yearsToInsert.push({
          id: uuidv4(),
          year,
          model_id: model.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    const chunkSize = 1000;
    for (let i = 0; i < yearsToInsert.length; i += chunkSize) {
      const chunk = yearsToInsert.slice(i, i + chunkSize);
      await queryInterface.bulkInsert('CarModelYear', chunk);
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete only the newly added years if rolled back
    await queryInterface.bulkDelete('CarModelYear', {
      year: {
        [Sequelize.Op.gte]: 2000,
        [Sequelize.Op.lte]: 2009
      }
    });
  }
};
