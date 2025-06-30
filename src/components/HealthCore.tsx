
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthCoreProps {
  mood?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const HealthCore = ({ mood = "neutral", className, size = "md" }: HealthCoreProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "text-secondary drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]";
      case "sad":
        return "text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]";
      case "anxious":
        return "text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.8)]";
      case "calm":
        return "text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]";
      default:
        return "text-primary drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]";
    }
  };

  return (
    <div className={cn(
      "health-core rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <Heart className={cn(
        "animate-pulse",
        getMoodColor(mood),
        size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16"
      )} />
    </div>
  );
};
