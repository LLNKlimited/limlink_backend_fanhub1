const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const webPush = require('web-push');
const dotenv = require('dotenv');

// Load .env file if present
dotenv.config();

// --- VAPID keys & contact ---
const VAPID_PUBLIC_KEY  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_CONTACT_EMAIL = process.env.VAPID_CONTACT_EMAIL;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_CONTACT_EMAIL) {
  throw new Error('VAPID keys or contact email not found! Check your .env or Render variables.');
}

// Initialize web-push
webPush.setVapidDetails(VAPID_CONTACT_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
console.log('✅ web-push initialized');

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/sw.js', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'sw.js')));
app.get('/', (req, res) => res.send('✅ FanHub1 Server is running'));

// API routes
app.use('/api/signup1', require('./routes/api/signup1'));
app.use('/api/optin_push1', require('./routes/api/optin_push1'));
app.use('/api/event_sms', require('./routes/api/optin_event_sms'));
app.use('/api/optin_offer1', require('./routes/api/optin_offer1'));
app.use('/api/push_subscriptions', require('./routes/api/push_subscriptions'));

// Expose public key
app.get('/vapidPublicKey', (req, res) => res.send(VAPID_PUBLIC_KEY));

// MongoDB connection + server start
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🌐 Server running at port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
