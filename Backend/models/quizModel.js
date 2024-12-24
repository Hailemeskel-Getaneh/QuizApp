import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  totalTime: { type: Number, required: true },
  passcode: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // New field

});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
