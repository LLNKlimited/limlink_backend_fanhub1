const express = require('express');
const router = express.Router();
const Signup1 = require('../../models/signup1');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { first, last, email, message } = req.body;

    if (!first || !last || !email) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Save to MongoDB
    const newSignup = new Signup1({ first, last, email, message });
    await newSignup.save();

    // Optional: Send email notification
    if (process.env.EMAIL_HOST && process.env.EMAIL_TO) {
      const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'New Signup Received',
        text: `You have a new signup:\n\nName: ${first} ${last}\nEmail: ${email}\nMessage: ${message || 'No message provided'}`,
      });
    }

    res.json({ success: true, message: 'Signup saved successfully' });
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
