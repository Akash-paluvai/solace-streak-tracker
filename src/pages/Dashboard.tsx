import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HealthCore } from "@/components/HealthCore";
import { XPBar } from "@/components/XPBar";
import { StatCard } from "@/components/StatCard";
import { QuestCard } from "@/components/QuestCard";
import { Heart, ArrowLeft, TrendingUp, Calendar, Zap, Star, Activity, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock user data
  const userStats = {
    level: 12,
    currentXP: 340,
    totalXP: 400,
    currentStreak: 7,
    totalCheckIns: 24,
    mood: "happy"
  };

  // Mock data
  const moodData = [
    { day: "Mon", mood: 3, stress: 6 },
    { day: "Tue", mood: 4, stress: 4 },
    { day: "Wed", mood: 3, stress: 7 },
    { day: "Thu", mood: 5, stress: 3 },
    { day: "Fri", mood: 4, stress: 5 },
    { day: "Sat", mood: 5, stress: 2 },
    { day: "Sun", mood: 4, stress: 4 },
  ];

  const dailyQuests = [
    { title: "Morning Check-in", description: "Log your daily mood", xpReward: 10, completed: true },
    { title: "Hydration Goal", description: "Drink 8 glasses of water", xpReward: 15, completed: false, progress: 5, total: 8 },
    { title: "Mindful Moment", description: "Complete 5-minute meditation", xpReward: 20, completed: false, progress: 0, total: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 digital-rain">
      {/* Futuristic Header */}
      <header className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <HealthCore mood={userStats.mood} size="sm" />
            <div>
              <h1 className="text-xl font-orbitron font-bold neon-text">Command Center</h1>
              <p className="text-xs text-muted-foreground">Level {userStats.level} Health Explorer</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-mono text-muted-foreground">Online</p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Synced</span>
            </div>
          </div>
          <ThemeToggle />
          <Link to="/mood-checkin">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-cyan font-orbitron">
              <Zap className="mr-2 h-4 w-4" />
              New Quest
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back, Explorer! 🚀
          </h2>
          <p className="text-muted-foreground font-exo">Your health quest continues with great progress</p>
        </div>

        {/* XP Progress */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border-2 border-primary/30 glow-cyan">
          <CardContent className="p-6">
            <XPBar currentXP={userStats.currentXP} totalXP={userStats.totalXP} level={userStats.level} />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Health Core - Central Display */}
          <div className="lg:col-span-1">
            <Card className="bg-card/30 backdrop-blur-sm border-2 border-primary/30 glow-cyan h-fit">
              <CardHeader>
                <CardTitle className="font-orbitron text-center">Health Core</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <HealthCore mood={userStats.mood} size="lg" />
                <div className="text-center">
                  <p className="font-orbitron font-bold text-lg capitalize">{userStats.mood}</p>
                  <p className="text-xs text-muted-foreground">Current State</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
            <StatCard
              title="Current Streak"
              value={userStats.currentStreak}
              unit="days"
              icon={Calendar}
              trend="up"
              glowColor="cyan"
            />
            <StatCard
              title="Total Check-ins"
              value={userStats.totalCheckIns}
              unit="this month"
              icon={Heart}
              trend="up"
              glowColor="gold"
            />
            <StatCard
              title="Wellness Score"
              value="85"
              unit="%"
              icon={TrendingUp}
              trend="up"
              glowColor="purple"
            />
            <StatCard
              title="Heart Rate"
              value="72"
              unit="bpm"
              icon={Activity}
              trend="neutral"
              glowColor="green"
            />
            <StatCard
              title="Stress Level"
              value="3"
              unit="/10"
              icon={Brain}
              trend="down"
              glowColor="cyan"
            />
            <StatCard
              title="Sleep Score"
              value="92"
              unit="%"
              icon={Shield}
              trend="up"
              glowColor="gold"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Trends Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card/30 backdrop-blur-sm border-2 border-primary/30 hover:glow-cyan transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron">Neural Activity Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[1, 10]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--primary))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Mood"
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      name="Stress"
                      dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Quests */}
          <div>
            <Card className="bg-card/30 backdrop-blur-sm border-2 border-secondary/30 hover:glow-gold transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <Star className="h-5 w-5 text-secondary" />
                  <span>Daily Quests</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyQuests.map((quest, index) => (
                  <QuestCard key={index} {...quest} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link to="/suggestions">
            <Button variant="outline" className="w-full h-16 text-lg neon-border bg-card/30 backdrop-blur-sm hover:glow-cyan transition-all font-exo">
              <Brain className="mr-2 h-5 w-5" />
              AI Suggestions
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" className="w-full h-16 text-lg neon-border bg-card/30 backdrop-blur-sm hover:glow-gold transition-all font-exo">
              <TrendingUp className="mr-2 h-5 w-5" />
              Deep Analytics
            </Button>
          </Link>
          <Link to="/gamification">
            <Button variant="outline" className="w-full h-16 text-lg neon-border bg-card/30 backdrop-blur-sm hover:glow-purple transition-all font-exo">
              <Star className="mr-2 h-5 w-5" />
              Achievements
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
