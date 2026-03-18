"use strict";

module.exports = (sequelize, DataTypes) => {
  const CarModelYear = sequelize.define(
    "CarModelYear",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "CarModel",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  CarModelYear.associate = (models) => {
    CarModelYear.belongsTo(models.CarModel, {
      foreignKey: "model_id",
      as: "model",
    });
  };

  return CarModelYear;
};
