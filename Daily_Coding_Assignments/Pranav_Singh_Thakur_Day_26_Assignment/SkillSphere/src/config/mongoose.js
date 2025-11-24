// Steps
// 1. Import mongoose for MongoDB connection.
// 2. Import dotenv to load environment variables from .env.
// 3. Connect to MongoDB using MONGO_URI from .env.
// 4. Handle successful connection and errors.
// 5. Export mongoose for use in other files.

const mongoose = require('mongoose');  
require('dotenv').config();               

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
