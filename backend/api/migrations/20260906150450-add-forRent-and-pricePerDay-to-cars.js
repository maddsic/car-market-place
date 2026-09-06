'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add 'forRent' column (Boolean, defaults to false)
    await queryInterface.addColumn('Car', 'forRent', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });

    // 2. Add 'pricePerDay' column (Integer, nullable since rental cars might not have it)
    await queryInterface.addColumn('Car', 'pricePerDay', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes if migration is rolled back
    await queryInterface.removeColumn('Car', 'forRent');
    await queryInterface.removeColumn('Car', 'pricePerDay');
  }
};
