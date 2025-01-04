const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: String,
  coverImage: String,
  description: String,
  galleryImages: [{ type: String }],
  githubLink: String,
  liveDemoLink: String,
  status: {
    type: String,
    enum: ['finished', 'onprogress', 'future plan'],
    default: 'onprogress', 
  },
});

module.exports = mongoose.model('Portfolios', PortfolioSchema);
