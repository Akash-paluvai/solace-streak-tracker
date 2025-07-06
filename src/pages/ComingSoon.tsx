import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 jarvis-card rounded-full mx-auto mb-6 flex items-center justify-center jarvis-glow-cyan border border-jarvis-cyan">
          <Sparkles className="h-8 w-8 text-jarvis-cyan animate-pulse" />
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-jarvis-cyan mb-2">Coming Soon 🚧</h1>
        <p className="text-muted-foreground font-exo mb-6">
          This protocol is currently under development. Our AI engineers are working at neural speed to optimize it for you.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/suggestions">
            <Button variant="outline" className="jarvis-border hover:jarvis-glow-cyan font-orbitron">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Suggestions
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
