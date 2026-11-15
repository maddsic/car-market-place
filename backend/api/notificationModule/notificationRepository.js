'use strict';

class NotificationRepository {
  constructor(models) {
    this.Notification = models.Notification;
    this.User = models.User;
  }

  // Create a new notification
  async create(data) {
    return this.Notification.create(data);
  }

  // Get all notifications for a specific user, with an optional limit
  async findByUserId(userId, limit = 20) {
    return this.Notification.findAll({
      where: { userId },
      include: [
        {
          model: this.User,
          as: 'sender',
          attributes: ['userId', 'username', 'first_name', 'last_name', 'avatarUrl'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
    });
  }

  // Get unread notifications for a specific user
  async findUnreadByUserId(userId) {
    return this.Notification.findAll({
      where: { userId, isRead: false },
      order: [['createdAt', 'DESC']],
    });
  }

  // Mark a specific notification as read
  async markAsRead(id, userId) {
    const [updatedRows] = await this.Notification.update(
      { isRead: true },
      { where: { id, userId } }
    );
    return updatedRows > 0;
  }

  // Mark all notifications as read for a specific user
  async markAllAsRead(userId) {
    const [updatedRows] = await this.Notification.update(
      { isRead: true },
      { where: { userId, isRead: false } }
    );
    return updatedRows;
  }
}

module.exports = NotificationRepository;
