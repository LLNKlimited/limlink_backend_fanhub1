// Optional: load .env for local development only
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
    console.log('Loaded .env for local development');
  } catch (err) {
    console.log('No .env file found, relying on environment variables');
  }
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

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

