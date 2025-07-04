import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Heart, ArrowLeft, Brain, Zap, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [stressLevel, setStressLevel] = useState([5]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy", color: "jarvis-green" },
    { emoji: "😌", label: "Calm", value: "calm", color: "jarvis-cyan" },
    { emoji: "😐", label: "Neutral", value: "neutral", color: "jarvis-blue" },
    { emoji: "😰", label: "Anxious", value: "anxious", color: "jarvis-gold" },
    { emoji: "😢", label: "Sad", value: "sad", color: "purple-400" },
    { emoji: "😠", label: "Angry", value: "angry", color: "red-400" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id, // make sure you have this value
          mood: selectedMood,
          note: note, // use the note state variable
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit mood');
      }

      // Optionally handle the response
      const data = await response.json();
      // ...update UI, show success, etc...
    } catch (error) {
      // ...handle error...
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-xl font-orbitron font-bold jarvis-text">Neural Scan Interface</h1>
              <p className="text-xs text-muted-foreground font-exo">Emotional State Analysis</p>
            </div>
          </div>
        </div>
        
        <ThemeToggle />
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-jarvis-cyan via-jarvis-blue to-jarvis-green bg-clip-text text-transparent">
            Daily Neural Assessment
          </h2>
          <p className="text-muted-foreground font-exo">Scanning emotional and stress parameters</p>
        </div>

        <Card className="jarvis-card border-2 border-primary/30 jarvis-glow-cyan mb-8">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-2xl font-orbitron jarvis-text flex items-center justify-center space-x-2">
              <Activity className="h-6 w-6" />
              <span>Biometric Data Collection</span>
            </CardTitle>
            <p className="text-center text-muted-foreground font-exo">
              Analyzing current psychological state
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mood Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-orbitron font-semibold jarvis-text flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Emotional State Matrix</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {moods.map((mood, index) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-center hover:scale-105 jarvis-card floating-animation group ${
                        selectedMood === mood.value
                          ? `border-${mood.color}/80 jarvis-glow-cyan bg-${mood.color}/10`
                          : "border-primary/30 hover:border-primary/60 hover:jarvis-glow-cyan"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{mood.emoji}</div>
                      <div className={`text-sm font-orbitron font-semibold ${
                        selectedMood === mood.value ? "text-jarvis-cyan" : "text-foreground"
                      }`}>
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level */}
              <div className="space-y-6">
                <h3 className="text-xl font-orbitron font-semibold jarvis-text flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Stress Level Calibration</span>
                </h3>
                <Card className="jarvis-card border border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-mono text-muted-foreground">
                        <span className="text-jarvis-green">Minimal (1)</span>
                        <span className="text-jarvis-cyan font-orbitron">Current Level: {stressLevel[0]}</span>
                        <span className="text-red-400">Critical (10)</span>
                      </div>
                      <Slider
                        value={stressLevel}
                        onValueChange={setStressLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center">
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${
                          stressLevel[0] <= 3 ? 'border-jarvis-green/40 bg-jarvis-green/10 text-jarvis-green' :
                          stressLevel[0] <= 6 ? 'border-jarvis-cyan/40 bg-jarvis-cyan/10 text-jarvis-cyan' :
                          stressLevel[0] <= 8 ? 'border-jarvis-gold/40 bg-jarvis-gold/10 text-jarvis-gold' :
                          'border-red-400/40 bg-red-400/10 text-red-400'
                        }`}>
                          <Activity className="h-4 w-4" />
                          <span className="font-orbitron text-sm">
                            {stressLevel[0] <= 3 ? 'Optimal' :
                             stressLevel[0] <= 6 ? 'Elevated' :
                             stressLevel[0] <= 8 ? 'High' : 'Critical'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Optional Note */}
              <div className="space-y-4">
                <h3 className="text-xl font-orbitron font-semibold jarvis-text flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Additional Neural Data (Optional)</span>
                </h3>
                <Textarea
                  placeholder="Record any specific thoughts, triggers, or observations about your current state..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[120px] jarvis-input bg-card/50 border-primary/30 text-foreground placeholder-muted-foreground font-exo"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-jarvis-cyan to-jarvis-blue hover:jarvis-glow-cyan text-jarvis-dark font-orbitron font-bold text-lg py-6 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-jarvis-dark/30 border-t-jarvis-dark rounded-full animate-spin"></div>
                    <span>Synchronizing Neural Data...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Complete Neural Scan</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodCheckIn;
