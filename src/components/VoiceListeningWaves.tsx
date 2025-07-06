import React from "react";

const VoiceListeningWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="animate-ping rounded-full h-52 w-52 bg-jarvis-cyan opacity-10" />
      <div className="animate-pulse rounded-full h-36 w-36 bg-jarvis-blue opacity-20" />
    </div>
  );
};

export default VoiceListeningWaves;
