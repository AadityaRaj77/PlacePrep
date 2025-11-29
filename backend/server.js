const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const testsRoutes = require('./routes/tests');
const resumeRoutes = require('./routes/resume'); // ✅

const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/resume', resumeRoutes); // ✅

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
};

start();
