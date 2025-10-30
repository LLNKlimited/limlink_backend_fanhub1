const mongoose = require('mongoose');

const optin_sms_schema = new mongoose.Schema({
  phone: { type: String, required: true },
  offerid: { type: String },
  optedin: { type: Boolean, required: true },
  createdat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('optin_sms', optin_sms_schema);
