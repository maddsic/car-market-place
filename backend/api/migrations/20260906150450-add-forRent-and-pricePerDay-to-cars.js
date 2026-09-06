'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Car');

    // Duplicate Drive column check to avoid adding it again if it already exists
    if (!tableInfo.drive) {
      await queryInterface.addColumn('Car', 'drive', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }

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
    const tableInfo = await queryInterface.describeTable('Car');
    // Revert changes if migration is rolled back
    if (tableInfo.forRent) await queryInterface.removeColumn('Car', 'forRent');
    if (tableInfo.pricePerDay) await queryInterface.removeColumn('Car', 'pricePerDay');
  }
};
