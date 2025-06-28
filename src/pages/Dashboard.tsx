
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, TrendingUp, Calendar, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock data
  const userStats = {
    currentStreak: 7,
    totalXP: 340,
    level: 3,
    xpToNextLevel: 60,
    totalCheckIns: 24,
    badges: [
      { name: "First Week", icon: "🏆", earned: true },
      { name: "Consistent", icon: "📅", earned: true },
      { name: "Mindful", icon: "🧘‍♀️", earned: false },
      { name: "Resilient", icon: "💪", earned: false },
    ],
  };

  const moodData = [
    { day: "Mon", mood: 3, stress: 6 },
    { day: "Tue", mood: 4, stress: 4 },
    { day: "Wed", mood: 3, stress: 7 },
    { day: "Thu", mood: 5, stress: 3 },
    { day: "Fri", mood: 4, stress: 5 },
    { day: "Sat", mood: 5, stress: 2 },
    { day: "Sun", mood: 4, stress: 4 },
  ];

  const recentActivities = [
    { activity: "Deep Breathing", time: "2 hours ago", xp: 20 },
    { activity: "Mood Check-in", time: "Today", xp: 10 },
    { activity: "Gratitude Journal", time: "Yesterday", xp: 15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">MindMate Dashboard</h1>
          </div>
        </div>
        <Link to="/mood-checkin">
          <Button className="bg-blue-600 hover:bg-blue-700">
            New Check-in
          </Button>
        </Link>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Good morning! 🌅</h2>
          <p className="text-gray-600">Here's how you're doing on your mental health journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userStats.totalXP}</div>
              <p className="text-xs text-muted-foreground">Level {userStats.level}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-ins</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{userStats.totalCheckIns}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <p className="text-xs text-muted-foreground">To next level</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Weekly Mood & Stress Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 10]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Mood"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Stress"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress & Badges */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Level Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Level {userStats.level}</span>
                    <span>{userStats.xpToNextLevel} XP to next level</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalXP}</div>
                    <div className="text-sm text-gray-600">Total XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {userStats.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        badge.earned 
                          ? "bg-yellow-50 border-2 border-yellow-200" 
                          : "bg-gray-50 border-2 border-gray-200 opacity-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activities */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{activity.activity}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                  <Badge variant="secondary">+{activity.xp} XP</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link to="/suggestions">
            <Button variant="outline" className="w-full h-16 text-lg">
              Get Suggestions
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" className="w-full h-16 text-lg">
              View Analytics
            </Button>
          </Link>
          <Link to="/chatbot">
            <Button variant="outline" className="w-full h-16 text-lg">
              Chat with AI
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
