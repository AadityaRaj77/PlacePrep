const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/auth');
const User = require('../models/user');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    await User.findByIdAndUpdate(req.user.id, { resumeUrl: url });

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('resumeUrl');
  res.json({ resumeUrl: user?.resumeUrl || null });
});

module.exports = router;
