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
  try {
    const { quizName, selectedCategories, totalTime, Passcode } = req.body;

    // Validate input
    if (!quizName || !selectedCategories || !totalTime || !Passcode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new quiz
    const newQuiz = new Quiz({
      quizName,
      categories: selectedCategories,
      totalTime,
      passcode: Passcode, // Save the passcode
    });

    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
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

// Endpoint to fetch questions based on passcode
router.post('/api/quiz/:id/questions', async (req, res) => {
  const { id } = req.params;
  const { passcode } = req.body;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Validate passcode
    if (quiz.Passcode !== passcode) {
      return res.status(401).json({ message: 'Incorrect passcode' });
    }

    // Send back the questions
    res.status(200).json(quiz.questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;