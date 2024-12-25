import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  totalTime: { type: Number, required: true },
<<<<<<< HEAD
  passcode: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // New field

=======
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // New field
  passcode: { type: String, required: true }
>>>>>>> 72fd831d9b2072666a77032e292358f32ac8bc01
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
