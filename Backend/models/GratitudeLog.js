const mongoose = require('mongoose');

const GratitudeLogSchema = new mongoose.Schema({
  entries: {
    type: [String],
    required: true,
    validate: (arr) => arr.length === 3,
  },
  sentiments: {
    type: [Number],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('GratitudeLog', GratitudeLogSchema);
