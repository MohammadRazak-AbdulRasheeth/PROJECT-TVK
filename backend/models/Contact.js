const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['general', 'partnership', 'support'], default: 'general' },
  status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);