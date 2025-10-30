const express = require('express');
const router = express.Router();
const OptinSms = require('../../models/optin_sms');

router.post('/', async (req, res) => {
  const { phone, offerid, response } = req.body;

  if (!phone || typeof response !== 'boolean') {
    return res.status(400).json({ error: 'phone and response (true/false) are required.' });
  }

  try {
    const new_entry = new OptinSms({
      phone,
      offerid: offerid || '',
      optedin: response
    });

    await new_entry.save();

    res.status(201).json({ message: 'preference saved.' });
  } catch (err) {
    console.error('error saving sms opt-in:', err);
    res.status(500).json({ error: 'server error' });
    res.redirect('/thank_you_offer.html');
  }
});


module.exports = router;
