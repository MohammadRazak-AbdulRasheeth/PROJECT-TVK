const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get membership plans
router.get('/plans', (req, res) => {
  res.json([
    { id: 'monthly', name: 'Monthly Membership', price: 1000, interval: 'month' }, // $10
    { id: 'yearly', name: 'Yearly Membership', price: 10000, interval: 'year' }   // $100
  ]);
});

// Subscribe to membership
router.post('/subscribe', auth, async (req, res) => {
  try {
    const { planId } = req.body;
    const user = await User.findById(req.user.id);
    
    const plans = { monthly: 1000, yearly: 10000 };
    const price = plans[planId];
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${planId} Membership` },
          unit_amount: price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/membership?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/membership?canceled=true`,
      customer_email: user.email,
      metadata: { userId: user._id, planId }
    });
    
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Webhook for Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, planId } = session.metadata;
    
    const user = await User.findById(userId);
    user.membership = {
      type: planId,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + (planId === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
      stripeCustomerId: session.customer
    };
    await user.save();
  }
  
  res.json({ received: true });
});

module.exports = router;