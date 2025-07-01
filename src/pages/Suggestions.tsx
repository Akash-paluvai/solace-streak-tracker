
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Heart, ArrowLeft, Clock, User, Brain, Sparkles, Zap, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Enhanced AI-generated suggestions with Jarvis theme
  const mockSuggestions = [
    {
      id: 1,
      title: "Neural Breathing Protocol",
      description: "Advanced breathing technique to optimize neural patterns and reduce cortisol levels",
      duration: "5 min",
      category: "Mindfulness",
      difficulty: "Easy",
      icon: "🧠",
      color: "jarvis-cyan",
      xpReward: 15,
      priority: "high"
    },
    {
      id: 2,
      title: "Gratitude Matrix Logging",
      description: "Quantum-level gratitude tracking to enhance dopamine pathways",
      duration: "10 min",
      category: "Reflection",
      difficulty: "Easy",
      icon: "✨",
      color: "jarvis-gold",
      xpReward: 20,
      priority: "medium"
    },
    {
      id: 3,
      title: "Progressive Muscle Optimization",
      description: "Systematic muscle relaxation protocol for stress mitigation",
      duration: "15 min",
      category: "Relaxation",
      difficulty: "Medium",
      icon: "💪",
      color: "jarvis-blue",
      xpReward: 25,
      priority: "high"
    },
    {
      id: 4,
      title: "Binaural Frequency Meditation",
      description: "Sound-wave meditation with nature frequencies for mental clarity",
      duration: "20 min",
      category: "Meditation",
      difficulty: "Easy",
      icon: "🎵",
      color: "jarvis-green",
      xpReward: 30,
      priority: "low"
    },
    {
      id: 5,
      title: "Dynamic Flexibility Protocol",
      description: "Biomechanical stretches to release tension and boost endorphins",
      duration: "12 min",
      category: "Movement",
      difficulty: "Easy",
      icon: "🧘‍♀️",
      color: "jarvis-cyan",
      xpReward: 18,
      priority: "medium"
    },
    {
      id: 6,
      title: "Positive Neural Reinforcement",
      description: "AI-guided affirmations to restructure cognitive patterns",
      duration: "8 min",
      category: "Self-Care",
      difficulty: "Easy",
      icon: "⚡",
      color: "jarvis-gold",
      xpReward: 22,
      priority: "high"
    },
  ];

  const categories = ["All", "Mindfulness", "Reflection", "Relaxation", "Meditation", "Movement", "Self-Care"];

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuggestions(mockSuggestions);
      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  const filteredSuggestions = selectedCategory === "All" 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const handleStartActivity = (suggestion: any) => {
    console.log("Initiating protocol:", suggestion.title);
  };

  const handleSurpriseMe = () => {
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    handleStartActivity(randomSuggestion);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 jarvis-card rounded-full flex items-center justify-center mx-auto mb-4 jarvis-glow-cyan animate-pulse">
            <Brain className="h-8 w-8 text-jarvis-cyan jarvis-pulse" />
          </div>
          <p className="text-jarvis-cyan font-orbitron font-bold">Analyzing neural patterns...</p>
          <p className="text-muted-foreground font-exo text-sm mt-2">Generating personalized protocols</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Jarvis Header */}
      <header className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/10 surface-panel">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-jarvis-cyan transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 jarvis-card rounded-full flex items-center justify-center jarvis-glow-cyan border-2 border-jarvis-cyan/40">
              <Brain className="h-6 w-6 text-jarvis-cyan jarvis-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold jarvis-text">AI Protocol Matrix</h1>
              <p className="text-xs text-muted-foreground font-exo">Personalized Wellness Algorithms</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            onClick={handleSurpriseMe}
            className="bg-gradient-to-r from-jarvis-gold to-jarvis-gold/80 hover:jarvis-glow-gold font-orbitron text-jarvis-dark font-bold"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Surprise Protocol
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-jarvis-cyan via-jarvis-blue to-jarvis-gold bg-clip-text text-transparent">
            Neural Enhancement Protocols
          </h2>
          <p className="text-muted-foreground font-exo">AI-curated wellness algorithms optimized for your current biometric state</p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8 jarvis-card border-2 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-4 w-4 text-jarvis-cyan" />
              <span className="font-orbitron text-sm">Protocol Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`font-exo ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-jarvis-cyan to-jarvis-blue jarvis-glow-cyan"
                      : "jarvis-border bg-card/30 hover:jarvis-glow-cyan hover:text-jarvis-cyan"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSuggestions.map((suggestion, index) => (
            <Card 
              key={suggestion.id} 
              className={`jarvis-card border-2 border-${suggestion.color}/30 hover:jarvis-glow-${suggestion.color === 'jarvis-gold' ? 'gold' : 'cyan'} transition-all duration-300 hover:scale-105 group floating-animation`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{suggestion.icon}</div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs bg-${suggestion.color}/20 text-${suggestion.color} border-${suggestion.color}/40`}
                    >
                      {suggestion.category}
                    </Badge>
                    {suggestion.priority === "high" && (
                      <div className="w-2 h-2 bg-jarvis-gold rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg font-orbitron group-hover:text-jarvis-cyan transition-colors">
                  {suggestion.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 font-exo">{suggestion.description}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground font-mono">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{suggestion.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{suggestion.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-jarvis-gold" />
                    <span className="text-jarvis-gold">+{suggestion.xpReward} XP</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartActivity(suggestion)}
                  className="w-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/40 hover:border-primary/80 hover:jarvis-glow-cyan text-white transition-all font-orbitron"
                  variant="outline"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Initiate Protocol
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:jarvis-glow-cyan transition-all font-orbitron">
              <Heart className="mr-2 h-5 w-5" />
              Command Center
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:jarvis-glow-gold transition-all font-orbitron">
              <Brain className="mr-2 h-5 w-5" />
              Neural Analytics
            </Button>
          </Link>
          <Link to="/gamification">
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all font-orbitron">
              <Sparkles className="mr-2 h-5 w-5" />
              Achievement Matrix
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
