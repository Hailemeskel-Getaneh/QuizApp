import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    // categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    questionText: { type: String, required: true },
    options: [String],
    correctAnswer: String,
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
