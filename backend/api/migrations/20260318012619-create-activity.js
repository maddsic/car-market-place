'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get list of existing tables
    const tables = await queryInterface.showAllTables();

    // Normalize table names to lower case for reliable comparison
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'activity'
    );

    // 2. Only create the table if it doesn't already exist
    if (!tableExists) {
      await queryInterface.createTable('Activity', {
        activityId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'userId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        action: {
          type: Sequelize.ENUM('CREATED', 'UPDATED', 'DELETED'),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }

    // 3. Safely check and create index if table exists
    const indexes = await queryInterface.showIndex('Activity');
    const indexExists = indexes.some((index) =>
      index.fields.some((field) => field.attribute === 'userId')
    );

    if (!indexExists) {
      await queryInterface.addIndex('Activity', ['userId']);
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const tableExists = tables.some(
      (table) => table.toLowerCase() === 'activity'
    );

    // Only drop the table if it exists
    if (tableExists) {
      await queryInterface.dropTable('Activity');
    }
  },
};
