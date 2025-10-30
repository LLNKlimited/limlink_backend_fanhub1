const mongoose = require('mongoose');

const optinSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phoneorsms: String,
  email: String,
  optin_sms_email_anytime: Boolean,
  optin_sms_email_showonly: Boolean,
  optin_email_only: Boolean,
  optoutall: {
    type: Boolean,
    default: false
  },
  band_demo_interest: {
    type: Boolean,
    default: false
  },
  business_partnership_interest: {
    type: Boolean,
    default: false
  },
  needs_review: {
    type: Boolean,
    default: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Optin', optinSchema);

