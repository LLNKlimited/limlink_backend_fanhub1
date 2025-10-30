const mongoose = require('mongoose');

const OptinOffer1Schema = new mongoose.Schema({
  phone: { type: String, required: false },
  email: { type: String, required: false },
  tipClicked: { type: Boolean, default: false },
  downloadClicked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OptinOffer1', OptinOffer1Schema);
