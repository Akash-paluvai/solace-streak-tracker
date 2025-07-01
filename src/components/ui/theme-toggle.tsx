
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
      className="jarvis-border bg-jarvis-dark/50 backdrop-blur-lg hover:jarvis-glow-cyan transition-all duration-300 group border-jarvis-cyan/40"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-jarvis-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,255,247,0.8)]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-jarvis-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,255,247,0.8)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
