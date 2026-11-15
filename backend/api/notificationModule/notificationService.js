'use strict';

class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  // Send a welcome notification to a new user
  async sendWelcomeNotification(userId) {
    return this.notificationRepository.create({
      userId,
      senderId: null,
      title: 'Welcome to Gamautos! 🇬🇲',
      message:
        'Welcome aboard! Explore available vehicles or set up your dealer profile to start showcasing your inventory across The Gambia.',
      type: 'WELCOME',
      link: '/dashboard/profile',
    });
  }

  // Send a notification to a dealer from an admin
  async sendAdminNotification({ userId, adminId, title, message, link, type = 'ADMIN_NOTICE' }) {
    return this.notificationRepository.create({
      userId,
      senderId: adminId,
      title,
      message,
      type,
      link: link || null,
    });
  }

  // Get all notifications for a user
  async getUserNotifications(userId) {
    return this.notificationRepository.findByUserId(userId);
  }

  // Get unread notifications for a user
  async getUnreadNotifications(userId) {
    return this.notificationRepository.findUnreadByUserId(userId);
  }

  // Mark a specific notification as read
  async markNotificationAsRead(id, userId) {
    return this.notificationRepository.markAsRead(id, userId);
  }

  // Mark all notifications as read for a user
  async markAllNotificationsAsRead(userId) {
    return this.notificationRepository.markAllAsRead(userId);
  }
}

module.exports = NotificationService;
