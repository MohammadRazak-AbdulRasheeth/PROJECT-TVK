const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Membership = require('../models/Membership');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Test endpoint (no auth required)
router.post('/test-subscription', async (req, res) => {
  try {
    console.log('Test subscription request received');
    console.log('Request body:', req.body);
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing',
      MONGODB_URI: process.env.MONGODB_URI ? 'Present' : 'Missing'
    });

    res.json({ 
      success: true, 
      message: 'Test endpoint working',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Test endpoint error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/memberships';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and PDF files are allowed'));
    }
  }
});

// Get membership plans
router.get('/plans', (req, res) => {
  res.json([
    { 
      id: 'monthly', 
      name: 'Monthly Membership', 
      price: 1000, 
      interval: 'month',
      features: ['Official TVK Canada membership card', 'Access to exclusive events', 'Member-only discounts', 'Community forum access', 'Event early registration']
    },
    { 
      id: 'yearly', 
      name: 'Annual Membership', 
      price: 10000, 
      interval: 'year',
      features: ['Official TVK Canada membership card', 'Access to all exclusive events', 'Premium partner discounts', 'VIP community forum access', 'Priority event registration', 'Annual celebration invitation']
    },
    { 
      id: 'student', 
      name: 'Student Membership', 
      price: 500, 
      interval: 'month',
      features: ['Student ID verification required', 'Access to student events', 'Student-only discounts', 'Community forum access', 'Movie night access', 'Study group invitations']
    }
  ]);
});

