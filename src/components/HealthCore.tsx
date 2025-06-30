
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthCoreProps {
  mood?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  heartRate?: number;
}

export const HealthCore = ({ 
  mood = "neutral", 
  className, 
  size = "md",
  heartRate
}: HealthCoreProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const getMoodGlow = (mood: string) => {
    switch (mood) {
      case "happy":
        return "drop-shadow-[0_0_30px_rgba(255,199,0,0.8)] text-jarvis-gold";
      case "sad":
        return "drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] text-blue-400";
      case "anxious":
        return "drop-shadow-[0_0_30px_rgba(255,45,85,0.8)] text-jarvis-red";
      case "calm":
        return "drop-shadow-[0_0_30px_rgba(74,222,128,0.8)] text-green-400";
      default:
        return "drop-shadow-[0_0_30px_rgba(0,191,255,0.8)] text-jarvis-blue";
    }
  };

  const getPulseSpeed = (heartRate?: number) => {
    if (!heartRate) return "2.5s";
    if (heartRate > 100) return "1.5s";
    if (heartRate > 80) return "2s";
    return "2.5s";
  };

  return (
    <div className={cn(
      "health-core rounded-full surface-panel flex items-center justify-center relative overflow-hidden",
      sizeClasses[size],
      className
    )}>
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-full border-2 border-jarvis-blue/30 animate-jarvis-pulse" />
      
      {/* Core heart icon */}
      <Heart 
        className={cn(
          "health-core-animation transition-all duration-300",
          getMoodGlow(mood),
          size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16"
        )}
        style={{
          animationDuration: getPulseSpeed(heartRate)
        }}
      />
      
      {/* Heart rate display for larger sizes */}
      {heartRate && size !== "sm" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <span className="font-mono text-xs text-jarvis-blue font-bold">
            {heartRate}
          </span>
        </div>
      )}
    </div>
  );
};
