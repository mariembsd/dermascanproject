import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.model.js';
import generateToken from '../utils/tokenGenerator.js';
import Dermatologist from '../models/Dermatologist.model.js';

export const registerAdmin = async (req, res) => {
 try {
  const { fullName, email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
   return res.status(400).json({ message: 'Email already registered as admin.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
   fullName,
   email,
   password: hashedPassword
  });

  await newAdmin.save();

  res.status(201).json({ message: 'Admin registered successfully.' });
 } catch (error) {
  console.error('Admin registration error:', error);
  res.status(500).json({ message: 'Server error while registering admin.' });
 }
};


export const loginAdmin = async (req, res) => {
 try {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
   return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
   return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(admin._id, 'admin');

  res.status(200).json({
   message: 'Login successful',
   token,
   admin: {
    id: admin._id,
    fullName: admin.fullName,
    email: admin.email,
    role: 'admin',
   }
  });
 } catch (error) {
  console.error('Admin login error:', error);
  res.status(500).json({ message: 'Server error during login' });
 }
};


export const approveDermatologist = async (req, res) => {
 try {
  const { id } = req.params;

  const updated = await Dermatologist.findByIdAndUpdate(
   id,
   { status: 'approved' },
   { new: true }
  );

  if (!updated) {
   return res.status(404).json({ message: 'Dermatologist not found' });
  }

  res.status(200).json({ message: 'Dermatologist approved successfully', dermatologist: updated });
 } catch (error) {
  console.error('Error approving dermatologist:', error);
  res.status(500).json({ message: 'Server error while approving dermatologist' });
 }
};