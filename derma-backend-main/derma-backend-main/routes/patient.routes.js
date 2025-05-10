import express from 'express';
import { deletePatient, getAllPatients, getPatientById, patientSignin, patientSignup } from '../controllers/patient.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
 '/signup',
 upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'documents', maxCount: 10 }
 ]),
 patientSignup
);
router.post('/signin', patientSignin);
router.get('/:id', getPatientById);
router.get('/', getAllPatients);
router.delete('/delete/:id', deletePatient);

export default router;
