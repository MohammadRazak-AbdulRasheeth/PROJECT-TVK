const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  membership: {
    type: { type: String, enum: ['monthly', 'yearly', 'student', 'free'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'cancelled', 'pending'], default: 'inactive' },
    startDate: { type: Date },
    endDate: { type: Date },
    stripeCustomerId: { type: String },
    membershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' }
  },
  profile: {
    avatar: { type: String },
    bio: { type: String },
    location: { type: String }
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);