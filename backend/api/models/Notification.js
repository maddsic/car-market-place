'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // Target recipient (Dealer / User)
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // Nullable sender (Admin userId for manual messages; null for automated system messages)
      senderId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'SYSTEM', // 'WELCOME', 'SYSTEM', 'ADMIN_NOTICE', 'LISTING'
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true, // e.g., '/dashboard/profile' or '/dashboard/inventory'
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Notification.associate = (models) => {
    // Recipient relation
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
      as: 'recipient',
      onDelete: 'CASCADE',
    });

    // Sender relation (Admin)
    Notification.belongsTo(models.User, {
      foreignKey: 'senderId',
      targetKey: 'userId',
      as: 'sender',
      onDelete: 'SET NULL',
    });
  };

  return Notification;
};
