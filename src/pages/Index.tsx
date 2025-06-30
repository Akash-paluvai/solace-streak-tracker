
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HealthCore } from "@/components/HealthCore";
import { Heart, Brain, TrendingUp, MessageCircle, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Futuristic Header */}
      <header className="p-6 flex justify-between items-center backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center space-x-4">
          <HealthCore size="sm" mood="neutral" />
          <div>
            <h1 className="text-2xl font-orbitron font-bold jarvis-text">MindMate</h1>
            <p className="text-xs text-muted-foreground font-exo">Level Up Your Health</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline" className="jarvis-border bg-card/50 backdrop-blur-sm hover:jarvis-glow-blue font-exo">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 jarvis-glow-blue font-orbitron font-bold">
              Start Quest
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <HealthCore size="lg" className="mx-auto mb-6" heartRate={75} />
          </div>
          
          <h2 className="text-6xl font-orbitron font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-jarvis-blue via-accent to-jarvis-gold bg-clip-text text-transparent">
              Level Up
            </span>
            <br />
            <span className="jarvis-text">Your Health</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-exo">
            Transform your wellness journey into an epic quest. Track vitals, unlock achievements, 
            and build healthy habits with AI-powered insights and immersive gamification.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/mood-checkin" className="group">
              <Card className="h-full jarvis-card hover:jarvis-glow-blue transition-all duration-300 group-hover:scale-105 floating-animation">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform jarvis-border">
                    <Heart className="h-8 w-8 text-jarvis-blue group-hover:jarvis-pulse" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-2">Daily Quest</h3>
                  <p className="text-muted-foreground font-exo">Begin your health tracking journey</p>
                  <div className="mt-4">
                    <span className="text-xs bg-primary/20 text-jarvis-blue px-3 py-1 rounded-full font-mono">+10 XP</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard" className="group">
              <Card className="h-full jarvis-card hover:jarvis-glow-gold transition-all duration-300 group-hover:scale-105 floating-animation" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border-2 border-jarvis-gold/30">
                    <TrendingUp className="h-8 w-8 text-jarvis-gold group-hover:jarvis-pulse" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-2">Command Center</h3>
                  <p className="text-muted-foreground font-exo">Monitor your progress and stats</p>
                  <div className="mt-4">
                    <span className="text-xs bg-secondary/20 text-jarvis-gold px-3 py-1 rounded-full font-mono">Analytics</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/chatbot" className="group">
              <Card className="h-full jarvis-card hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 group-hover:scale-105 floating-animation" style={{ animationDelay: "0.4s" }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border-2 border-purple-500/30">
                    <MessageCircle className="h-8 w-8 text-purple-500 group-hover:jarvis-pulse" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-2">AI Companion</h3>
                  <p className="text-muted-foreground font-exo">Get personalized guidance 24/7</p>
                  <div className="mt-4">
                    <span className="text-xs bg-purple-500/20 text-purple-500 px-3 py-1 rounded-full font-mono">Jarvis</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="space-y-4">
            <Link to="/mood-checkin">
              <Button size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 jarvis-glow-blue font-orbitron font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Begin Your Journey
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground font-exo">No registration required • Start your quest anonymously</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="surface-panel py-16 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-orbitron font-bold text-center mb-12 jarvis-text">
            Advanced Health Tracking System
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:jarvis-glow-blue transition-all jarvis-border">
                <Heart className="h-8 w-8 text-jarvis-blue" />
              </div>
              <h4 className="font-orbitron font-semibold mb-2">Vital Tracking</h4>
              <p className="text-muted-foreground text-sm font-exo">Monitor mood, stress, and energy levels</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:jarvis-glow-gold transition-all border-2 border-jarvis-gold/30">
                <Brain className="h-8 w-8 text-jarvis-gold" />
              </div>
              <h4 className="font-orbitron font-semibold mb-2">AI Intelligence</h4>
              <p className="text-muted-foreground text-sm font-exo">Smart recommendations and insights</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all border-2 border-purple-500/30">
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="font-orbitron font-semibold mb-2">Progress Analytics</h4>
              <p className="text-muted-foreground text-sm font-exo">Advanced data visualization</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400/20 to-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all border-2 border-green-400/30">
                <Star className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="font-orbitron font-semibold mb-2">Gamification</h4>
              <p className="text-muted-foreground text-sm font-exo">Achievements and XP system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
