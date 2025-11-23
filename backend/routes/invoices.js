const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Membership = require('../models/Membership');

const router = express.Router();

// Generate invoice for membership
router.get('/membership/:membershipId', auth, async (req, res) => {
  try {
    const { membershipId } = req.params;
    const userId = req.user.id;

    // Find membership and verify ownership
    const membership = await Membership.findById(membershipId).populate('user');
    
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    // Check if user owns this membership or is admin
    if (membership.user._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Calculate amounts based on membership type
    const priceMap = {
      monthly: 1000, // $10.00 CAD
      yearly: 10000,  // $100.00 CAD
      student: 500    // $5.00 CAD
    };

    const subtotal = priceMap[membership.type] || 0;
    const taxRate = 0.13; // HST 13% for Ontario
    const taxAmount = Math.round(subtotal * taxRate);
    const total = subtotal + taxAmount;

    // Generate invoice number
    const invoiceNumber = `TVK-INV-${membership.membershipNumber}-${Date.now().toString().slice(-6)}`;

    // Create invoice data
    const invoiceData = {
      id: membership._id,
      invoiceNumber,
      membershipNumber: membership.membershipNumber || 'PENDING',
      customerName: `${membership.firstName} ${membership.lastName}`,
      email: membership.email,
      phone: membership.phone,
      address: {
        street: membership.address || '',
        city: membership.city || '',
        province: membership.province || '',
        postalCode: membership.postalCode || '',
        country: 'Canada'
      },
      membershipType: `${membership.type.charAt(0).toUpperCase() + membership.type.slice(1)} Membership`,
      amount: subtotal,
      currency: 'CAD',
      status: membership.status === 'active' ? 'paid' : 'pending',
      issuedDate: membership.createdAt,
      dueDate: membership.createdAt, // Same as issued for immediate payment
      paidDate: membership.activatedAt,
      paymentMethod: membership.stripeCustomerId ? 'Credit Card' : 'Pending Payment',
      stripePaymentId: membership.stripeSessionId,
      taxAmount,
      subtotal,
      total,
      // Additional membership details
      planDuration: membership.type === 'yearly' ? '12 months' : '1 month',
      activatedAt: membership.activatedAt,
      expiresAt: membership.expiresAt,
      benefits: getMembershipBenefits(membership.type)
    };

    res.json(invoiceData);

  } catch (error) {
    console.error('Invoice generation error:', error);
    res.status(500).json({ message: 'Failed to generate invoice' });
  }
});

// Get all invoices for user
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all memberships for user
    const memberships = await Membership.find({ user: userId }).sort({ createdAt: -1 });
    
    const invoices = memberships.map(membership => {
      const priceMap = {
        monthly: 1000,
        yearly: 10000,
        student: 500
      };

      const subtotal = priceMap[membership.type] || 0;
      const taxAmount = Math.round(subtotal * 0.13);
      const total = subtotal + taxAmount;

      return {
        id: membership._id,
        invoiceNumber: `TVK-INV-${membership.membershipNumber}-${membership.createdAt.getTime().toString().slice(-6)}`,
        membershipNumber: membership.membershipNumber,
        membershipType: membership.type,
        amount: total,
        status: membership.status === 'active' ? 'paid' : 'pending',
        issuedDate: membership.createdAt,
        paidDate: membership.activatedAt
      };
    });

    res.json(invoices);

  } catch (error) {
    console.error('Invoice list error:', error);
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
});

// Helper function to get membership benefits
function getMembershipBenefits(type) {
  const baseBenefits = [
    'Priority event access',
    'Member-only discounts',
    'Community forum access',
    'Monthly newsletter',
    'Digital membership card'
  ];

  switch (type) {
    case 'student':
      return [
        ...baseBenefits,
        'Student study groups',
        'Free movie screenings',
        'Academic networking events'
      ];
    case 'yearly':
      return [
        ...baseBenefits,
        'VIP event seating',
        'Annual member gifts',
        'Priority customer support',
        'Exclusive meet & greet events'
      ];
    case 'monthly':
    default:
      return baseBenefits;
  }
}

module.exports = router;