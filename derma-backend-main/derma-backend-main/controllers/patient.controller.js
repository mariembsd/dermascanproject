import bcrypt from 'bcryptjs';
import Patient from '../models/Patient.model.js';
import generateToken from '../utils/tokenGenerator.js';


export const patientSignup = async (req, res) => {
 try {
  const {
   fullName,
   email,
   password,
   birthDate,
   phoneNumber,
   gender,
   skinType,
   medicalConditions = ''
  } = req.body;

  const existingPatient = await Patient.findOne({ email });
  if (existingPatient) {
   return res.status(400).json({ message: 'Email already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Get uploaded file names from multer
  const images = req.files?.images?.map(file => file.filename) || [];
  const documents = req.files?.documents?.map(file => file.filename) || [];

  const newPatient = new Patient({
   fullName,
   email,
   password: hashedPassword,
   birthDate,
   phoneNumber,
   gender,
   skinType,
   images,
   documents,
   medicalConditions
  });

  await newPatient.save();
  res.status(201).json({ message: 'Patient registered successfully.' });

 } catch (error) {
  console.error('Patient signup error:', error);
  res.status(500).json({ message: 'Server error during signup.' });
 }
};



export const patientSignin = async (req, res) => {
 try {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });
  if (!patient) {
   return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
   return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = generateToken(patient._id, 'patient');

  res.status(200).json({
   message: 'Login successful.',
   token,
   user: {
    id: patient._id,
    fullName: patient.fullName,
    email: patient.email,
    role: 'patient',
   },
  });
 } catch (error) {
  console.error('Patient login error:', error);
  res.status(500).json({ message: 'Server error during login.' });
 }
};

export const getPatientById = async (req, res) => {
 try {
  const { id } = req.params;

  const patient = await Patient.findById(id);
  if (!patient) {
   return res.status(404).json({ message: 'Patient not found.' });
  }

  res.status(200).json(patient);
 } catch (error) {
  console.error('Error fetching patient:', error);
  res.status(500).json({ message: 'Server error while fetching patient.' });
 }
}

export const getAllPatients = async (req, res) => {
 try {
  const patients = await Patient.find();
  res.status(200).json(patients);
 } catch (error) {
  console.error('Error fetching patients:', error);
  res.status(500).json({ message: 'Server error while fetching patients' });
 }
};



export const deletePatient = async (req, res) => {
 try {
  const { id } = req.params;

  const deleted = await Patient.findByIdAndDelete(id);

  if (!deleted) {
   return res.status(404).json({ message: 'Patient not found' });
  }

  res.status(200).json({ message: 'Patient deleted successfully' });
 } catch (error) {
  console.error('Error deleting patient:', error);
  res.status(500).json({ message: 'Server error during delete' });
 }
};