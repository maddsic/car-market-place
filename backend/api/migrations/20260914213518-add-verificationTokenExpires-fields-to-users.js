'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('User');

    if (!table.verificationTokenExpires) {
      await queryInterface.addColumn('User', 'verificationTokenExpires', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('User');

    if (table.verificationTokenExpires) {
      await queryInterface.removeColumn('User', 'verificationTokenExpires');
    }
  },
};
