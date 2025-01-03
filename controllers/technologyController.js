const Technology = require('../models/TechnologySchema');

// Create a new technology
const createTechnology = async (req, res) => {
  const { name, icon, category } = req.body;
  try {
    const newTechnology = new Technology({ name, icon, category });
    await newTechnology.save();
    res.status(201).json(newTechnology);
  } catch (err) {
    res.status(500).json({ message: 'Error creating technology', error: err.message });
  }
};

// Get all technologies
const getAllTechnologies = async ( res) => {
  try {
    const technologies = await Technology.find();
    if (!technologies) {
      return res.status(404).json({ message: 'Technology not found' });
    }
    res.status(200).json(technologies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching technologies', error: err.message });
  }
};

// Get technology by ID
const getTechnologyById = async (req, res) => {
  const { id } = req.params;
  try {
    const technology = await Technology.findById(id);
    if (!technology) {
      return res.status(404).json({ message: 'Technology not found' });
    }
    res.status(200).json(technology);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching technology', error: err.message });
  }
};

// Update technology by ID (Admin only)
const updateTechnology = async (req, res) => {
  const { id } = req.params;
  const { name, icon, category } = req.body;
  try {
    const updatedTechnology = await Technology.findByIdAndUpdate(id, { name, icon, category }, { new: true });
    if (!updatedTechnology) {
      return res.status(404).json({ message: 'Technology not found' });
    }
    res.status(200).json(updatedTechnology);
  } catch (err) {
    res.status(500).json({ message: 'Error updating technology', error: err.message });
  }
};

// Delete technology by ID (Admin only)
const deleteTechnology = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTechnology = await Technology.findByIdAndDelete(id);
    if (!deletedTechnology) {
      return res.status(404).json({ message: 'Technology not found' });
    }
    res.status(200).json({ message: 'Technology deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting technology', error: err.message });
  }
};

module.exports = { createTechnology, getAllTechnologies, getTechnologyById, updateTechnology, deleteTechnology };
