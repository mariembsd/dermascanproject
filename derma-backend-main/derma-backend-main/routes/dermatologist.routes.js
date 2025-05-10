import express from 'express';
import { deleteDermatologist, dermatologistSignin, dermatologistSignup, getAllDermatologists, getDermatologistById } from '../controllers/dermatologist.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
 '/signup',
 upload.fields([
  { name: 'diploma', maxCount: 10 },
  { name: 'cinCardPhoto', maxCount: 10 }
 ]),
 dermatologistSignup
);
router.post('/signin', dermatologistSignin);
router.get('/:id', getDermatologistById);
router.get('/', getAllDermatologists);
router.delete('/delete/:id', deleteDermatologist);



export default router;
