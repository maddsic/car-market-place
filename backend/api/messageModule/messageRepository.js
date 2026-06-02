const { Message, Car } = require('../models');

class MessageRepository {

  // Create a new message
  async createMessage(data) {
    return await Message.create(data);
  }

  // Get all messages for a specific dealer
  async findMessagesByDealerId(dealerId) {
    return await Message.findAll({
      where: { dealerId },
      include: [
        { model: Car, as: 'listing', attributes: ['carId', 'make', 'model', 'price', 'imageUrl'] },
      ],
      order: [['createdAt', 'DESC']]
    })
  }

  // Update message read status
  async updateReadStatus(id, isRead) {
    return await Message.update({ isRead }, {
      where: { id }
    })
  }

  // Find a message by its primary key
  async findMessageByPk(id) {
    return await Message.findByPk(id, {
      iclude: ['listing']
    })
  }

  async findCarByPk(carId) {
    return await Car.findByPk(carId)
  }
}

module.exports = MessageRepository;
