require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML and assets from /views
app.use(express.static(path.join(__dirname, 'views')));

// Serve sw.js explicitly from /views
app.get('/sw.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'sw.js'));
});

// Health Check
app.get('/', (req, res) => {
  res.send('✅ FanHub1 Server is running');
});

// API Routes
const signup1Route = require('./routes/api/signup1');
const optinPush1Route = require('./routes/api/optin_push1');
const eventSMSRoute = require('./routes/api/optin_event_sms');
const pushSubscriptionsRoute = require('./routes/api/push_subscriptions');
const optinOffer1Route = require('./routes/api/optin_offer1');

app.use('/api/signup1', signup1Route);
app.use('/api/optin_push1', optinPush1Route);
app.use('/api/event_sms', eventSMSRoute);
app.use('/api/optin_offer1', optinOffer1Route);
app.use('/api/push_subscriptions', pushSubscriptionsRoute);

// Expose VAPID public key for push subscriptions
app.get('/vapidPublicKey', (req, res) => {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

// MongoDB Connection + Server Start
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set in .env');
  process.exit(1);
}

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
