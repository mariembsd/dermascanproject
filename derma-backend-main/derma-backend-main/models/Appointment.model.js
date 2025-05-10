import mongoose from 'mongoose';


const appointmentSchema = new mongoose.Schema({

 patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
 dermatologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dermatologist', required: true },
 date: { type: String, required: true }, 
 time: { type: String, required: true }, 
 status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }

}, {
 timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
