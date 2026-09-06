'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get list of existing tables
    const tables = await queryInterface.showAllTables();

    // Normalize table names to lower case for reliable cross-dialect comparison
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'carmodelyear'
    );

    // 2. Only create the table if it doesn't already exist
    if (!tableExists) {
      await queryInterface.createTable('CarModelYear', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        model_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'CarModel',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
        },
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'carmodelyear'
    );

    // Only drop the table if it exists
    if (tableExists) {
      await queryInterface.dropTable('CarModelYear');
    }
  },
};
