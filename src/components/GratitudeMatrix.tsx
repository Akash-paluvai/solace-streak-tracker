import React, { useState } from "react";
import axios from "axios";
import BloomCanvas from "@/components/BloomCanvas";
import XPRewardPopup from "./XPRewardPopup";


declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const GratitudeMatrix: React.FC = () => {
  const [entries, setEntries] = useState(["", "", ""]);
  const [listeningIndex, setListeningIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState("");
  const [sentiments, setSentiments] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVoiceInput = (index: number) => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert("Voice recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListeningIndex(index);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const updated = [...entries];
      updated[index] = transcript;
      setEntries(updated);
    };

    recognition.onerror = () => setListeningIndex(null);
    recognition.onend = () => setListeningIndex(null);
    recognition.start();
  };

  const handleSubmit = async () => {
    if (entries.some((e) => e.trim() === "")) {
      alert("Please complete all 3 entries.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/gratitude/analyze-gratitude", {
        entries,
      });

      setSummary(response.data.summary);
      setSentiments(response.data.sentiments);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting gratitude:", error);
      alert("Failed to analyze gratitude. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gratitude-container">
      <h1 className="title">Gratitude Matrix 🌌</h1>
      <p className="prompt">Speak or type 3 things you're grateful for today:</p>

      {entries.map((entry, index) => (
        <div key={index} className="entry-box">
          <textarea
            placeholder={`Gratitude #${index + 1}`}
            value={entry}
            onChange={(e) => {
              const updated = [...entries];
              updated[index] = e.target.value;
              setEntries(updated);
            }}
          />
          <button onClick={() => handleVoiceInput(index)}>
            {listeningIndex === index ? "🎤 Listening..." : "🎙️ Speak"}
          </button>
        </div>
      ))}

      <button onClick={handleSubmit} className="submit-button" disabled={loading}>
        {loading ? "Analyzing..." : "Submit Gratitude"}
      </button>

      {submitted && (
        <div className="response-area">
          <h2 className="summary-title">🧠 Sentiment Scores:</h2>
          <ul>
            {sentiments?.map((score, idx) => (
              <li key={idx}>Gratitude #{idx + 1}: {score >= 0 ? "+" : ""}{score}</li>
            ))}
          </ul>

          <h2 className="summary-title">🌸 AI Reflection:</h2>
          <p className="summary-text">{summary}</p>
        </div>
      )}
      {submitted && <XPRewardPopup xp={20} />}
      {sentiments && <BloomCanvas sentiments={sentiments} />}

    </div>
  );
};

export default GratitudeMatrix;
