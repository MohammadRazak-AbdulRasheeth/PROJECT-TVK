const express = require('express');
const router = express.Router();

// Static data for global network groups
const globalGroups = [
  {
    id: 1,
    flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/in.svg',
    countryCode: 'IN',
    name: 'Vijay Makkal Mandram',
    region: 'India – Tamil Nadu',
    description: 'The original and largest TVK-aligned fan network...',
    known_for: 'Community events, Volunteer programs, Large-scale celebrations',
    hashtags: '#VijayMakkalMandram #TMM #TamilPride',
  },
  // Add other groups...
];

// Get global groups
router.get('/groups', (req, res) => {
  res.json(globalGroups);
});

module.exports = router;