// routes/api/optin_offer1.js
const express = require('express');
const path = require('path');
const router = express.Router();
const OptinOffer1 = require('../../models/optin_offer1');

router.post('/', async (req, res) => {
  try {
    const { phone, email, tipClicked, downloadClicked } = req.body;

    const newEntry = new OptinOffer1({
      phone,
      email,
      tipClicked,
      downloadClicked
    });

    await newEntry.save();

    // ✅ Success → show thank you page
    res.sendFile(path.join(__dirname, '../../views/thank_you_offer.html'));

  } catch (err) {
    console.error('❌ Server error:', err);

    // ⚠️ Error → show error thank you page
    res.status(500).sendFile(path.join(__dirname, '../../views/error_thank_you.html'));
  }
});

module.exports = router;

