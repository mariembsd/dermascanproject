import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
 patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
 dermatologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dermatologist', required: true },
 createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Discussion', discussionSchema);
