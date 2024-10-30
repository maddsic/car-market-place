"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   const CarMake = sequelize.define(
      "CarMake",
      {
         id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
         name: { type: DataTypes.STRING, allowNull: false },
         imageUrl: { type: DataTypes.STRING, allowNull: true },
      },
      {
         freezeTableName: true,
      }
   );

   CarMake.associate = models => {
      const { CarModel } = models;

      CarMake.hasMany(CarModel, {
         foreignKey: "make_id",
         onDelete: "CASCADE",
      });
   };

   return CarMake;
};
