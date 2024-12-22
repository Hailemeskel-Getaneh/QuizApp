import Quiz from '../models/quizModel.js';
import Question from '../models/questionModel.js';

// Add a question to a quiz
const addQuestionToQuiz = async (req, res) => {
  const { quizId, questionId } = req.body;

  try {
    // Ensure both IDs are provided
    if (!quizId || !questionId) {
      return res.status(400).json({ message: 'Quiz ID and Question ID are required' });
    }

    // Validate the quiz and question existence
    const quiz = await Quiz.findById(quizId);
    const question = await Question.findById(questionId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Add the question to the quiz
    quiz.questions.push(questionId);
    await quiz.save();

    res.status(200).json({ message: 'Question added to quiz successfully', quiz });
  } catch (error) {
    console.error('Error adding question to quiz:', error);
    res.status(500).json({ message: 'Error adding question to quiz' });
  }
};

export default addQuestionToQuiz;

