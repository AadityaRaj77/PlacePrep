const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  score: Number,
  total: Number,
  answers: [{ q: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answerIndex: Number }]
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);
