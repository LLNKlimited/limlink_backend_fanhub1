const express = require('express');
const router = express.Router();
const PushSubscription = require('../../models/push_subscription');
const webpush = require('web-push');

// Load VAPID keys from .env
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:your-rick@llnklimited.com', // Replace with a real email if needed
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);


// Save push subscription
router.post('/', async (req, res) => {
  const { endpoint, keys } = req.body;

  if (!endpoint || !keys) {
    return res.status(400).json({ error: 'Missing push subscription fields' });
  }

  try {
    const exists = await PushSubscription.findOne({ endpoint });
    if (exists) {
      return res.status(200).json({ message: 'Subscription already exists' });
    }

    const newSub = new PushSubscription({ endpoint, keys });
    await newSub.save();

    res.status(201).json({ message: 'Push subscription saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Temporary test endpoint to trigger a push
router.post('/send-test', async (req, res) => {
  try {
    const subscription = await PushSubscription.findOne(); // Just get one for testing
    if (!subscription) return res.status(404).json({ error: 'No subscription found' });

    const payload = JSON.stringify({
      title: '🎤 Test Push',
      body: 'This is a test push notification.',
      url: 'https://your-landing-page.com'
    });

    await webpush.sendNotification(subscription.subscription, payload);

    res.json({ message: '✅ Push sent' });
  } catch (error) {
    console.error('❌ Push error:', error);
    res.status(500).json({ error: 'Push failed', details: error });
  }
});


module.exports = router;
