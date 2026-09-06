'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Car');

    if (!tableInfo.drive) {
      await queryInterface.addColumn('Car', 'drive', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableInfo.forRent) {
      await queryInterface.addColumn('Car', 'forRent', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      });
    }

    if (!tableInfo.pricePerDay) {
      await queryInterface.addColumn('Car', 'pricePerDay', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Car');

    if (tableInfo.drive) await queryInterface.removeColumn('Car', 'drive');
    if (tableInfo.forRent) await queryInterface.removeColumn('Car', 'forRent');
    if (tableInfo.pricePerDay) await queryInterface.removeColumn('Car', 'pricePerDay');
  }
};
