const express = require('express');
const multer = require('multer');
const path = require('path');
const Gallery = require('../models/Gallery');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get gallery items
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find().populate('uploadedBy', 'name').sort({ createdAt: -1 });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload image (admin)
router.post('/upload', auth, adminAuth, upload.single('image'), async (req, res) => {
  try {
    const galleryItem = new Gallery({
      title: req.body.title,
      image: `/uploads/${req.file.filename}`,
      category: req.body.category,
      uploadedBy: req.user.id
    });
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete image (admin)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;