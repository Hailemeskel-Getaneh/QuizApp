import Question from '../models/questionModel.js';

// Add a new question
export const addQuestion = async (req, res) => {
    try {
        const { categoryId, questionText, options, correctAnswer, timeLimit } = req.body;

        // Ensure all required fields are provided
        if (!categoryId || !questionText || !options.length || !correctAnswer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new question
        const newQuestion = new Question({
            categoryId,
            questionText,
            options,
            correctAnswer,
            timeLimit,
        });


        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ message: 'Error adding question' });
    }
};
