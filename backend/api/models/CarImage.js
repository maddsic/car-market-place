"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CarImage = sequelize.define(
    "CarImage",
    {
      imageId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      carId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Car",
          key: "carId",
        },
        onDelete: "CASCADE",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isPrimary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  CarImage.associate = function (models) {
    CarImage.belongsTo(models.Car, {
      foreignKey: "carId",
      as: "car",
    });
  };

  return CarImage;
};
