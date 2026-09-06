'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Get list of existing tables
    const tables = await queryInterface.showAllTables();

    // Normalize table names to lower case for reliable cross-dialect comparison
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'carimage'
    );

    // 2. Only create the table if it doesn't already exist
    if (!tableExists) {
      await queryInterface.createTable('CarImage', {
        imageId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        carId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Car',
            key: 'carId',
          },
          onDelete: 'CASCADE',
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isPrimary: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = await queryInterface.showAllTables();
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'carimage'
    );

    // Only drop the table if it exists
    if (tableExists) {
      await queryInterface.dropTable('CarImage');
    }
  },
};
