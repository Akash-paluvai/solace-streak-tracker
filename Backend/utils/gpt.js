const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const generatePoeticSummary = async (entries) => {
  const prompt = `Based on the following gratitude entries, generate a short poetic or affirmational summary that feels emotionally uplifting:\n\n${entries.join(
    "\n"
  )}`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free", 
        messages: [
          {
            role: "system",
            content: "You are a compassionate therapist who writes poetic gratitude summaries.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    return reply || "Gratitude processed beautifully.";
  } catch (error) {
    console.error("GPT Error:", error?.response?.data || error.message);
    return "Unable to generate summary at the moment.";
  }
};

module.exports = {
  generatePoeticSummary,
};
