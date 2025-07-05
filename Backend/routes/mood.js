const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');
const {Morning}= require('../models/DailyQuest')
// POST /api/mood - Add a new mood check-in
router.post('/', async (req, res) => {
  try {
    console.log("Hitted")
    let { userId, mood, note, stressLevel } = req.body;
    stressLevel= JSON.parse(stressLevel);
    let arr = JSON.parse(stressLevel); 
    console.log(stressLevel)
    const moodLog = new MoodLog({ userId, mood, note, stressLevel });
    const dailyQuest= new Morning({userId, checked_in_at:new Date()});
    await moodLog.save();
    await dailyQuest.save()
    console.log(dailyQuest)
    res.status(201).json(moodLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/mood/:userId - Get all mood check-ins for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await MoodLog.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    const visits = await Morning.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    isVisitedToday = visits[0]?.toObject({ virtuals: true })?.checked_in || false;
    console.log(isVisitedToday)
    res.json({logs,isVisitedToday});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;