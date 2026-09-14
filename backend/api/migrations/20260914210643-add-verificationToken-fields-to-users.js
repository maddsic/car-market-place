'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check existing table columns so it runs safely on Railway (idempotent)
    const tableInfo = await queryInterface.describeTable('User');

    if (!tableInfo.verificationToken) {
      await queryInterface.addColumn('User', 'verificationToken', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('User');

    if (tableInfo.verificationToken) {
      await queryInterface.removeColumn('User', 'verificationToken');
    }
  },
};
