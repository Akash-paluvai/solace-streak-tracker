
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestCardProps {
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  progress?: number;
  total?: number;
  className?: string;
}

export const QuestCard = ({ 
  title, 
  description, 
  xpReward, 
  completed, 
  progress, 
  total,
  className 
}: QuestCardProps) => {
  return (
    <Card className={cn(
      "bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-102",
      completed ? "border-secondary/50 glow-gold" : "border-primary/30 hover:glow-cyan",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {completed ? (
              <CheckCircle className="w-5 h-5 text-secondary" />
            ) : (
              <Circle className="w-5 h-5 text-primary" />
            )}
            <h3 className="font-orbitron font-semibold text-sm">{title}</h3>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              completed ? "border-secondary/50 text-secondary" : "border-primary/50 text-primary"
            )}
          >
            +{xpReward} XP
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        
        {progress !== undefined && total !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}/{total}</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  completed ? "bg-secondary" : "bg-primary"
                )}
                style={{ width: `${Math.min((progress / total) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
