'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Message', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      // FOREIGN KEYS
      carId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Car', // Must match the table name in your DB
          key: 'carId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dealerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User', // Must match the table name in your DB
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      senderName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senderEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senderPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // ADD INDEXES for faster dashboard loading
    await queryInterface.addIndex('Message', ['dealerId']);
    await queryInterface.addIndex('Message', ['carId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Message');
  }
};
