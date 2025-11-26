const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * Join It Webhook Endpoint
 * Receives notifications when memberships are created, updated, or payments are made
 */
router.post('/joinit-webhook', express.json(), async (req, res) => {
  try {
    const { webhook_object_type, webhook_event_type } = req.body;
    
    console.log('Join It Webhook received:', {
      type: webhook_object_type,
      event: webhook_event_type,
      timestamp: new Date().toISOString(),
      data: req.body
    });

    // Handle different webhook types
    switch (webhook_event_type) {
      case 'memberships.created':
        await handleMembershipCreated(req.body);
        break;
      
      case 'memberships.updated':
        await handleMembershipUpdated(req.body);
        break;
      
      case 'memberships.renewed':
        await handleMembershipRenewed(req.body);
        break;
      
      case 'payments.created':
        await handlePaymentCreated(req.body);
        break;
      
      default:
        console.log(`Unhandled webhook event: ${webhook_event_type}`);
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Join It webhook error:', error);
    // Still return 200 to prevent retries
    res.status(200).json({ error: 'Webhook processed with errors' });
  }
});

/**
 * Handle new membership creation
 */
async function handleMembershipCreated(webhookData) {
  console.log('🎉 NEW MEMBERSHIP CREATED:', {
    memberEmail: webhookData.email,
    membershipType: webhookData.membership_type?.name,
    joinedDate: webhookData.joined_date,
    expirationDate: webhookData.expiration_date,
    status: webhookData.status,
    membershipId: webhookData.id
  });

  try {
    // Find or create user in your database
    let user = await User.findOne({ email: webhookData.email });
    
    if (user) {
      // Update existing user with membership info
      user.membership = {
        joinItId: webhookData.id,
        type: getMembershipPlanType(webhookData.membership_type?.name),
        status: webhookData.status,
        joinedDate: new Date(webhookData.joined_date),
        expirationDate: new Date(webhookData.expiration_date),
        hasActiveMembership: webhookData.status === 'active'
      };
      await user.save();
      console.log('✅ Updated existing user with membership:', user.email);
    } else {
      // Create new user with membership
      user = new User({
        firstName: webhookData.first_name,
        lastName: webhookData.last_name,
        email: webhookData.email,
        membership: {
          joinItId: webhookData.id,
          type: getMembershipPlanType(webhookData.membership_type?.name),
          status: webhookData.status,
          joinedDate: new Date(webhookData.joined_date),
          expirationDate: new Date(webhookData.expiration_date),
          hasActiveMembership: webhookData.status === 'active'
        }
      });
      await user.save();
      console.log('✅ Created new user with membership:', user.email);
    }

    // Send welcome email or trigger other automations here
    // await sendWelcomeEmail(user);
    
  } catch (error) {
    console.error('Error handling membership creation:', error);
  }
}

/**
 * Handle membership updates (plan changes, renewals, etc.)
 */
async function handleMembershipUpdated(webhookData) {
  console.log('🔄 MEMBERSHIP UPDATED:', {
    memberEmail: webhookData.email,
    membershipType: webhookData.membership_type?.name,
    status: webhookData.status,
    membershipId: webhookData.id
  });

  try {
    const user = await User.findOne({ 
      $or: [
        { email: webhookData.email },
        { 'membership.joinItId': webhookData.id }
      ]
    });

    if (user) {
      user.membership = {
        ...user.membership,
        joinItId: webhookData.id,
        type: getMembershipPlanType(webhookData.membership_type?.name),
        status: webhookData.status,
        expirationDate: new Date(webhookData.expiration_date),
        hasActiveMembership: webhookData.status === 'active'
      };
      await user.save();
      console.log('✅ Updated membership for user:', user.email);
    } else {
      console.log('⚠️ User not found for membership update:', webhookData.email);
    }
  } catch (error) {
    console.error('Error handling membership update:', error);
  }
}

/**
 * Handle membership renewal
 */
async function handleMembershipRenewed(webhookData) {
  console.log('🔄 MEMBERSHIP RENEWED:', {
    memberEmail: webhookData.email,
    membershipType: webhookData.membership_type?.name,
    newExpirationDate: webhookData.expiration_date,
    membershipId: webhookData.id
  });

  // Same logic as update but could trigger renewal-specific actions
  await handleMembershipUpdated(webhookData);
  
  // Add renewal-specific logic here
  // await sendRenewalThankYouEmail(user);
}

/**
 * Handle payment notifications
 */
async function handlePaymentCreated(webhookData) {
  console.log('💰 PAYMENT RECEIVED:', {
    amount: webhookData.amount,
    currency: webhookData.currency,
    paymentDate: webhookData.created_at,
    membershipId: webhookData.membership_id,
    paymentId: webhookData.id,
    status: webhookData.status
  });

  try {
    // Find user by membership ID and update payment info
    const user = await User.findOne({ 'membership.joinItId': webhookData.membership_id });
    
    if (user) {
      // Add payment record to user
      if (!user.payments) {
        user.payments = [];
      }
      
      user.payments.push({
        joinItPaymentId: webhookData.id,
        amount: webhookData.amount,
        currency: webhookData.currency,
        status: webhookData.status,
        paymentDate: new Date(webhookData.created_at),
        description: `${user.membership.type} membership payment`
      });

      await user.save();
      console.log('✅ Payment recorded for user:', user.email);

      // Generate invoice or send receipt
      // await generateInvoice(user, webhookData);
      
    } else {
      console.log('⚠️ User not found for payment:', webhookData.membership_id);
    }
  } catch (error) {
    console.error('Error handling payment:', error);
  }
}

/**
 * Map Join It membership type names to your internal plan types
 */
function getMembershipPlanType(joinItTypeName) {
  if (!joinItTypeName) return 'monthly';
  
  const typeName = joinItTypeName.toLowerCase();
  
  if (typeName.includes('annual') || typeName.includes('yearly') || typeName.includes('year')) {
    return 'yearly';
  } else if (typeName.includes('student')) {
    return 'student';
  } else {
    return 'monthly';
  }
}

/**
 * Get webhook configuration info (for setup reference)
 */
router.get('/webhook-info', (req, res) => {
  res.json({
    webhookUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/joinit-webhook`,
    supportedEvents: [
      'memberships.created',
      'memberships.updated', 
      'memberships.renewed',
      'payments.created'
    ],
    setupInstructions: {
      step1: 'Go to https://app.joinit.com/automations/webhooks',
      step2: 'Create new webhook automation',
      step3: 'Set URL to the webhookUrl above',
      step4: 'Enable the events you want to track',
      step5: 'Test the webhook to verify it works'
    }
  });
});

module.exports = router;