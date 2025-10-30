const mongoose = require('mongoose');

const PushSubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    auth: String,
    p256dh: String,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PushSubscription', PushSubscriptionSchema);
