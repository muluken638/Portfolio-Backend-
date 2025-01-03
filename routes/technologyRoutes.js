const express = require('express');
const { createTechnology, getAllTechnologies, getTechnologyById, updateTechnology, deleteTechnology } = require('../controllers/technologyController');
const { protect } = require('../middelware/authMiddleware');
const router = express.Router();

// Route to create a new technology - Admin only
router.post('/', protect, createTechnology);

// Route to get all technologies - Public route
router.get('/', getAllTechnologies);

// Route to get a technology by ID - Public route
router.get('/:id', getTechnologyById);

// Route to update a technology by ID - Admin only
router.put('/:id', protect, updateTechnology);

// Route to delete a technology by ID - Admin only
router.delete('/:id', protect, deleteTechnology);

module.exports = router;
