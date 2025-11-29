const express = require('express');
const Test = require('../models/test');
const Question = require('../models/question');
const Result = require('../models/result');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const tests = await Test.find().populate('questions');
  res.json(tests);
});

router.post('/', async (req, res) => {
  const { title, description, timeLimitMinutes, questions } = req.body;
  const qDocs = await Question.insertMany(questions);
  const test = await Test.create({ title, description, timeLimitMinutes, questions: qDocs.map(q=>q._id) });
  res.json(test);
});

router.post('/:testId/submit', auth, async (req, res) => {
  const { answers } = req.body; // [{ qId, answerIndex }]
  const test = await Test.findById(req.params.testId).populate('questions');
  if(!test) return res.status(404).json({ msg: 'Test not found' });
  let score = 0, total = 0;
  const answersForDb = [];
  for(const q of test.questions){
    const provided = answers.find(a => a.qId === String(q._id));
    total += q.marks;
    if(provided && provided.answerIndex === q.correctIndex) score += q.marks;
    answersForDb.push({ q: q._id, answerIndex: provided ? provided.answerIndex : null });
  }
  const result = await Result.create({ user: req.user.id, test: test._id, score, total, answers: answersForDb });
  res.json({ score, total, resultId: result._id });
});

module.exports = router;
