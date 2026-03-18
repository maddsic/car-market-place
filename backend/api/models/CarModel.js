"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CarModel = sequelize.define(
    "CarModel",
    {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      make_id: {
        type: DataTypes.UUID,
        references: {
          model: "CarMake",
          key: "id",
        },
        onDelete: "SET NULL",
      },
    },
    {
      freezeTableName: true,
    }
  );

  CarModel.associate = models => {
    const { CarMake, CarModelYear } = models;

    CarMake.hasMany(CarModel, {
      foreignKey: "make_id",
      onDelete: "SET NULL",
    });
    CarModel.belongsTo(CarMake, {
      foreignKey: "make_id",
    });
    // ADD THIS:
    CarModel.hasMany(CarModelYear, {
      foreignKey: "model_id",
      as: "years",
      onDelete: "CASCADE",
    });
  };

  return CarModel;
};
