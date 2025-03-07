const mongoose = require("mongoose");

const QuizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
  explanation: { type: String },
});

module.exports = mongoose.model("QuizQuestion", QuizQuestionSchema);
