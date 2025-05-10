import moment from 'moment';
import Dermatologist from '../models/Dermatologist.model.js';
import Appointment from '../models/Appointment.model.js';
import NotificationModel from '../models/Notification.model.js';

export const bookAppointment = async (req, res) => {
 try {
  const { patientId, dermatologistId, date, time } = req.body;

  // Validation: Required fields
  if (!patientId || !dermatologistId || !date || !time) {
   return res.status(400).json({ message: 'All fields are required: patientId, dermatologistId, date, and time.' });
  }

  // Find the dermatologist
  const dermatologist = await Dermatologist.findById(dermatologistId);
  if (!dermatologist) {
   return res.status(404).json({ message: 'Dermatologist not found.' });
  }

  // Validate selected day is within the dermatologist's available days
  const dayName = moment(date, 'YYYY-MM-DD').format('dddd'); // e.g., "Monday"
  if (!dermatologist.availableDays.includes(dayName)) {
   return res.status(400).json({ message: `Dermatologist is not available on ${dayName}.` });
  }

  // Check if the time slot is already taken
  const existingAppointment = await Appointment.findOne({
   dermatologistId,
   date,
   time,
  });

  if (existingAppointment) {
   return res.status(400).json({ message: `The time slot ${time} on ${date} is already booked.` });
  }

  // Book the appointment
  const appointment = new Appointment({
   patientId,
   dermatologistId,
   date,
   time,
  });

  await appointment.save();

  const notification = new NotificationModel({
   receiverId: dermatologistId,
   content: '📅 New appointment booked by a patient!',
   type: 'appointment',
  });


  await notification.save();


  res.status(201).json({
   message: '✅ Appointment booked successfully.',
   appointment,
  });
 } catch (err) {
  console.error('Booking error:', err);
  res.status(500).json({ message: '❌ Server error during appointment booking.' });
 }
};


export const getBookedSlots = async (req, res) => {
 const { dermatologistId, date } = req.query;

 try {
  const appointments = await Appointment.find({ dermatologistId, date });
  const bookedTimes = appointments.map(a => a.time);

  res.status(200).json(bookedTimes);
 } catch (error) {
  console.error('Error fetching booked slots:', error);
  res.status(500).json({ message: 'Server error' });
 }
};

export const getAppointmentsByPatient = async (req, res) => {
 const { patientId } = req.params;

 try {
  const appointments = await Appointment.find({ patientId }).populate('dermatologistId');
  res.json(appointments);
 } catch (error) {
  console.error('Error fetching patient appointments:', error);
  res.status(500).json({ message: 'Server error' });
 }
};


export const getAppointmentsByDermatologist = async (req, res) => {
 try {
  const { dermatologistId } = req.params;

  const appointments = await Appointment.find({ dermatologistId })
   .populate('patientId', 'fullName') // To get patient name
   .sort({ date: 1, time: 1 });

  const formatted = appointments.map(appt => ({
   date: appt.date,
   time: appt.time,
   patientName: appt.patientId?.fullName,
  }));

  res.json(formatted);
 } catch (err) {
  console.error('Error fetching dermatologist appointments:', err);
  res.status(500).json({ message: 'Server error' });
 }
};

export const getPatientsForDermatologist = async (req, res) => {
 try {
  const dermatologistId = req.params.id;

  const appointments = await Appointment.find({ dermatologistId })
   .populate('patientId');

  const patients = appointments.map(app => {
   const patient = app.patientId;

   return {
    id: patient._id,
    fullName: patient.fullName,
    email: patient.email,
    gender: patient.gender,
    birthDate: patient.birthDate,
    phoneNumber: patient.phoneNumber,
    skinType: patient.skinType,
    medicalConditions: patient.medicalConditions,
    images: patient.images || [],
    documents: patient.documents || [],
    lastVisit: app.date, 
   };
  });

  res.status(200).json(patients);
 } catch (err) {
  console.error('Error fetching patients:', err);
  res.status(500).json({ message: 'Server error' });
 }
};


export const getAppointmentsByDermAndDate = async (req, res) => {
 try {
  const { dermatologistId, date } = req.query;

  if (!dermatologistId || !date) {
   return res.status(400).json({ message: 'Missing dermatologistId or date' });
  }

  const appointments = await Appointment.find({ dermatologistId, date });
  res.json(appointments);
 } catch (error) {
  console.error('Error fetching booked slots:', error);
  res.status(500).json({ message: 'Server error while fetching appointments' });
 }
};

