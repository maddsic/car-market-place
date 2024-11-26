"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   const CarBodyType = sequelize.define(
      "CarBodyType",
      {
         typeId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
         typeName: { type: DataTypes.STRING, allowNull: false },
      },
      {
         freezeTableName: true,
         paranoid: true, //
      }
   );

   CarBodyType.associate = models => {
      const { Car } = models;

      CarBodyType.hasMany(Car, {
         foreignKey: "carType",
         as: "cars",
      });
   };

   return CarBodyType;
};
