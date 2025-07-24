const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
  domain: String,
  timeSpent: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usage', usageSchema);
