import mongoose from 'mongoose';

const dermatologistSchema = new mongoose.Schema({
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
 yearsOfExperience: {
  type: Number,
  required: true,
  min: 0,
 },
 phoneNumber: {
  type: String,
  required: true,
 },
 address: {
  type: String,
  required: true,
 },
 diploma: {
  type: [String],
  required: true,
 },
 cinCardPhoto: {
  type: [String], 
  required: true,
 },
 availableDays: {
  type: [String], 
  enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  default: [],
 },
 status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
 }
}, {
 timestamps: true,
});

const Dermatologist = mongoose.model('Dermatologist', dermatologistSchema);
export default Dermatologist;
