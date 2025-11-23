const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Passport setup
require('./config/passport-config');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/formdb')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: "secretKey123",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);

// Server Start
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
