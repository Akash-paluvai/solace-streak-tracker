const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    mood: { type: String, required: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodLog', MoodLogSchema);