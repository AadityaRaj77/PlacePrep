const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: String,
  description: String,
  timeLimitMinutes: Number,
  difficulty: { type: String, default: 'medium' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

module.exports = mongoose.model('Test', TestSchema);