// Simple subscription endpoint with MongoDB storage
router.post('/simple-subscription', upload.fields([
  { name: 'studentId', maxCount: 1 },
  { name: 'timetable', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Simple subscription request received');
    console.log('Request headers:', {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
      'content-length': req.get('Content-Length'),
      'origin': req.get('Origin'),
      'referer': req.get('Referer')
    });
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    // Mobile device detection
    const userAgent = req.get('User-Agent') || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    console.log('Mobile detection:', { isMobile, userAgent });
    
    const { 
      plan, 
      firstName, 
      lastName, 
      email, 
      phone,
      address,
      city,
      province,
      postalCode,
      university,
      program
    } = req.body;

    console.log('Extracted fields:', { plan, firstName, lastName, email, phone });

    // Validate required fields
    if (!plan || !firstName || !lastName || !email || !phone) {
      console.log('Validation failed - missing fields:', {
        plan: !!plan,
        firstName: !!firstName, 
        lastName: !!lastName,
        email: !!email,
        phone: !!phone
      });
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['plan', 'firstName', 'lastName', 'email', 'phone'],
        received: { plan, firstName, lastName, email, phone }
      });
    }

    // Student plan validation
    if (plan === 'student') {
      if (!university || !program || !req.files?.studentId || !req.files?.timetable) {
        console.log('Student validation failed:', {
          university: !!university,
          program: !!program,
          studentId: !!req.files?.studentId,
          timetable: !!req.files?.timetable
        });
        return res.status(400).json({ 
          message: 'Student verification documents and details are required',
          required: ['university', 'program', 'studentId file', 'timetable file'],
          received: { 
            university, 
            program, 
            files: Object.keys(req.files || {})
          }
        });
      }
    }

    // Get plan pricing
    const planPrices = { monthly: 1000, yearly: 10000, student: 500 };
    const price = planPrices[plan];
    
    if (!price) {
      return res.status(400).json({ message: 'Invalid plan selected', validPlans: Object.keys(planPrices) });
    }

    // Try to get authenticated user (optional)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.log('Token verification failed, proceeding without user ID');
      }
    }

    // Create membership record in MongoDB FIRST
    const membershipData = {
      user: userId, // Will be null if no authentication
      type: plan,
      status: 'pending',
      firstName,
      lastName,
      email,
      phone,
      address: address || '',
      city: city || '',
      province: province || '',
      postalCode: postalCode || ''
    };

    // Add student verification data if applicable
    if (plan === 'student') {
      membershipData.studentVerification = {
        university,
        program,
        studentIdDocument: req.files.studentId[0].path,
        timetableDocument: req.files.timetable[0].path,
        verificationStatus: 'pending'
      };
    }

    console.log('Creating membership record in MongoDB:', membershipData);
    const membership = new Membership(membershipData);
    await membership.save();
    console.log('Membership saved to MongoDB with ID:', membership._id);

    // Now create Stripe checkout session with membership ID in metadata
    const priceData = {
      currency: 'cad',
      product_data: {
        name: `TVK Canada ${plan.charAt(0).toUpperCase() + plan.slice(1)} Membership`,
        description: plan === 'student' ? 'Student membership with verification required' : `${plan} membership with full benefits`
      },
      unit_amount: price
    };

    // Only add recurring for subscription plans (monthly/student), omit for one-time payments (yearly)
    if (plan !== 'yearly') {
      priceData.recurring = { interval: 'month' };
    }

    const lineItems = [{
      price_data: priceData,
      quantity: 1,
    }];

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: plan === 'yearly' ? 'payment' : 'subscription',
      success_url: `${(process.env.FRONTEND_URL || 'https://tvkcanada.netlify.app').replace(/\/$/, '')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${(process.env.FRONTEND_URL || 'https://tvkcanada.netlify.app').replace(/\/$/, '')}/membership?canceled=true`,
      customer_email: email,
      metadata: {
        membershipId: membership._id.toString(), // Critical: link to our DB record
        planType: plan,
        userId: userId || 'guest',
        customerName: `${firstName} ${lastName}`,
        phone: phone
      }
    };

    console.log('Creating Stripe session with metadata:', sessionConfig.metadata);
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Update membership with Stripe session ID
    membership.stripeSessionId = session.id;
    await membership.save();

    console.log('Stripe session created and linked:', session.id);

    res.json({ 
      checkoutUrl: session.url,
      sessionId: session.id,
      membershipId: membership._id
    });

  } catch (err) {
    console.error('Simple subscription error:', err);
    console.error('Error stack:', err.stack);
    
    res.status(500).json({ 
      message: 'Failed to create subscription',
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Create subscription with file uploads (Authentication Recommended but Optional for Testing)
router.post('/create-subscription', (req, res, next) => {
  // Try to authenticate but don't fail if no token provided
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log('Token verification failed:', err.message);
      // Continue without user for backward compatibility
    }
  }
  next();
}, upload.fields([
  { name: 'studentId', maxCount: 1 },
  { name: 'timetable', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      plan,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      postalCode,
      university,
      program
    } = req.body;

    // Validate required fields
    if (!plan || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate student plan requirements
    if (plan === 'student') {
      if (!university || !program || !req.files?.studentId || !req.files?.timetable) {
        return res.status(400).json({ message: 'Student verification documents and details are required' });
      }
    }

    // Get plan pricing
    const planPrices = { monthly: 1000, yearly: 10000, student: 500 };
    const price = planPrices[plan];
    
    if (!price) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    // Get the authenticated user (optional)
    const userId = req.user?.id;
    let user = null;
    
    if (userId) {
      user = await User.findById(userId);
      
      // Check if user already has an active membership
      const existingMembership = await Membership.findOne({
        user: userId,
        status: { $in: ['active', 'pending'] }
      });

      if (existingMembership) {
        return res.status(400).json({ message: 'User already has an active or pending membership' });
      }
    }

    // Create membership record
    const membershipData = {
      user: userId || null, // Will be null if no authentication
      type: plan,
      status: 'pending',
      firstName: firstName || user?.firstName || firstName,
      lastName: lastName || user?.lastName || lastName, 
      email: email || user?.email || email,
      phone: phone || user?.phone || phone,
      address: address || user?.address?.street || address,
      city: city || user?.address?.city || city,
      province: province || user?.address?.province || province,
      postalCode: postalCode || user?.address?.postalCode || postalCode
    };

    // Add student verification data if applicable
    if (plan === 'student') {
      membershipData.studentVerification = {
        university,
        program,
        studentIdDocument: req.files.studentId[0].path,
        timetableDocument: req.files.timetable[0].path,
        verificationStatus: 'pending'
      };
    }

    const membership = new Membership(membershipData);
    await membership.save();

    // Create Stripe checkout session
    const priceDataFull = {
      currency: 'cad', // Canadian dollars
      product_data: {
        name: `TVK Canada ${plan.charAt(0).toUpperCase() + plan.slice(1)} Membership`,
        description: plan === 'student' ? 'Student membership with verification required' : `${plan} membership with full benefits`
      },
      unit_amount: price
    };

    // Only add recurring for subscription plans (monthly/student), omit for one-time payments (yearly)
    if (plan !== 'yearly') {
      priceDataFull.recurring = { interval: 'month' };
    }

    const lineItems = [{
      price_data: priceDataFull,
      quantity: 1,
    }];

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: plan === 'yearly' ? 'payment' : 'subscription',
      success_url: `${(process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${(process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '')}/membership?canceled=true`,
      customer_email: email,
      metadata: {
        membershipId: membership._id.toString(),
        planType: plan,
        userId: userId || 'guest'
      }
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Update membership with Stripe session ID
    membership.stripeSessionId = session.id;
    await membership.save();

    res.json({ 
      checkoutUrl: session.url,
      sessionId: session.id,
      membershipId: membership._id
    });

  } catch (err) {
    console.error('Subscription creation error:', err);
    console.error('Error stack:', err.stack);
    console.error('Request body:', req.body);
    console.error('User info:', req.user);
    
    res.status(500).json({ 
      message: 'Failed to create subscription',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Confirm payment after Stripe success
router.post('/confirm-payment', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    console.log('Confirming payment for session:', sessionId);

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Stripe session retrieved:', {
      id: session.id,
      payment_status: session.payment_status,
      customer: session.customer,
      subscription: session.subscription,
      metadata: session.metadata
    });
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ 
        message: 'Payment not completed',
        paymentStatus: session.payment_status
      });
    }

    // Find membership by session ID
    const membership = await Membership.findOne({ stripeSessionId: sessionId });
    console.log('Membership found:', membership ? membership._id : 'Not found');
    
    if (!membership) {
      return res.status(404).json({ 
        message: 'Membership not found for session',
        sessionId,
        suggestion: 'Please contact support with your payment confirmation'
      });
    }

    // Calculate membership dates
    const activatedAt = new Date();
    let expiresAt = new Date();
    let nextBillingDate = null;

    if (membership.type === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else if (membership.type === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      nextBillingDate = new Date(expiresAt);
    } else if (membership.type === 'student') {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      nextBillingDate = new Date(expiresAt);
    }

    // Update membership status and payment info
    if (membership.type === 'student') {
      // Student memberships need verification, but payment is confirmed
      membership.status = 'pending'; // Waiting for document verification
    } else {
      // Regular memberships are activated immediately
      membership.status = 'active';
      membership.activatedAt = activatedAt;
      membership.expiresAt = expiresAt;
      membership.nextBillingDate = nextBillingDate;
    }

    // Store Stripe payment information
    membership.stripeCustomerId = session.customer;
    if (session.subscription) {
      membership.stripeSubscriptionId = session.subscription;
    }

    // Save membership with all payment data
    await membership.save();
    console.log('Membership updated with payment confirmation');

    // Update user's membership status if user is authenticated
    if (membership.user) {
      const userUpdate = {
        currentMembership: membership._id,
        stripeCustomerId: membership.stripeCustomerId,
        // Add membership status directly to user for quick access
        membershipStatus: membership.status,
        membershipType: membership.type,
        membershipNumber: membership.membershipNumber,
        membershipExpiresAt: membership.expiresAt,
        updatedAt: new Date()
      };
      await User.findByIdAndUpdate(membership.user, userUpdate);
      console.log('User record updated with membership details:', userUpdate);
    }

    // Prepare response with complete membership data
    const responseData = {
      success: true,
      membership: {
        id: membership._id,
        type: membership.type,
        status: membership.status,
        membershipNumber: membership.membershipNumber,
        firstName: membership.firstName,
        lastName: membership.lastName,
        email: membership.email,
        phone: membership.phone,
        address: {
          street: membership.address,
          city: membership.city,
          province: membership.province,
          postalCode: membership.postalCode
        },
        activatedAt: membership.activatedAt,
        expiresAt: membership.expiresAt,
        nextBillingDate: membership.nextBillingDate,
        stripeCustomerId: membership.stripeCustomerId,
        stripeSubscriptionId: membership.stripeSubscriptionId
      },
      message: membership.type === 'student' 
        ? 'Payment received successfully! Your student documents are being reviewed and you will be notified within 2-3 business days.'
        : `Congratulations! Your ${membership.type} membership has been activated successfully.`,
      nextSteps: membership.type === 'student' 
        ? [
            'Check your email for payment confirmation',
            'Our team will review your student documents within 2-3 business days',
            'You will receive an email when your membership is approved and activated',
            'Contact support if you have questions about the verification process'
          ]
        : [
            'Check your email for membership confirmation and digital card',
            'Explore exclusive member benefits on our website',
            'Join our member community forum',
            'Stay tuned for upcoming exclusive events and offers'
          ]
    };

    // Return legacy format for backward compatibility
    res.json({
      ...responseData.membership,
      message: responseData.message,
      nextSteps: responseData.nextSteps
    });

  } catch (err) {
    console.error('Payment confirmation error:', err);
    console.error('Error details:', err.stack);
    res.status(500).json({ 
      message: 'Failed to confirm payment',
      error: err.message,
      suggestion: 'Please contact support with your session ID if payment was completed'
    });
  }
});

// Get membership status (requires auth)
router.get('/status', auth, async (req, res) => {
  try {
    // First try to get from user's quick access fields
    const user = await User.findById(req.user.id);
    
    if (!user.currentMembership) {
      return res.json({ message: 'No active membership found' });
    }

    // Get full membership details
    const membership = await Membership.findById(user.currentMembership);
    
    if (!membership) {
      // Clean up stale reference
      await User.findByIdAndUpdate(req.user.id, {
        currentMembership: null,
        membershipStatus: null,
        membershipType: null,
        membershipNumber: null,
        membershipExpiresAt: null
      });
      return res.json({ message: 'No active membership found' });
    }

    // Return comprehensive membership data
    res.json({
      id: membership._id,
      type: membership.type,
      status: membership.status,
      membershipNumber: membership.membershipNumber,
      firstName: membership.firstName,
      lastName: membership.lastName,
      email: membership.email,
      phone: membership.phone,
      address: {
        street: membership.address,
        city: membership.city,
        province: membership.province,
        postalCode: membership.postalCode
      },
      activatedAt: membership.activatedAt,
      expiresAt: membership.expiresAt,
      nextBillingDate: membership.nextBillingDate,
      digitalCardUrl: membership.digitalCardUrl,
      verificationStatus: membership.studentVerification?.verificationStatus,
      rejectionReason: membership.studentVerification?.rejectionReason,
      // Include user's quick access data for verification
      userMembershipStatus: user.membershipStatus,
      userMembershipType: user.membershipType
    });

  } catch (err) {
    console.error('Status fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch membership status' });
  }
});

