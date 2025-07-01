
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, Brain, TrendingUp, Calendar, Activity, Heart, Zap, Download, Filter, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from "recharts";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeView, setActiveView] = useState("overview");

  // Mock comprehensive health data
  const moodTrendData = [
    { day: "Mon", mood: 7, energy: 6, stress: 4, sleep: 8, heartRate: 68, steps: 8500 },
    { day: "Tue", mood: 8, energy: 7, stress: 3, sleep: 7, heartRate: 71, steps: 9200 },
    { day: "Wed", mood: 6, energy: 5, stress: 6, sleep: 6, heartRate: 75, steps: 6800 },
    { day: "Thu", mood: 9, energy: 8, stress: 2, sleep: 8, heartRate: 69, steps: 10500 },
    { day: "Fri", mood: 8, energy: 7, stress: 4, sleep: 7, heartRate: 73, steps: 9800 },
    { day: "Sat", mood: 9, energy: 9, stress: 1, sleep: 9, heartRate: 65, steps: 12000 },
    { day: "Sun", mood: 8, energy: 7, stress: 3, sleep: 8, heartRate: 72, steps: 8900 },
  ];

  const radarData = [
    { subject: 'Mood', A: 8.2, fullMark: 10 },
    { subject: 'Energy', A: 7.1, fullMark: 10 },
    { subject: 'Sleep', A: 7.6, fullMark: 10 },
    { subject: 'Activity', A: 8.8, fullMark: 10 },
    { subject: 'Mindfulness', A: 6.9, fullMark: 10 },
    { subject: 'Social', A: 7.3, fullMark: 10 },
  ];

  const weeklyStats = [
    { metric: "Average Mood", value: "7.9", change: "+12%", trend: "up", color: "jarvis-cyan" },
    { metric: "Sleep Quality", value: "81%", change: "+5%", trend: "up", color: "jarvis-blue" },
    { metric: "Stress Level", value: "3.3", change: "-23%", trend: "down", color: "jarvis-green" },
    { metric: "Activity Score", value: "92", change: "+18%", trend: "up", color: "jarvis-gold" },
  ];

  const timeRanges = [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
    { label: "1 Year", value: "1y" },
  ];

  const views = [
    { label: "Overview", value: "overview", icon: Eye },
    { label: "Trends", value: "trends", icon: TrendingUp },
    { label: "Patterns", value: "patterns", icon: Brain },
    { label: "Correlations", value: "correlations", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Jarvis Header */}
      <header className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/10 surface-panel">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-jarvis-cyan transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 jarvis-card rounded-full flex items-center justify-center jarvis-glow-blue border-2 border-jarvis-blue/40">
              <Brain className="h-6 w-6 text-jarvis-blue jarvis-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-jarvis-blue">Neural Analytics Hub</h1>
              <p className="text-xs text-muted-foreground font-exo">Advanced Biometric Intelligence</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button className="bg-gradient-to-r from-jarvis-blue to-jarvis-cyan hover:jarvis-glow-blue font-orbitron">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-jarvis-blue via-jarvis-cyan to-jarvis-gold bg-clip-text text-transparent">
            Deep Neural Analytics
          </h2>
          <p className="text-muted-foreground font-exo">Comprehensive biometric analysis and predictive health insights</p>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 jarvis-card border-2 border-primary/30">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-jarvis-cyan" />
                  <span className="font-orbitron text-sm">Time Range</span>
                </div>
                <div className="flex space-x-2">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.value}
                      variant={timeRange === range.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range.value)}
                      className={`font-mono ${
                        timeRange === range.value
                          ? "bg-gradient-to-r from-jarvis-cyan to-jarvis-blue jarvis-glow-cyan"
                          : "jarvis-border bg-card/30 hover:jarvis-glow-cyan hover:text-jarvis-cyan"
                      }`}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {views.map((view) => {
                  const IconComponent = view.icon;
                  return (
                    <Button
                      key={view.value}
                      variant={activeView === view.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveView(view.value)}
                      className={`font-exo ${
                        activeView === view.value
                          ? "bg-gradient-to-r from-jarvis-blue to-jarvis-cyan jarvis-glow-blue"
                          : "jarvis-border bg-card/30 hover:jarvis-glow-blue hover:text-jarvis-blue"
                      }`}
                    >
                      <IconComponent className="mr-1 h-4 w-4" />
                      {view.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {weeklyStats.map((stat, index) => (
            <Card key={index} className="jarvis-card border-2 border-primary/30 hover:jarvis-glow-cyan transition-all floating-animation" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-orbitron font-bold text-jarvis-cyan mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-exo mb-2">{stat.metric}</div>
                <div className={`flex items-center justify-center space-x-1 text-xs font-mono ${
                  stat.trend === "up" ? "text-jarvis-green" : stat.trend === "down" ? "text-jarvis-gold" : "text-muted-foreground"
                }`}>
                  <TrendingUp className={`h-3 w-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  <span>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Trend Chart */}
          <div className="lg:col-span-2">
            <Card className="jarvis-card border-2 border-primary/30 hover:jarvis-glow-blue transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-jarvis-blue" />
                  <span>Biometric Trends Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={moodTrendData}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00fff7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00fff7" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007cf8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#007cf8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,247,0.1)" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" className="font-mono" />
                    <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" className="font-mono" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(16, 24, 42, 0.95)', 
                        border: '1px solid rgba(0,255,247,0.3)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(12px)',
                        fontFamily: 'Roboto Mono'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#00fff7" 
                      strokeWidth={3}
                      fill="url(#moodGradient)"
                      name="Mood Level"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#007cf8" 
                      strokeWidth={2}
                      fill="url(#energyGradient)"
                      name="Energy Level"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Wellness Radar */}
          <div>
            <Card className="jarvis-card border-2 border-secondary/30 hover:jarvis-glow-gold transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-jarvis-gold" />
                  <span>Wellness Matrix</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(0,255,247,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#8A94A6' }} className="font-exo" />
                    <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#8A94A6' }} className="font-mono" />
                    <Radar
                      name="Current Level"
                      dataKey="A"
                      stroke="#FFC700"
                      fill="#FFC700"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Heart Rate Variability */}
          <Card className="jarvis-card border-2 border-primary/30 hover:jarvis-glow-cyan transition-all">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-400" />
                <span>Cardiac Rhythm Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,45,85,0.1)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" className="font-mono" />
                  <YAxis domain={[60, 80]} stroke="hsl(var(--muted-foreground))" className="font-mono" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(16, 24, 42, 0.95)', 
                      border: '1px solid rgba(255,45,85,0.3)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(12px)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#FF2D55" 
                    strokeWidth={3}
                    name="Heart Rate (BPM)"
                    dot={{ fill: '#FF2D55', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Levels */}
          <Card className="jarvis-card border-2 border-secondary/30 hover:jarvis-glow-gold transition-all">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Activity className="h-5 w-5 text-jarvis-gold" />
                <span>Activity Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,199,0,0.1)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" className="font-mono" />
                  <YAxis stroke="hsl(var(--muted-foreground))" className="font-mono" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(16, 24, 42, 0.95)', 
                      border: '1px solid rgba(255,199,0,0.3)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(12px)'
                    }} 
                  />
                  <Bar 
                    dataKey="steps" 
                    fill="#FFC700" 
                    name="Steps Count"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <Card className="mt-8 jarvis-card border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="font-orbitron flex items-center space-x-2">
              <Brain className="h-5 w-5 text-jarvis-cyan" />
              <span>AI Insights & Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-jarvis-cyan/10 border border-jarvis-cyan/30 rounded-lg">
                <h4 className="font-orbitron font-semibold text-jarvis-cyan mb-2">Mood Optimization</h4>
                <p className="text-sm text-muted-foreground font-exo">Your mood patterns show 23% improvement when combined with 7+ hours of sleep and morning exercise.</p>
              </div>
              <div className="p-4 bg-jarvis-gold/10 border border-jarvis-gold/30 rounded-lg">
                <h4 className="font-orbitron font-semibold text-jarvis-gold mb-2">Stress Prediction</h4>
                <p className="text-sm text-muted-foreground font-exo">AI predicts 18% lower stress levels if you maintain current meditation frequency (5x/week).</p>
              </div>
              <div className="p-4 bg-jarvis-green/10 border border-jarvis-green/30 rounded-lg">
                <h4 className="font-orbitron font-semibold text-jarvis-green mb-2">Energy Forecast</h4>
                <p className="text-sm text-muted-foreground font-exo">Optimal energy window detected: 9-11 AM and 2-4 PM based on your circadian rhythm analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
