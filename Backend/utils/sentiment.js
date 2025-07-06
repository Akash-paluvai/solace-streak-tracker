const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const analyzeSentiment = (text) => {
  // Simple scoring system
  const positiveWords = ["grateful", "happy", "joy", "love", "blessed", "amazing"];
  const negativeWords = ["sad", "angry", "bad", "unhappy", "tired"];

  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  for (const word of words) {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  }

  return score;
};

module.exports = {
  analyzeSentiment,
};
