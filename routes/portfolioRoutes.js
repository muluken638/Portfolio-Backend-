// routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Portfolio = require('../models/Portfolio');
const portfolioController = require('../controllers/portfolioController'); // Import your controller

// Set up multer storage for cover and gallery images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for portfolio creation with file uploads
router.post('/portfolios', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 5 }
]), portfolioController.createPortfolio);

// Other routes (GET, UPDATE, DELETE, etc.)
router.get('/portfolios', portfolioController.getAllPortfolios);
router.get('/portfolios/:id', portfolioController.getPortfolioById);
router.put('/portfolios/:id', portfolioController.updatePortfolio);
router.delete('/portfolios/:id', portfolioController.deletePortfolio);
router.get('/portfolio', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    console.log(portfolios); // Log the data to check if it's fetched correctly
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: "Error fetching portfolios" });
  }
});

module.exports = router;
