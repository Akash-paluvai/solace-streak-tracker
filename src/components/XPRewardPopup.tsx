import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const XPRewardPopup: React.FC<{ xp: number }> = ({ xp }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); // hide after 3s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 jarvis-glow-gold z-50">
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black px-6 py-4 rounded-2xl shadow-xl border-2 border-yellow-600 font-orbitron animate-fade-in-up scale-110">
        <div className="flex items-center space-x-2 text-lg font-bold">
          <Sparkles className="text-white animate-bounce" />
          <span>+{xp} XP Earned!</span>
        </div>
      </div>
    </div>
  );
};

export default XPRewardPopup;
