// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
app.use(bodyParser.json());
app.use(compression());

// Routes
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// Health check
app.get('/status', (req, res) => {
  res.json({ message: 'App is live' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For testing
