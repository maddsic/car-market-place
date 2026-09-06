'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = await queryInterface.showAllTables();

    if (!tables.includes('CarModel')) {
      await queryInterface.createTable('CarModel', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        make_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = await queryInterface.showAllTables();

    if (tables.includes('CarModel')) {
      await queryInterface.dropTable('CarModel');
    }
  },
};
