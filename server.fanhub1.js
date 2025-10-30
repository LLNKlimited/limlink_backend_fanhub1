const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const webPush = require('web-push');

// --- Hardcoded VAPID keys ---
const VAPID_PUBLIC_KEY = 'BCgC2F9WcQXA96e5_TUH5pyos2PiUOP822vVp-rmw38fh-CydZGnOJbzzYE8IW3ZSZ3kFCN1A_fku7YT4_EoH04';
const VAPID_PRIVATE_KEY = 'QT_Qu_0lmGlDHMtFclmiqyM5pjlpcdgDVIcmN6Zb5jM';
const VAPID_CONTACT_EMAIL = 'mailto:rick@llnklimited.com';

// Initialize web-push
webPush.setVapidDetails(
  VAPID_CONTACT_EMAIL,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);
console.log('✅ web-push initialized with VAPID keys');

const app = express();
const PORT = 3000; // or any port you want
const MONGO_URI = 'YOUR_MONGO_URI_HERE'; // hardcode or keep environment variable if you prefer

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML and assets from /views
app.use(express.static(path.join(__dirname, 'views')));

// Serve sw.js explicitly
app.get('/sw.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'sw.js'));
});

// Health Check
app.get('/', (req, res) => {
  res.send('✅ FanHub1 Server is running');
});

// API Routes
app.use('/api/signup1', require('./routes/api/signup1'));
app.use('/api/optin_push1', require('./routes/api/optin_push1'));
app.use('/api/event_sms', require('./routes/api/optin_event_sms'));
app.use('/api/optin_offer1', require('./routes/api/optin_offer1'));
app.use('/api/push_subscriptions', require('./routes/api/push_subscriptions'));

// Expose VAPID public key for push subscriptions
app.get('/vapidPublicKey', (req, res) => {
  res.send(VAPID_PUBLIC_KEY);
});

// MongoDB Connection + Server Start
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
