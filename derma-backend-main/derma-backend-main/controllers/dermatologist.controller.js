import bcrypt from 'bcryptjs';
import Dermatologist from '../models/Dermatologist.model.js';
import generateToken from '../utils/tokenGenerator.js';

export const dermatologistSignup = async (req, res) => {
 try {
  const {
   fullName,
   email,
   password,
   yearsOfExperience,
   phoneNumber,
   address,
   availableDays = []
  } = req.body;

  const diploma = req.files?.diploma?.map(file => file.filename) || [];
  const cinCardPhoto = req.files?.cinCardPhoto?.map(file => file.filename) || [];

  const existingDermatologist = await Dermatologist.findOne({ email });
  if (existingDermatologist) {
   return res.status(400).json({ message: 'Email already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newDermatologist = new Dermatologist({
   fullName,
   email,
   password: hashedPassword,
   yearsOfExperience,
   phoneNumber,
   address,
   diploma,        
   cinCardPhoto,   
   availableDays: Array.isArray(availableDays) ? availableDays : [availableDays]
  });

  await newDermatologist.save();

  res.status(201).json({ message: 'Dermatologist registered successfully.' });

 } catch (error) {
  console.error('Dermatologist signup error:', error);
  res.status(500).json({ message: 'Server error during signup.' });
 }
};


// export const dermatologistSignin = async (req, res) => {
//  try {
//   const { email, password } = req.body;

//   const dermatologist = await Dermatologist.findOne({ email });
//   if (!dermatologist) {
//    return res.status(401).json({ message: 'Invalid credentials.' });
//   }

//   const isMatch = await bcrypt.compare(password, dermatologist.password);
//   if (!isMatch) {
//    return res.status(401).json({ message: 'Invalid credentials.' });
//   }

//   const token = generateToken(dermatologist._id, 'dermatologist');

//   res.status(200).json({
//    message: 'Login successful.',
//    token,
//    user: {
//     id: dermatologist._id,
//     fullName: dermatologist.fullName,
//     email: dermatologist.email,
//     role: 'dermatologist',
//    },
//   });
//  } catch (error) {
//   console.error('Dermatologist login error:', error);
//   res.status(500).json({ message: 'Server error during login.' });
//  }
// };


export const dermatologistSignin = async (req, res) => {
 try {
  const { email, password } = req.body;

  const dermatologist = await Dermatologist.findOne({ email });
  if (!dermatologist) {
   return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Check if status is approved
  if (dermatologist.status !== 'approved') {
   return res.status(403).json({ message: 'Your account is not approved yet.' });
  }

  const isMatch = await bcrypt.compare(password, dermatologist.password);
  if (!isMatch) {
   return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = generateToken(dermatologist._id, 'dermatologist');

  res.status(200).json({
   message: 'Login successful.',
   token,
   user: {
    id: dermatologist._id,
    fullName: dermatologist.fullName,
    email: dermatologist.email,
    role: 'dermatologist',
   },
  });
 } catch (error) {
  console.error('Dermatologist login error:', error);
  res.status(500).json({ message: 'Server error during login.' });
 }
};
export const getDermatologistById = async (req, res) => {
 try {
  const { id } = req.params;

  const dermatologist = await Dermatologist.findById(id);
  if (!dermatologist) {
   return res.status(404).json({ message: 'Dermatologist not found.' });
  }

  res.status(200).json(dermatologist);
 } catch (error) {
  console.error('Error fetching dermatologist:', error);
  res.status(500).json({ message: 'Server error while fetching dermatologist.' });
 }
};

export const getAllDermatologists = async (req, res) => {
 try {
  const dermatologists = await Dermatologist.find();
  res.status(200).json(dermatologists);
 } catch (error) {
  console.error('Error fetching dermatologists:', error);
  res.status(500).json({ message: 'Server error while fetching dermatologists.' });
 }
};

export const deleteDermatologist = async (req, res) => {
 try {
  const { id } = req.params;

  const deleted = await Dermatologist.findByIdAndDelete(id);

  if (!deleted) {
   return res.status(404).json({ message: 'Dermatologist not found' });
  }

  res.status(200).json({ message: 'Dermatologist deleted successfully' });
 } catch (error) {
  console.error('Error deleting dermatologist:', error);
  res.status(500).json({ message: 'Server error during delete' });
 }
};