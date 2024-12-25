import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  totalTime: { type: Number, required: true },
<<<<<<< HEAD
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // New field
  passcode: { type: String, required: true }
=======
  passcode: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // New field

>>>>>>> fd62111b6e3e32b49f2af312f10728d32d97b4ea
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
