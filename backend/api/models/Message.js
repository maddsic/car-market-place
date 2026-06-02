const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define('Message', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    // This connects the message to the Car
    carId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // This connects the message to the User (Dealer)
    dealerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    senderName: { type: DataTypes.STRING, allowNull: false },
    senderEmail: { type: DataTypes.STRING, allowNull: false },
    senderPhone: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    freezeTableName: true,
    timestamps: true,
  })

  // Associations
  Message.associate = (models) => {
    // A message belongs to a user (dealer)
    Message.belongsTo(models.User, {
      foreignKey: 'dealerId',
      as: 'dealer',
    })
    // A message belongs to a car listing
    Message.belongsTo(models.Car, {
      foreignKey: "carId",
      as: "listing"
    })
  }


  return Message;
}
