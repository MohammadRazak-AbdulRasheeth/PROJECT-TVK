const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic user information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  
  // Authentication
  password: { type: String }, // For email/password login
  googleId: { type: String }, // For Google OAuth
  isVerified: { type: Boolean, default: false },
  
  // Address information
  address: {
    street: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'Canada' }
  },

  // Membership relationship
  currentMembership: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Membership' 
  },

  // Quick access membership fields (duplicated for performance)
  membershipStatus: { 
    type: String, 
    enum: ['active', 'pending', 'expired', 'cancelled'],
    default: null 
  },
  membershipType: { 
    type: String, 
    enum: ['monthly', 'yearly', 'student'],
    default: null 
  },
  membershipNumber: { type: String, default: null },
  membershipExpiresAt: { type: Date, default: null },

  // Profile information
  profile: {
    avatar: { type: String },
    dateOfBirth: { type: Date },
    preferredLanguage: { type: String, default: 'en' },
    bio: { type: String },
    socialMedia: {
      instagram: { type: String },
      twitter: { type: String },
      facebook: { type: String }
    }
  },

  // User role and permissions
  role: { 
    type: String, 
    enum: ['user', 'admin', 'moderator'], 
    default: 'user' 
  },
  
  // Stripe integration
  stripeCustomerId: { type: String },
  
  // Join It integration
  membership: {
    joinItId: { type: String }, // Join It membership ID
    type: { 
      type: String, 
      enum: ['monthly', 'yearly', 'student'],
      default: null 
    },
    status: { 
      type: String, 
      enum: ['active', 'inactive', 'expired', 'cancelled'],
      default: null 
    },
    joinedDate: { type: Date },
    expirationDate: { type: Date },
    hasActiveMembership: { type: Boolean, default: false }
  },

  // Payment history from Join It
  payments: [{
    joinItPaymentId: { type: String },
    amount: { type: Number },
    currency: { type: String, default: 'CAD' },
    status: { type: String },
    paymentDate: { type: Date },
    description: { type: String }
  }],
  
  // Account status
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);