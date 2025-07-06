// src/pages/NeuralBreathing.tsx
import React from "react";
import NeuralBreathing from "@/components/NeuralBreathing";

const NeuralBreathingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#00e5ff] font-orbitron">
        Neural Breathing Protocol
      </h1>
      <NeuralBreathing />
    </div>
  );
};

export default NeuralBreathingPage;
