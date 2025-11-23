const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Made optional for guest purchases
  type: { type: String, enum: ['monthly', 'yearly', 'student'], required: true },
  status: { type: String, enum: ['pending', 'active', 'expired', 'cancelled'], default: 'pending' },
  membershipNumber: { type: String, unique: true },
  
  // Personal Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  
  // Student Verification (for student plans)
  studentVerification: {
    university: { type: String },
    program: { type: String },
    studentIdDocument: { type: String }, // File path
    timetableDocument: { type: String }, // File path
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    rejectionReason: { type: String }
  },
  
  // Stripe Integration
  stripeSessionId: { type: String },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  
  // Membership Dates
  activatedAt: { type: Date },
  expiresAt: { type: Date },
  nextBillingDate: { type: Date },
  
  // Digital Card
  digitalCardUrl: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Generate membership number before saving
membershipSchema.pre('save', async function(next) {
  if (!this.membershipNumber && this.status === 'active') {
    const count = await mongoose.model('Membership').countDocuments({ status: 'active' });
    this.membershipNumber = `TVK${String(count + 1).padStart(6, '0')}`;
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Membership', membershipSchema);