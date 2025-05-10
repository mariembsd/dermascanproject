import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/', createNotification);           
router.get('/:userId', getNotifications);        
router.patch('/:id/read', markAsRead);            

export default router;
