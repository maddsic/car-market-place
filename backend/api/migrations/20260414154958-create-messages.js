'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get existing tables
    const tables = await queryInterface.showAllTables();

    // 2. Only create 'Message' table if it doesn't exist
    if (!tables.includes('Message')) {
      await queryInterface.createTable('Message', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        carId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'Car', key: 'carId' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        dealerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'User', key: 'userId' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        senderName: { type: Sequelize.STRING, allowNull: false },
        senderEmail: { type: Sequelize.STRING, allowNull: false },
        senderPhone: { type: Sequelize.STRING, allowNull: true },
        content: { type: Sequelize.TEXT, allowNull: false },
        isRead: { type: Sequelize.BOOLEAN, defaultValue: false },
        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedAt: { allowNull: false, type: Sequelize.DATE },
      });

      // Add indexes directly inside table creation check
      await queryInterface.addIndex('Message', ['dealerId']);
      await queryInterface.addIndex('Message', ['carId']);
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    if (tables.includes('Message')) {
      await queryInterface.dropTable('Message');
    }
  },
};
