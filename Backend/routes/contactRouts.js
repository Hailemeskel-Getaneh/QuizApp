import express from 'express';
import { addContactMessage, getAllContactMessages } from '../controllers/contactController.js'; // Ensure the correct path to the controller

const router = express.Router();

// Add a new contact message
router.post('/', addContactMessage);

// Get all contact messages (for administrative purposes)
router.get('/', getAllContactMessages);

export default router;

