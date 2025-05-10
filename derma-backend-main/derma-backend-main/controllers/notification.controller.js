import Notification from '../models/Notification.model.js';

export const createNotification = async (req, res) => {
 try {
  const { receiverId, type, content } = req.body;
  const notification = new Notification({ receiverId, type, content });
  await notification.save();
  res.status(201).json(notification);
 } catch (error) {
  console.error('Error creating notification:', error);
  res.status(500).json({ message: 'Failed to create notification' });
 }
};

export const getNotifications = async (req, res) => {
 try {
  const { userId } = req.params;
  const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
  res.status(200).json(notifications);
 } catch (error) {
  console.error('Error fetching notifications:', error);
  res.status(500).json({ message: 'Failed to fetch notifications' });
 }
};

export const markAsRead = async (req, res) => {
 try {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { isRead: true });
  res.status(200).json({ message: 'Notification marked as read' });
 } catch (error) {
  console.error('Error marking as read:', error);
  res.status(500).json({ message: 'Failed to mark notification as read' });
 }
};
