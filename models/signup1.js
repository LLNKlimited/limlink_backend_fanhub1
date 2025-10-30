// models/signup1.js

const mongoose = require('mongoose');

const signup1Schema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    trim: true
  },
  last: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {  // Standardized to 'message'
    type: String,
    required: false,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('signup1', signup1Schema);
