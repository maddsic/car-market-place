"use strict";

module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity",
    {
      activityId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      action: { type: DataTypes.ENUM("CREATED", "UPDATED", "DELETED"), allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamp: true
    }
  );

  Activity.associate = function (models) {
    Activity.belongsTo(models.User, { foreignKey: "userId", as: "user" })
  }

  return Activity;
}
