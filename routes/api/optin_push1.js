// routes/api/optin_push1.js

const express = require('express');
const router = express.Router();
const Optin = require('../../models/optin_push1');

router.post('/', async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phoneorsms,
      email,
      optin_sms_email_anytime,
      optin_sms_email_showonly,
      optin_email_only,
      optoutall,
      band_demo_interest,
      business_partnership_interest
    } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newOptin = new Optin({
      firstname,
      lastname,
      phoneorsms,
      email,
      optin_sms_email_anytime: !!optin_sms_email_anytime,
      optin_sms_email_showonly: !!optin_sms_email_showonly,
      optin_email_only: !!optin_email_only,
      optoutall: !!optoutall,
      band_demo_interest: !!band_demo_interest,
      business_partnership_interest: !!business_partnership_interest
    });

    await newOptin.save();

    res.status(201).json({ message: 'Preferences saved successfully.' });
  } catch (error) {
    console.error('❌ Error saving preferences:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
