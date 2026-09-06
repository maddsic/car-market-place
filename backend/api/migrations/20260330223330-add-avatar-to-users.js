'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get existing table schema
    const tableInfo = await queryInterface.describeTable('User');

    // 2. Only add 'avatarUrl' if it doesn't already exist
    if (!tableInfo.avatarUrl) {
      await queryInterface.addColumn('User', 'avatarUrl', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('User');

    // Only remove 'avatarUrl' if it exists
    if (tableInfo.avatarUrl) {
      await queryInterface.removeColumn('User', 'avatarUrl');
    }
  },
};
