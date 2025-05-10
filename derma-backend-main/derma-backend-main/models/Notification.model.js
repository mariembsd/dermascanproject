import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
 receiverId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Patient or Dermatologist
 type: { type: String, enum: ['message', 'appointment'], required: true },
 content: { type: String, required: true },
 isRead: { type: Boolean, default: false },
 createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', notificationSchema);
