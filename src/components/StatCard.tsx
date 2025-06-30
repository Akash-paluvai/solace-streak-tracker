
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
  glowColor?: "cyan" | "gold" | "purple" | "green";
}

export const StatCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend = "neutral",
  className,
  glowColor = "cyan"
}: StatCardProps) => {
  const glowClasses = {
    cyan: "glow-cyan border-primary/30",
    gold: "glow-gold border-secondary/30", 
    purple: "glow-purple border-accent/30",
    green: "shadow-[0_0_20px_rgba(74,222,128,0.3)] border-green-400/30"
  };

  const iconColors = {
    cyan: "text-primary",
    gold: "text-secondary",
    purple: "text-accent", 
    green: "text-green-400"
  };

  return (
    <Card className={cn(
      "bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 floating",
      glowClasses[glowColor],
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className={cn("w-5 h-5", iconColors[glowColor])} />
          {trend !== "neutral" && (
            <div className={cn(
              "text-xs px-2 py-1 rounded-full",
              trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            )}>
              {trend === "up" ? "↗" : "↘"}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-mono font-bold">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};
