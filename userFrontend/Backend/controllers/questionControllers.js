import Question from '../models/questionModel.js';
import Quiz from '../models/quizModel.js';

export const addQuestion = async (req, res) => {
    try {
        const { quizId, questionText, options, correctAnswer } = req.body;

        // Ensure all required fields are provided
        if (!quizId || !questionText || !options.length || !correctAnswer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new question
        const newQuestion = new Question({
            quizId,
            questionText,
            options,
            correctAnswer,
        });

        await newQuestion.save();

        // Update the quiz to include the new question's ID
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { $push: { questions: newQuestion._id } },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(201).json({
            message: 'Question added successfully',
            question: newQuestion,
            quiz: updatedQuiz, // Optionally return the updated quiz
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ message: 'Error adding question' });
    }
};



// Fetch questions for a specific quiz
export const getQuestionsByQuizId = async (req, res) => {
    try {
        const { quizId } = req.params; // Get the quizId from the URL parameters

        // Find all questions related to the quizId
        const questions = await Question.find({ quizId });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this quiz' });
        }

        // Return the list of questions
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
};


// Update an existing question
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params; // Extract question ID from route params
    const { questionText, options, correctAnswer } = req.body;

    // Ensure required fields are provided
    if (!questionText || !options || !correctAnswer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options, correctAnswer },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question' });
  }
};


//delete an exsting question

export const deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await Question.findByIdAndDelete(id);
  
      if (!deletedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ message: 'Error deleting question' });
    }
  };
  