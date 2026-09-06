'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Get existing table schema
    const tableInfo = await queryInterface.describeTable('User');

    // 2. Only add 'username' if it doesn't already exist
    if (!tableInfo.username) {
      await queryInterface.addColumn('User', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('User');

    // Only remove 'username' if it exists
    if (tableInfo.username) {
      await queryInterface.removeColumn('User', 'username');
    }
  },
};
