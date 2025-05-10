import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
 name: String,
 dosage: String,
 frequency: String,
 duration: String,
});

const diagnosisSchema = new mongoose.Schema({
 dermatologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dermatologist', required: true },
 patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
 diseaseName: { type: String, required: true },
 description: { type: String },
 severity: { type: String, enum: ['mild', 'medium', 'severe', 'critical'], default: 'medium' },
 creationDate: { type: Date, required: true },
 expirationDate: { type: Date },
 medications: [medicationSchema]
}, {
 timestamps: true
});

export default mongoose.model('Diagnosis', diagnosisSchema);
