import express from 'express';
import Quiz from '../models/quizModel.js';
import Category from '../models/categoryModel.js';
import addQuestionToQuiz from '../controllers/quizController.js'

const router = express.Router();


// Fetch all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    // const quizzes = await Quiz.find().populate('categories');
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });  }
});

router.post('/add-question-to-quiz', addQuestionToQuiz);
// Create a new quiz
router.post('/create-quiz', async (req, res) => {
  const { quizName, selectedCategories, totalTime } = req.body;

  try {
    const quiz = new Quiz({
      quizName,
      categories: selectedCategories,
      totalTime,
    });

    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// Delete a quiz by ID
router.delete('/delete-quiz/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

export default router;