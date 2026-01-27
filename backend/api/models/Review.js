"use strict";

// models/Review.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define(
    "Review",
    {
      reviewId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false, // who wrote the review
      },
      dealerId: {
        type: DataTypes.UUID,
        allowNull: false, // who the review is about
      },
      buyingProcess: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      customerService: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      overallExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Review.associate = function (models) {
    // User who wrote the review
    Review.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
    // Dealer being reviewed
    Review.belongsTo(models.User, {
      foreignKey: "dealerId",
      as: "dealer",
      onDelete: "CASCADE",
    });
  };

  return Review;
};
