'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get existing table schema
    const tableInfo = await queryInterface.describeTable('User');

    // 2. Only add 'hasWhatsapp' if it doesn't already exist
    if (!tableInfo.hasWhatsapp) {
      await queryInterface.addColumn('User', 'hasWhatsapp', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('User');

    // Only remove 'hasWhatsapp' if it exists
    if (tableInfo.hasWhatsapp) {
      await queryInterface.removeColumn('User', 'hasWhatsapp');
    }
  },
};
