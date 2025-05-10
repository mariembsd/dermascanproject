import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
 fullName: {
  type: String,
  required: true,
  trim: true,
 },
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
 },
 password: {
  type: String,
  required: true,
 },
 birthDate: {
  type: Date,
  required: true,
 },
 phoneNumber: {
  type: String,
  required: true,
 },
 gender: {
  type: String,
  enum: ['female', 'male'],
  required: true,
 },
 skinType: {
  type: String,
  enum: ['normal', 'dry', 'oily', 'combination', 'sensitive'],
  required: true,
 },
 images: {
  type: [String], 
  default: [],
 },
 documents: {
  type: [String], 
  default: [],
 },
 medicalConditions: {
  type: String,
  default: '',
 },
}, {
 timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
