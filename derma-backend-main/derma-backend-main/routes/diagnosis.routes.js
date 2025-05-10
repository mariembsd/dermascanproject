import express from 'express';
import {
 createDiagnosis,
 getDiagnosesByPatient,
 getDiagnosesByDermatologist,
 getLatestDiagnosisByPatient
} from '../controllers/diagnosis.controller.js';

const router = express.Router();

router.post('/', createDiagnosis);

router.get('/patient/:id', getDiagnosesByPatient);

router.get('/dermatologist/:id', getDiagnosesByDermatologist);
router.get('/latest/:patientId', getLatestDiagnosisByPatient);


export default router;
