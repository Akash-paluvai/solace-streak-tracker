
import { Progress } from "@/components/ui/progress";
import { Star, Zap } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
  showLevelUpEffect?: boolean;
}

export const XPBar = ({ currentXP, totalXP, level, showLevelUpEffect = false }: XPBarProps) => {
  const percentage = (currentXP / totalXP) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "flex items-center space-x-2 px-3 py-1 rounded-full jarvis-border bg-gradient-to-r from-jarvis-blue/20 to-jarvis-gold/20",
            showLevelUpEffect && "level-up-effect"
          )}>
            <Star className="w-5 h-5 text-jarvis-gold jarvis-glow-gold" />
            <span className="font-orbitron text-sm font-bold text-jarvis-blue">
              Level {level}
            </span>
            {showLevelUpEffect && (
              <Zap className="w-4 h-4 text-jarvis-gold animate-bounce" />
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-sm font-bold stat-display">
            {currentXP}/{totalXP} XP
          </span>
          <div className="text-xs text-muted-foreground">
            {totalXP - currentXP} to next level
          </div>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-4 bg-muted/30 border border-primary/20 rounded-full overflow-hidden"
        />
        <div 
          className="absolute top-0 left-0 h-full xp-bar-fill rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
        
        {/* XP gain animation overlay */}
        {showLevelUpEffect && (
          <div className="absolute inset-0 bg-gradient-to-r from-jarvis-blue/40 to-jarvis-gold/40 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );
};
