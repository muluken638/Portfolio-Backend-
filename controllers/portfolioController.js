// controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');

// Portfolio creation logic
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, githubLink, liveDemoLink, status } = req.body;
    const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null;
    const galleryImages = req.files.galleryImages ? req.files.galleryImages.map(file => file.path) : [];

    const newPortfolio = new Portfolio({
      title,
      coverImage,
      description,
      githubLink,
      liveDemoLink,
      status,
      galleryImages
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPortfolios = async (req, res) => {
  try {
    // Get all portfolios excluding status and galleryImages fields
    const portfolios = await Portfolio.find().select("-status -galleryImages");

    // Fetch all portfolios again to calculate project counts based on status
    const allPortfolios = await Portfolio.find();
    const totalProjects = allPortfolios.length;
    const completedProjects = allPortfolios.filter(portfolio => portfolio.status === 'finished').length;
    const inProgressProjects = allPortfolios.filter(portfolio => portfolio.status === 'onprogress').length;
    const futurePlanProjects = allPortfolios.filter(portfolio => portfolio.status === 'future plan').length;

    // Return the counts along with the filtered portfolios
    res.json({
      totalProjects,
      completedProjects,
      inProgressProjects,
      futurePlanProjects,
      portfolios, // Excludes status and galleryImages
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific portfolio by ID
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a portfolio by ID
exports.updatePortfolio = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Handle file upload (if any)
    if (req.file) {
      updatedData.coverImage = req.file.path;
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true } // runValidators ensures schema validation
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
};


// Delete a portfolio by ID
exports.deletePortfolio = async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
