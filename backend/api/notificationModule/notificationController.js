'use strict';

class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  // Send a welcome notification to a new user
  getNotifications = async (req, res) => {
    try {
      const userId = req.user.userId;
      const notifications = await this.notificationService.getUserNotifications(userId);
      return res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve notifications' });
    }
  }

  // Get unread notifications for a user
  getUnreadNotificationsCount = async (req, res) => {
    try {
      const userId = req.user.userId;
      const unread = await this.notificationService.getUnreadNotifications(userId);
      return res.status(200).json({ success: true, count: unread.length, data: unread });
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve unread count' });
    }
  }

  // Mark a specific notification as read
  markAsRead = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const updated = await this.notificationService.markNotificationAsRead(id, userId);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Notification not found' });
      }

      return res.status(200).json({ success: true, message: 'Marked as read' });
    } catch (error) {
      console.error('Error updating notification:', error);
      return res.status(500).json({ success: false, message: 'Failed to update notification' });
    }
  }

  // Mark all notifications as read for a user
  markAllAsRead = async (req, res) => {
    try {
      const userId = req.user.userId;
      await this.notificationService.markAllNotificationsAsRead(userId);
      return res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
      console.error('Error marking all notifications read:', error);
      return res.status(500).json({ success: false, message: 'Failed to mark all as read' });
    }
  }

  // Send a notification to a dealer from an admin
  sendToDealer = async (req, res) => {
    try {
      const adminId = req.user.userId;
      const { dealerId, title, message, link, type } = req.body;

      if (!dealerId || !title || !message) {
        return res.status(400).json({
          success: false,
          message: 'dealerId, title, and message are required',
        });
      }

      const notification = await this.notificationService.sendAdminNotification({
        userId: dealerId,
        adminId,
        title,
        message,
        link,
        type,
      });

      return res.status(201).json({ success: true, data: notification });
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return res.status(500).json({ success: false, message: 'Failed to send notification' });
    }
  }
}

module.exports = NotificationController;
