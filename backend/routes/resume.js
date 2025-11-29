const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/auth');
const User = require('../models/user');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  if(!req.file) return res.status(400).json({ msg: 'No file' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  await User.findByIdAndUpdate(req.user.id, { resumeUrl: url });
  res.json({ url });
});

module.exports = router;
