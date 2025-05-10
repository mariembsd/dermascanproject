import express from 'express';
import { approveDermatologist, loginAdmin, registerAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.patch('/dermatologists/:id/approve', approveDermatologist);

export default router;
