"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Review", {
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
          model: "User",
          key: "userId",
        },
        onDelete: "CASCADE",
      },
      dealerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        },
        onDelete: "CASCADE",
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Review");
  },
};
