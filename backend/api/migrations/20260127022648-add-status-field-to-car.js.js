'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Car")
    if (!tableInfo) {
      return queryInterface.addColumn('Car', 'status', {
        type: Sequelize.ENUM('available', 'sold', 'inactive'),
        allowNull: false,
        defaultValue: 'available',
      })
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Car', 'status');
  }
};
