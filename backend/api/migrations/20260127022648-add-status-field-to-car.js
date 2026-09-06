'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get existing table schema
    const tableInfo = await queryInterface.describeTable('Car');

    // 2. Only add 'status' if it doesn't already exist
    if (!tableInfo.status) {
      await queryInterface.addColumn('Car', 'status', {
        type: Sequelize.ENUM('available', 'sold', 'inactive'),
        allowNull: false,
        defaultValue: 'available',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Car');

    // Only remove 'status' if it exists
    if (tableInfo.status) {
      await queryInterface.removeColumn('Car', 'status');
    }
  },
};
