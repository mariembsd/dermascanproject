import express from 'express';
import { createDiscussion, sendMessage, getMessages, getDiscussionsByDermatologist, getDiscussionsByPatient, getLatestMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/discussions', createDiscussion);           
router.post('/messages', sendMessage);                   
router.get('/messages/:discussionId', getMessages);      
router.get('/discussions/dermatologist/:id', getDiscussionsByDermatologist);
router.get('/discussions/patient/:id', getDiscussionsByPatient);
router.get('/discussions/:discussionId/latest', getLatestMessage);



export default router;
