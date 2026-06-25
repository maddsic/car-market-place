'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add resetCode column
    await queryInterface.addColumn('User', 'resetCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add resetCodeExpires column
    await queryInterface.addColumn('User', 'resetCodeExpires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns if migration is rolled back
    await queryInterface.removeColumn('User', 'resetCode');
    await queryInterface.removeColumn('User', 'resetCodeExpires');
  }
};
