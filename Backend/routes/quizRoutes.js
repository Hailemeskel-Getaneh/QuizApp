// quizRoutes.js
import express from 'express';
import Question from '../models/questionModel.js';

const router = express.Router();

// Get quiz for user (random or by category)
router.get('/quiz/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const questions = await Question.find({ category: categoryId }).populate('category');
    const quiz = questions.map(q => ({
      questionText: q.questionText,
      options: q.options,
      timeLimit: q.timeLimit
    }));
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
});

export default router;
