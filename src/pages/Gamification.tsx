
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, Trophy, Star, Zap, Crown, Target, Calendar, Award, Shield, Flame, Gem, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Gamification = () => {
  const [activeTab, setActiveTab] = useState("achievements");

  // Mock user stats
  const userLevel = {
    current: 12,
    xp: 2450,
    nextLevelXp: 3000,
    totalXp: 15750,
    rank: "Health Explorer",
    nextRank: "Wellness Master"
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first mood check-in",
      icon: Star,
      category: "Milestone",
      progress: 100,
      completed: true,
      rarity: "common",
      xpReward: 50,
      unlockedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintain a 7-day check-in streak",
      icon: Flame,
      category: "Consistency",
      progress: 100,
      completed: true,
      rarity: "rare",
      xpReward: 200,
      unlockedDate: "2024-01-22"
    },
    {
      id: 3,
      title: "Mindful Warrior",
      description: "Complete 10 meditation sessions",
      icon: Shield,
      category: "Mindfulness",
      progress: 70,
      completed: false,
      rarity: "epic",
      xpReward: 350,
      current: 7,
      target: 10
    },
    {
      id: 4,
      title: "Data Master",
      description: "Log health data for 30 consecutive days",
      icon: Target,
      category: "Tracking",
      progress: 43,
      completed: false,
      rarity: "legendary",
      xpReward: 500,
      current: 13,
      target: 30
    },
    {
      id: 5,
      title: "AI Companion",
      description: "Chat with MINDRA AI 25 times",
      icon: Rocket,
      category: "Interaction",
      progress: 88,
      completed: false,
      rarity: "rare",
      xpReward: 250,
      current: 22,
      target: 25
    },
    {
      id: 6,
      title: "Wellness Champion",
      description: "Achieve perfect wellness score for a week",
      icon: Crown,
      category: "Performance",
      progress: 0,
      completed: false,
      rarity: "mythic",
      xpReward: 1000,
      current: 0,
      target: 7
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", level: 24, xp: 45200, avatar: "🧠" },
    { rank: 2, name: "Maria Santos", level: 22, xp: 41800, avatar: "⚡" },
    { rank: 3, name: "You", level: 12, xp: 15750, avatar: "🎯", isUser: true },
    { rank: 4, name: "John Doe", level: 11, xp: 14200, avatar: "🔥" },
    { rank: 5, name: "Emma Wilson", level: 10, xp: 12900, avatar: "✨" },
  ];

  const dailyQuests = [
    {
      id: 1,
      title: "Morning Vitals Check",
      description: "Log your mood and energy levels",
      progress: 100,
      xpReward: 25,
      completed: true
    },
    {
      id: 2,
      title: "Hydration Goal",
      description: "Drink 8 glasses of water",
      progress: 62,
      xpReward: 30,
      completed: false,
      current: 5,
      target: 8
    },
    {
      id: 3,
      title: "Mindful Minutes",
      description: "Complete 10 minutes of meditation",
      progress: 0,
      xpReward: 40,
      completed: false,
      current: 0,
      target: 10
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-400 border-gray-400/30 bg-gray-400/10";
      case "rare": return "text-jarvis-cyan border-jarvis-cyan/30 bg-jarvis-cyan/10";
      case "epic": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      case "legendary": return "text-jarvis-gold border-jarvis-gold/30 bg-jarvis-gold/10";
      case "mythic": return "text-red-400 border-red-400/30 bg-red-400/10";
      default: return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };

  const tabs = [
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "quests", label: "Daily Quests", icon: Target },
    { id: "leaderboard", label: "Leaderboard", icon: Crown },
    { id: "stats", label: "Stats", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Jarvis Header */}
      <header className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/10 surface-panel">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-jarvis-gold transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 jarvis-card rounded-full flex items-center justify-center jarvis-glow-gold border-2 border-jarvis-gold/40">
              <Trophy className="h-6 w-6 text-jarvis-gold jarvis-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-jarvis-gold">Achievement Matrix</h1>
              <p className="text-xs text-muted-foreground font-exo">Gamified Wellness Progress</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-jarvis-gold" />
              <span className="text-sm font-orbitron text-jarvis-gold">Level {userLevel.current}</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {userLevel.xp}/{userLevel.nextLevelXp} XP
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Title & Level Progress */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-orbitron font-bold mb-2 bg-gradient-to-r from-jarvis-gold via-jarvis-cyan to-jarvis-blue bg-clip-text text-transparent">
              Wellness Achievement Hub
            </h2>
            <p className="text-muted-foreground font-exo">Level up your health journey and unlock exclusive rewards</p>
          </div>

          {/* User Level Card */}
          <Card className="jarvis-card border-2 border-jarvis-gold/30 jarvis-glow-gold mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 jarvis-card rounded-full flex items-center justify-center border-2 border-jarvis-gold/40">
                    <Crown className="h-8 w-8 text-jarvis-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-jarvis-gold">Level {userLevel.current}</h3>
                    <p className="text-jarvis-gold font-exo">{userLevel.rank}</p>
                    <p className="text-xs text-muted-foreground font-mono">Next: {userLevel.nextRank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono text-jarvis-gold">{userLevel.xp.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono">
                  <span>Progress to Level {userLevel.current + 1}</span>
                  <span>{userLevel.xp}/{userLevel.nextLevelXp}</span>
                </div>
                <Progress 
                  value={(userLevel.xp / userLevel.nextLevelXp) * 100} 
                  className="h-3 bg-jarvis-dark border border-jarvis-gold/30"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs with Better Visibility */}
        <Card className="mb-8 jarvis-card border-2 border-primary/30">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    variant="outline"
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-orbitron relative transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-jarvis-gold/20 to-jarvis-gold/10 border-jarvis-gold text-jarvis-gold jarvis-glow-gold shadow-[0_0_25px_rgba(255,199,0,0.6)] scale-105"
                        : "jarvis-border bg-card/30 hover:jarvis-glow-gold hover:text-jarvis-gold hover:border-jarvis-gold/60 hover:scale-102"
                    }`}
                  >
                    <IconComponent className="mr-2 h-4 w-4" />
                    {tab.label}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-jarvis-gold rounded-full shadow-[0_0_8px_rgba(255,199,0,0.8)]"></div>
                    )}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tab Content */}
        {activeTab === "achievements" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card 
                  key={achievement.id} 
                  className={`jarvis-card border-2 transition-all duration-300 hover:scale-105 floating-animation ${
                    achievement.completed 
                      ? `border-jarvis-gold/50 jarvis-glow-gold` 
                      : `border-primary/30 hover:jarvis-glow-cyan`
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.completed ? 'bg-jarvis-gold/20 border-2 border-jarvis-gold/40' : 'bg-primary/20 border-2 border-primary/40'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${achievement.completed ? 'text-jarvis-gold' : 'text-jarvis-cyan'}`} />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)} capitalize`}>
                          {achievement.rarity}
                        </Badge>
                        {achievement.completed && (
                          <Badge className="text-xs bg-jarvis-gold/20 text-jarvis-gold border-jarvis-gold/40">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className={`text-lg font-orbitron ${achievement.completed ? 'text-jarvis-gold' : 'text-foreground'}`}>
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 font-exo">{achievement.description}</p>
                    
                    {!achievement.completed && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm font-mono">
                          <span>Progress</span>
                          <span>{achievement.current}/{achievement.target}</span>
                        </div>
                        <Progress 
                          value={achievement.progress} 
                          className="h-2 bg-jarvis-dark border border-primary/30"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-jarvis-gold" />
                        <span className="text-jarvis-gold font-mono text-sm">+{achievement.xpReward} XP</span>
                      </div>
                      
                      {achievement.completed && (
                        <div className="text-xs text-muted-foreground font-mono">
                          {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "quests" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {dailyQuests.map((quest, index) => (
              <Card 
                key={quest.id} 
                className={`jarvis-card border-2 transition-all duration-300 ${
                  quest.completed 
                    ? 'border-jarvis-green/50 jarvis-glow-green' 
                    : 'border-primary/30 hover:jarvis-glow-cyan'
                } floating-animation`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        quest.completed ? 'bg-jarvis-green/20 border-2 border-jarvis-green/40' : 'bg-primary/20 border-2 border-primary/40'
                      }`}>
                        <Target className={`h-5 w-5 ${quest.completed ? 'text-jarvis-green' : 'text-jarvis-cyan'}`} />
                      </div>
                      <div>
                        <h3 className="font-orbitron font-semibold">{quest.title}</h3>
                        <p className="text-sm text-muted-foreground font-exo">{quest.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-jarvis-gold" />
                      <span className="text-jarvis-gold font-mono">+{quest.xpReward}</span>
                    </div>
                  </div>

                  {!quest.completed && quest.current !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-mono">
                        <span>Progress</span>
                        <span>{quest.current}/{quest.target}</span>
                      </div>
                      <Progress 
                        value={quest.progress} 
                        className="h-3 bg-jarvis-dark border border-primary/30"
                      />
                    </div>
                  )}

                  {quest.completed && (
                    <div className="flex items-center justify-center space-x-2 text-jarvis-green">
                      <Star className="h-4 w-4" />
                      <span className="font-orbitron font-semibold">Quest Complete!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <Card className="jarvis-card border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Crown className="h-5 w-5 text-jarvis-gold" />
                <span>Global Wellness Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      user.isUser 
                        ? 'bg-jarvis-cyan/10 border border-jarvis-cyan/30 jarvis-glow-cyan' 
                        : 'bg-card/50 hover:bg-card/70'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold ${
                        user.rank === 1 ? 'bg-jarvis-gold text-jarvis-dark' :
                        user.rank === 2 ? 'bg-gray-400 text-jarvis-dark' :
                        user.rank === 3 ? 'bg-amber-600 text-jarvis-dark' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className={`font-orbitron font-semibold ${user.isUser ? 'text-jarvis-cyan' : ''}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-muted-foreground font-exo">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-jarvis-gold">{user.xp.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "stats" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="jarvis-card border-2 border-jarvis-cyan/30 hover:jarvis-glow-cyan transition-all">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-jarvis-cyan mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold text-jarvis-cyan">8</div>
                <div className="text-sm text-muted-foreground font-exo">Achievements</div>
              </CardContent>
            </Card>
            
            <Card className="jarvis-card border-2 border-jarvis-gold/30 hover:jarvis-glow-gold transition-all">
              <CardContent className="p-6 text-center">
                <Flame className="h-8 w-8 text-jarvis-gold mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold text-jarvis-gold">23</div>
                <div className="text-sm text-muted-foreground font-exo">Current Streak</div>
              </CardContent>
            </Card>
            
            <Card className="jarvis-card border-2 border-jarvis-green/30 hover:jarvis-glow-green transition-all">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-jarvis-green mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold text-jarvis-green">47</div>
                <div className="text-sm text-muted-foreground font-exo">Days Active</div>
              </CardContent>
            </Card>
            
            <Card className="jarvis-card border-2 border-purple-400/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
              <CardContent className="p-6 text-center">
                <Gem className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold text-purple-400">3</div>
                <div className="text-sm text-muted-foreground font-exo">Rare Badges</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gamification;
