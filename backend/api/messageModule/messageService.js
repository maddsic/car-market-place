// MessageService.js
class MessageService {
  constructor(MessageRepository) {
    this.messageRepository = MessageRepository
  }

  // Create a new message
  async createMessage(data) {
    const { carId } = data;

    // Fetch the car listing to get the dealerId (owner of the car)
    const car = await this.messageRepository.findCarByPk(carId);
    // If the car listing doesn't exist, throw an error
    if (!car) {
      throw new Error('Car listing not found');
    }

    // Combine the message data with the dealerId from the car listing
    const finalData = {
      ...data,
      dealerId: car.userId,
    }

    const message = await this.messageRepository.createMessage(finalData);
    return message;
  }

  // Get all messages for a specific dealer
  async getAllDealerMessages(dealerId) {
    if (!dealerId) {
      throw new Error('Dealer ID is required to fetch messages');
    }
    return await this.messageRepository.findMessagesByDealerId(dealerId);
  }


  // Mark a message as read
  async updateReadStatus(id) {
    const message = await this.messageRepository.findMessageByPk(id);
    if (!message) {
      throw new Error('Message not found');
    }
    // Update the message's read status to true
    await this.messageRepository.updateReadStatus(id, true);
  }
}

module.exports = MessageService;
