import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
 discussionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
 senderRole: { type: String, enum: ['patient', 'dermatologist'], required: true },
 senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
 content: { type: String, required: true },
 timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
