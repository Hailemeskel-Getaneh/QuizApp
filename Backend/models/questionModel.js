// questionModel.js

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  timeLimit: { type: Number, default: 30 },  // Time in seconds
});

const Question = mongoose.model('Question', questionSchema);

export default Question;