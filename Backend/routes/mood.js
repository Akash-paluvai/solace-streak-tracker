const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');

// POST /api/mood - Add a new mood check-in
router.post('/', async (req, res) => {
  try {
    const { userId, mood, note } = req.body;
    const moodLog = new MoodLog({ userId, mood, note });
    await moodLog.save();
    res.status(201).json(moodLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/mood/:userId - Get all mood check-ins for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await MoodLog.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;