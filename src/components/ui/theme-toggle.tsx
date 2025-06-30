
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      className="jarvis-border bg-card/50 backdrop-blur-sm hover:jarvis-glow-blue transition-all duration-300 group"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-jarvis-blue group-hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-jarvis-blue group-hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
