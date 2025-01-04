import express from 'express';
import Quiz from '../models/quizModel.js';
import Category from '../models/categoryModel.js';
import addQuestionToQuiz from '../controllers/quizController.js';

const router = express.Router();

// Fetch all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('categories'); // Populate category details
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
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Add a question to a quiz
router.post('/add-question-to-quiz', addQuestionToQuiz);

// Create a new quiz
router.post('/create-quiz', async (req, res) => {
  try {
    const { quizName, categories, totalTime, passcode } = req.body; // Updated keys to match frontend

    if (!quizName || !categories || !totalTime || !passcode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newQuiz = new Quiz({
      quizName,
      categories,
      totalTime,
      passcode, // Use lowercase passcode
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

// Fetch questions based on passcode
router.post('/quiz/:id/questions', async (req, res) => { // Removed `/api/`
  const { id } = req.params;
  const { passcode } = req.body;

  try {
    const quiz = await Quiz.findById(id).populate('questions'); // Populate questions

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.passcode !== passcode) {
      return res.status(401).json({ message: 'Incorrect passcode' });
    }

    res.status(200).json(quiz.questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/edit-quiz/:id', async (req, res) => {
  const quizId = req.params.id;
  const { quizName, categories, totalTime, passcode } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { quizName, categories, totalTime, passcode },
      { new: true } // Returns the updated quiz
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/quizzes/:quizId/time-limit', async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ totalTime: quiz.totalTime });
  } catch (error) {
    console.error('Error fetching quiz time limit:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
