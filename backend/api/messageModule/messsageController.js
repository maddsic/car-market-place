const { sendResponse } = require("../helpers/response");

class MessageController {
  constructor(MessageService) {
    this.messageService = MessageService;
  }

  //  create meaage for dealeer
  creatMessage = async (req, res) => {
    try {
      const result = await this.messageService.createMessage(req.body);
      return sendResponse(res, 201, true, 'Message created successfully', result);
    } catch (error) {
      console.error('ERROR CREATING MESSAGE FROM CreateMessage Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // get all messages for a dealer`
  getAllDealerMessages = async (req, res) => {
    const dealerId = req.user?.userId;
    const message = await this.messageService.getAllDealerMessages(dealerId)
    if (!message) {
      return sendResponse('res', 404, false, "No Record Found")
    }
    return sendResponse(res, 200, true, 'Messages retrieved successfully', message)
  }

  // mark a message as read
  updateReadStatus = async (req, res) => {
    const messageId = req.params.id;
    const dealerId = req.user?.userId;

    try {
      await this.messageService.updateReadStatus(messageId, dealerId);
      return sendResponse(res, 200, true, 'Message marked as read');
    } catch (error) {
      console.error('ERROR UPDATING MESSAGE READ STATUS FROM MarkAsRead Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  }
}

module.exports = MessageController;
