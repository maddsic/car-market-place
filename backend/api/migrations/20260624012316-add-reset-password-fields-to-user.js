'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('User');

    if (!table.resetCode) {
      await queryInterface.addColumn('User', 'resetCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.resetCodeExpires) {
      await queryInterface.addColumn('User', 'resetCodeExpires', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('User');

    if (table.resetCode) {
      await queryInterface.removeColumn('User', 'resetCode');
    }
    if (table.resetCodeExpires) {
      await queryInterface.removeColumn('User', 'resetCodeExpires');
    }
  }
};
