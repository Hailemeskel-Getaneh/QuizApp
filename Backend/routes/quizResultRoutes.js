import express from 'express';
const router = express.Router();
import Quiz from '../models/quizModel.js';
import QuizResult from '../models/quizResultModel.js';
import User from '../models/userModel.js';

router.post('/:quizId/submit', async (req, res) => {
  const { userId, answers } = req.body;
  const { quizId } = req.params;

  try {
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question) => {
      const correctAnswer = question.correctAnswer;  // Assuming each question has a 'correctAnswer' field
      if (answers[question.id] === correctAnswer) {
        score += 1;  // Increment score for each correct answer
      }
    });

    // Save quiz result to the database
    const newResult = new QuizResult({
      userId,
      quizId,
      score,
      answers,
    });

    await newResult.save();

    return res.status(200).json({ message: 'Quiz submitted successfully', score });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while submitting the quiz' });
  }
});

export default router;
