import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BloomCanvas from "@/components/BloomCanvas";
import XPRewardPopup from "./XPRewardPopup";
import VoiceListeningWaves from "@/components/VoiceListeningWaves";
import { Sparkles, ArrowLeft } from "lucide-react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const GratitudeMatrix: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid p-6">
      {listeningIndex !== null && <VoiceListeningWaves />}

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 text-sm border border-jarvis-cyan rounded-lg font-orbitron text-jarvis-cyan bg-background/30 hover:jarvis-glow-cyan transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto jarvis-card jarvis-glow-cyan flex items-center justify-center rounded-full mb-3">
            <Sparkles className="text-jarvis-cyan h-6 w-6 animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-jarvis-cyan">Gratitude Matrix 🌌</h1>
          <p className="text-muted-foreground mt-2 font-exo text-sm">Speak or type 3 things you're grateful for today</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {entries.map((entry, index) => (
            <div key={index} className="jarvis-card p-4 rounded-2xl border-2 border-primary/30 bg-card/20 relative">
              <textarea
                className="w-full h-28 p-4 rounded-xl border border-primary/20 bg-background text-white resize-none font-exo placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jarvis-cyan"
                placeholder={`✨ Gratitude Thought #${index + 1}`}
                value={entry}
                onChange={(e) => {
                  const updated = [...entries];
                  updated[index] = e.target.value;
                  setEntries(updated);
                }}
              />
              <button
                onClick={() => handleVoiceInput(index)}
                className={`mt-3 px-4 py-2 text-sm rounded-lg border border-primary/30 w-full jarvis-glow-cyan text-jarvis-cyan font-orbitron hover:bg-card/30 transition-all ${listeningIndex === index ? "bg-card animate-pulse" : ""}`}
              >
                {listeningIndex === index ? "🎤 Listening..." : "🎙️ Speak Entry"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button bg-gradient-to-r from-jarvis-cyan to-jarvis-blue px-6 py-3 text-white font-orbitron rounded-xl hover:scale-105 hover:jarvis-glow-cyan transition-all"
          >
            {loading ? "Analyzing..." : "Submit Gratitude"}
          </button>
        </div>

        {submitted && (
          <div className="mt-10 bg-card/30 p-6 rounded-xl jarvis-card border border-primary/20">
            <h2 className="text-xl font-orbitron mb-2 text-jarvis-gold">🧠 Sentiment Scores:</h2>
            <ul className="list-disc list-inside font-exo text-white mb-4">
              {sentiments?.map((score, idx) => (
                <li key={idx}>Gratitude #{idx + 1}: {score >= 0 ? "+" : ""}{score}</li>
              ))}
            </ul>

            <h2 className="text-xl font-orbitron mb-2 text-jarvis-gold">🌸 AI Reflection:</h2>
            <p className="text-muted-foreground font-exo italic">{summary}</p>
          </div>
        )}

        {submitted && <XPRewardPopup xp={20} />}
        {sentiments && <BloomCanvas sentiments={sentiments} />}
      </div>
    </div>
  );
};

export default GratitudeMatrix;
