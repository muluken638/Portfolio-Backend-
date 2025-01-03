const express = require('express');
const { authenticate } = require('../middelware/authMiddleware');

const router = express.Router();
router.get('/portfolios', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    console.log(portfolios); // Log the data to check if it's fetched correctly
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: "Error fetching portfolios" });
  }
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;