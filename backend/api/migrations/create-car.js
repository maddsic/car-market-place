"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Car", {
      carId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User", // table name
          key: "userId",
        },
        // onDelete: "SET NULL",
      },
      carType: { type: Sequelize.STRING, allowNull: false },
      make: { type: Sequelize.STRING, allowNull: false },
      model: { type: Sequelize.STRING, allowNull: false },
      year: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      mileage: { type: Sequelize.INTEGER, allowNull: false },
      fuelType: { type: Sequelize.ENUM("petrol", "gas"), allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      engineType: { type: Sequelize.STRING, allowNull: false },
      transmission: { type: Sequelize.STRING, allowNull: false },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "available",
      },
      isPremium: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("carBodyType", null, {});

    await queryInterface.dropTable("Car");
  },
};
