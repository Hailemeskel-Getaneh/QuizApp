import express from 'express';
import { addQuestion } from '../controllers/questionControllers.js';

const router = express.Router();

// Add a question
router.post('/questions', addQuestion);


export default router;
