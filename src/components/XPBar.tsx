
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
}

export const XPBar = ({ currentXP, totalXP, level }: XPBarProps) => {
  const percentage = (currentXP / totalXP) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-secondary glow-gold" />
          <span className="font-orbitron text-sm font-bold">Level {level}</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {currentXP}/{totalXP} XP
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-3 bg-muted/30 border border-primary/20"
        />
        <div 
          className="absolute top-0 left-0 h-full xp-bar-fill rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
