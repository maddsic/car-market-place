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
            onDelete: "CASCADE",
         },
      },
      {
         freezeTableName: true,
      }
   );

   CarModel.associate = models => {
      const { CarMake } = models;

      CarMake.hasMany(CarModel, {
         foreignKey: "make_id",
         onDelete: "CASCADE",
      });
      CarModel.belongsTo(CarMake, {
         foreignKey: "make_id",
      });
   };

   return CarModel;
};
