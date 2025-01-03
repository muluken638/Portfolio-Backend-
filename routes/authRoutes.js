const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middelware/authMiddleware');
const BlacklistedToken = require("../models/BlacklistedTokenSchema");

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Logout route
router.post("/logout", authMiddleware, async (req, res) => {
  const token = req.header("Authorization");

  try {
    // Add token to the blacklist
    await BlacklistedToken.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error });
  }
});
  
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // User information is already attached to the request object by the middleware
    const user = req.user;
    
    // Send user data as response
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user information', error });
  }
});

// Protected Route Example
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route' });
});

module.exports = router;
