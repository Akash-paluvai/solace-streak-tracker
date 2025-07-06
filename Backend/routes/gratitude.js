const express = require('express');
const { analyzeSentiment } = require('../utils/sentiment');
const { generatePoeticSummary } = require('../utils/gpt');
const GratitudeLog = require('../models/GratitudeLog');

const router = express.Router();

router.post('/analyze-gratitude', async (req, res) => {
  const { entries } = req.body;

  if (!entries || !Array.isArray(entries) || entries.length !== 3) {
    return res.status(400).json({ error: "Three gratitude entries required" });
  }

  // Step 1: Analyze sentiments
  const sentimentScores = entries.map(analyzeSentiment);

  // Step 2: Calculate XP (e.g., 5 XP per positive point)
  const xp = sentimentScores.reduce((acc, score) => acc + Math.max(score, 0), 0) * 5;

  try {
    // Step 3: Generate GPT poetic summary
    const summary = await generatePoeticSummary(entries);

    // Step 4: Save log to MongoDB
    const log = new GratitudeLog({
      entries,
      sentiments: sentimentScores,
      summary,
      xp,
    });

    await log.save();

    // Step 5: Respond with data
    res.json({
      sentiments: sentimentScores,
      summary,
      xp,
    });
  } catch (error) {
    console.error("GPT Summary Error:", error.message);
    res.status(500).json({ error: "Failed to generate poetic summary" });
  }
});

module.exports = router;
