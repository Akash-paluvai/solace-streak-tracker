
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HealthCore } from "@/components/HealthCore";
import { XPBar } from "@/components/XPBar";
import { StatCard } from "@/components/StatCard";
import { QuestCard } from "@/components/QuestCard";
import { Heart, ArrowLeft, TrendingUp, Calendar, Zap, Star, Activity, Brain, Shield, Wifi, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock user data with Jarvis theme
  const userStats = {
    level: 12,
    currentXP: 340,
    totalXP: 400,
    currentStreak: 7,
    totalCheckIns: 24,
    mood: "happy",
    heartRate: 72,
    isOnline: true
  };

  // Mock health data
  const moodData = [
    { day: "Mon", mood: 3, stress: 6, heartRate: 68 },
    { day: "Tue", mood: 4, stress: 4, heartRate: 71 },
    { day: "Wed", mood: 3, stress: 7, heartRate: 75 },
    { day: "Thu", mood: 5, stress: 3, heartRate: 69 },
    { day: "Fri", mood: 4, stress: 5, heartRate: 73 },
    { day: "Sat", mood: 5, stress: 2, heartRate: 65 },
    { day: "Sun", mood: 4, stress: 4, heartRate: 72 },
  ];

  const dailyQuests = [
    { title: "Morning Check-in", description: "Log your daily mood", xpReward: 10, completed: true },
    { title: "Hydration Goal", description: "Drink 8 glasses of water", xpReward: 15, completed: false, progress: 5, total: 8 },
    { title: "Mindful Moment", description: "Complete 5-minute meditation", xpReward: 20, completed: false, progress: 0, total: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Jarvis Header */}
      <header className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/10 surface-panel">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-jarvis-blue transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <HealthCore mood={userStats.mood} size="sm" heartRate={userStats.heartRate} />
            <div>
              <h1 className="text-xl font-orbitron font-bold jarvis-text">Command Center</h1>
              <p className="text-xs text-muted-foreground">Level {userStats.level} Health Explorer</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {userStats.isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-jarvis-blue" />
                  <span className="text-sm font-mono text-jarvis-blue">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-jarvis-red" />
                  <span className="text-sm font-mono text-jarvis-red">Offline</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${userStats.isOnline ? 'bg-jarvis-blue' : 'bg-jarvis-red'}`}></div>
              <span className="text-xs text-muted-foreground">
                {userStats.isOnline ? 'Synced' : 'Sync Pending'}
              </span>
            </div>
          </div>
          <ThemeToggle />
          <Link to="/mood-checkin">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 jarvis-glow-blue font-orbitron">
              <Zap className="mr-2 h-4 w-4" />
              New Quest
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-jarvis-blue to-jarvis-gold bg-clip-text text-transparent">
            Welcome back, Explorer! 🚀
          </h2>
          <p className="text-muted-foreground font-exo">Your health quest continues with great progress</p>
        </div>

        {/* XP Progress */}
        <Card className="mb-8 jarvis-card border-2 border-primary/30 jarvis-glow-blue">
          <CardContent className="p-6">
            <XPBar currentXP={userStats.currentXP} totalXP={userStats.totalXP} level={userStats.level} />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Health Core - Central Display */}
          <div className="lg:col-span-1">
            <Card className="jarvis-card border-2 border-primary/30 jarvis-glow-blue h-fit">
              <CardHeader>
                <CardTitle className="font-orbitron text-center">Health Core</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <HealthCore mood={userStats.mood} size="lg" heartRate={userStats.heartRate} />
                <div className="text-center">
                  <p className="font-orbitron font-bold text-lg capitalize jarvis-text">{userStats.mood}</p>
                  <p className="text-xs text-muted-foreground">Current State</p>
                  <div className="mt-2">
                    <span className="stat-display">{userStats.heartRate} BPM</span>
                  </div>
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
              glowColor="cyan"
            />
            <StatCard
              title="Heart Rate"
              value="72"
              unit="bpm"
              icon={Activity}
              trend="neutral"
              glowColor="cyan"
            />
            <StatCard
              title="Stress Level"
              value="3"
              unit="/10"
              icon={Brain}
              trend="down"
              glowColor="gold"
            />
            <StatCard
              title="Sleep Score"
              value="92"
              unit="%"
              icon={Shield}
              trend="up"
              glowColor="cyan"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Neural Activity Chart */}
          <div className="lg:col-span-2">
            <Card className="jarvis-card border-2 border-primary/30 hover:jarvis-glow-blue transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron">Neural Activity Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,191,255,0.1)" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[1, 10]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(16, 24, 42, 0.9)', 
                        border: '1px solid rgba(0,191,255,0.3)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(8px)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#00BFFF" 
                      strokeWidth={3}
                      name="Mood"
                      dot={{ fill: '#00BFFF', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#FFC700" 
                      strokeWidth={3}
                      name="Stress"
                      dot={{ fill: '#FFC700', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#FF2D55" 
                      strokeWidth={2}
                      name="Heart Rate"
                      dot={{ fill: '#FF2D55', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Quests */}
          <div>
            <Card className="jarvis-card border-2 border-secondary/30 hover:jarvis-glow-gold transition-all">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <Star className="h-5 w-5 text-jarvis-gold" />
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
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:jarvis-glow-blue transition-all font-exo">
              <Brain className="mr-2 h-5 w-5" />
              AI Suggestions
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:jarvis-glow-gold transition-all font-exo">
              <TrendingUp className="mr-2 h-5 w-5" />
              Deep Analytics
            </Button>
          </Link>
          <Link to="/gamification">
            <Button variant="outline" className="w-full h-16 text-lg jarvis-border bg-card/30 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all font-exo">
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
