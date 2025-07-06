const mongoose = require('mongoose');

// Reusable Schema Definition
const dailyQuestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  checked_in_at: { type: Date, default: null }
});

// Virtual field: `checked_in`
dailyQuestSchema.virtual('checked_in').get(function () {
  if (!this.checked_in_at) return false;

  const checkInDate = this.checked_in_at.toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  return checkInDate === today;
});

dailyQuestSchema.set('toJSON', { virtuals: true });
dailyQuestSchema.set('toObject', { virtuals: true });

// Create 3 different models using the same schema
const Water = mongoose.model('Water', dailyQuestSchema);
const Meditation = mongoose.model('Meditation', dailyQuestSchema);
const Morning = mongoose.model('morning', dailyQuestSchema);

module.exports = { Water, Meditation, Morning };
