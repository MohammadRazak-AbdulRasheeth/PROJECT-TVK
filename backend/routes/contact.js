const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Send email notification
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@tvkcanada.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    });
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get contact submissions (admin)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;