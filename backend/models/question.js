const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctIndex: Number,
  marks: { type: Number, default: 1 }
});

module.exports = mongoose.model('Question', QuestionSchema);
