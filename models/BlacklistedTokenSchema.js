// models/BlacklistedToken.js
const mongoose = require("mongoose");

const BlacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);
