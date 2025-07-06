// components/NeuralBreathing.tsx
import React, { useEffect, useState } from "react";
import "./NeuralBreathing.css";
import { useFaceDetection } from "@/hooks/useFaceDetection";
import { useNavigate } from "react-router-dom";


const NeuralBreathing: React.FC = () => {
  const { videoRef, faceDetected } = useFaceDetection();

  const [duration, setDuration] = useState(5 * 60); // 5 minutes
  const [xpVisible, setXpVisible] = useState(false);
  const [message, setMessage] = useState("Breathe In... Breathe Out");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if (faceDetected) setStarted(true);
    else {
      setStarted(false);
      setMessage("🛑 Please position your face");
    }
  }, [faceDetected]);

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setMessage("Great Job!");
          setXpVisible(true);
          // TODO: Call backend for XP reward
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <div className="breathing-container">
      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      <div className="light-beam" />
      {started ? (
        <>
          <div className="circle" />
          <div className="text">{message}</div>
          <div className="timer">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
          {xpVisible && <div className="xp-earned">✅ +15 XP Earned</div>}
        </>
      ) : (
        <div className="text text-red-500 mt-10">🔴 Face not detected</div>
      )}
  <button className="back-button" onClick={() => navigate(-1)}>
    ⬅ Back
  </button>

      {/* Webcam mini preview in top-right corner */}
<div className="webcam-frame">
  <video
    ref={videoRef}
    autoPlay
    muted
    playsInline
    className="mini-video"
  />
</div>

    </div>
  );
};

export default NeuralBreathing;
