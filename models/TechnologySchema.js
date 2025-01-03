const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String, // You can store the icon as a string representing the JSX or SVG
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Technology = mongoose.model('Technology', TechnologySchema);

module.exports = Technology;