// Admin: Get pending student verifications
router.get('/admin/pending-verifications', auth, adminAuth, async (req, res) => {
  try {
    const pendingMemberships = await Membership.find({
      type: 'student',
      'studentVerification.verificationStatus': 'pending'
    }).populate('user', 'name email');

    res.json(pendingMemberships);
  } catch (err) {
    console.error('Pending verifications fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch pending verifications' });
  }
});

// Admin: Approve/reject student verification
router.post('/admin/verify-student/:membershipId', auth, adminAuth, async (req, res) => {
  try {
    const { membershipId } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'

    const membership = await Membership.findById(membershipId);
    
    if (!membership || membership.type !== 'student') {
      return res.status(404).json({ message: 'Student membership not found' });
    }

    if (action === 'approve') {
      membership.status = 'active';
      membership.activatedAt = new Date();
      membership.studentVerification.verificationStatus = 'approved';
      membership.studentVerification.verifiedBy = req.user.id;
      membership.studentVerification.verifiedAt = new Date();
      
      // Set expiry date (monthly for students)
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      membership.expiresAt = expiryDate;

      // Update user record
      if (membership.user) {
        await User.findByIdAndUpdate(membership.user, {
          'membership.status': 'active',
          'membership.startDate': membership.activatedAt,
          'membership.endDate': membership.expiresAt
        });
      }

    } else if (action === 'reject') {
      membership.status = 'cancelled';
      membership.studentVerification.verificationStatus = 'rejected';
      membership.studentVerification.rejectionReason = rejectionReason;
      membership.studentVerification.verifiedBy = req.user.id;
      membership.studentVerification.verifiedAt = new Date();
    }

    await membership.save();

    res.json({
      message: `Student membership ${action}ed successfully`,
      membership: {
        id: membership._id,
        status: membership.status,
        verificationStatus: membership.studentVerification.verificationStatus
      }
    });

  } catch (err) {
    console.error('Student verification error:', err);
    res.status(500).json({ message: 'Failed to process verification' });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        
        // Handle successful payment
        const membership = await Membership.findOne({ stripeSessionId: session.id });
        if (membership && membership.status === 'pending') {
          // This will be handled by the confirm-payment endpoint
          console.log('Membership payment completed for:', membership._id);
        }
        break;

      case 'invoice.payment_succeeded':
        // Handle successful subscription renewal
        const invoice = event.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        break;

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const subscription = event.data.object;
        await Membership.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          { status: 'cancelled' }
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;