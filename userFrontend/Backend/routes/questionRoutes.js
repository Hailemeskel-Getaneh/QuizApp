import express from 'express';
import { addQuestion, getQuestionsByQuizId,updateQuestion,deleteQuestion  } from '../controllers/questionControllers.js';

const router = express.Router();

// Add a question
router.post('/add-question', addQuestion);

// Get questions by quiz ID
router.get('/questions/:quizId', getQuestionsByQuizId); // Add this new route

//update a question by question id 

router.put('/update-question/:id', updateQuestion);

//delete question by  question id

router.delete('/delete-question/:id', deleteQuestion);


export default router;
