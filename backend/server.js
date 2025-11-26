const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://tvkcanada.netlify.app',
      'https://project-tvk-mohammadrazak-abdulrasheeths-projects.vercel.app/',
      process.env.FRONTEND_URL?.replace(/\/$/, ''), // Remove trailing slash
      process.env.FRONTEND_URL,
      // Mobile development addresses
      'http://192.168.1.0/24',
      'http://10.0.0.0/8'
    ].filter(Boolean);
    
    // Allow mobile development IPs (local network)
    if (!origin || allowedOrigins.includes(origin) || 
        (origin && origin.match(/^http:\/\/(192\.168\.|10\.|172\.)/))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Support legacy browsers
}));

// Stripe webhook needs raw body, so register it before express.json()
app.use('/api/memberships/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10mb' })); // Increased for mobile uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session for OAuth - production ready
// Note: MemoryStore warning is expected in this simple setup
// For high-traffic production, consider using connect-mongo or connect-redis
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL?.startsWith('https'),
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  name: 'tvk.sid' // Custom session name
}));

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection with modern options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'TVK Canada Backend Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: '/api/auth',
      memberships: '/api/memberships',
      events: '/api/events',
      gallery: '/api/gallery',
      contact: '/api/contact',
      globalNetwork: '/api/global-network'
    }
  })
})

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/memberships', require('./routes/memberships'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/global-network', require('./routes/globalNetwork'));
app.use('/api', require('./routes/joinit-webhook'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));