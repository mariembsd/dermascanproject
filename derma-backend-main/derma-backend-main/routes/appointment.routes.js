import express from 'express';
import { bookAppointment, getAppointmentsByDermAndDate, getAppointmentsByDermatologist, getAppointmentsByPatient, getBookedSlots, getPatientsForDermatologist } from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/appointments', bookAppointment);
router.get('/appointments', getBookedSlots);
router.get('/appointments/patient/:patientId', getAppointmentsByPatient);
router.get('/appointments/dermatologist/:dermatologistId', getAppointmentsByDermatologist);
router.get('/appointments/dermatologist/:id/patients', getPatientsForDermatologist);

router.get('/appointments/available', getAppointmentsByDermAndDate);




export default router;
