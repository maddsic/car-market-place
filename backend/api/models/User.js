"use strict";

// For UUID types
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "agent", "user"),
        allowNull: false,
        defaultValue: "user",
      },
      hasWhatsapp: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Default to false if not specified
      },
    },
    {
      freezeTableName: true,
      paranoid: true, // implement soft delete
    }
  );

  // Associations
  User.associate = function (models) {
    User.hasMany(models.Car, {
      foreignKey: "userId",
      as: "cars",
    });
  };

  return User;
};
