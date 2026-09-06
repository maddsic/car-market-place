'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get list of existing tables
    const tables = await queryInterface.showAllTables();

    // Normalize table names to lower case for reliable cross-dialect comparison
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'review'
    );

    // 2. Only create the table if it doesn't already exist
    if (!tableExists) {
      await queryInterface.createTable('Review', {
        reviewId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'userId',
          },
          onDelete: 'CASCADE',
        },
        dealerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'userId',
          },
          onDelete: 'CASCADE',
        },
        buyingProcess: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        customerService: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        overallExperience: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'review'
    );

    // Only drop the table if it exists
    if (tableExists) {
      await queryInterface.dropTable('Review');
    }
  },
};
