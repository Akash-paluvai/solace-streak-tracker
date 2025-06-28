
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, Star, Trophy, Calendar, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Gamification = () => {
  const userLevel = {
    current: 3,
    xp: 340,
    xpToNext: 60,
    totalXpForNext: 400,
  };

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first mood check-in",
      icon: "👶",
      earned: true,
      earnedDate: "2 weeks ago",
      xp: 10,
    },
    {
      id: 2,
      name: "Consistent Spirit",
      description: "Complete 7 consecutive check-ins",
      icon: "🏆",
      earned: true,
      earnedDate: "3 days ago",
      xp: 50,
    },
    {
      id: 3,
      name: "Self-Care Champion",
      description: "Complete 20 suggested activities",
      icon: "🌟",
      earned: true,
      earnedDate: "1 day ago",
      xp: 100,
    },
    {
      id: 4,
      name: "Mindful Master",
      description: "Complete 50 meditation sessions",
      icon: "🧘‍♀️",
      earned: false,
      progress: 32,
      total: 50,
      xp: 200,
    },
    {
      id: 5,
      name: "Wellness Warrior",
      description: "Maintain a 30-day streak",
      icon: "⚔️",
      earned: false,
      progress: 7,
      total: 30,
      xp: 300,
    },
    {
      id: 6,
      name: "Mental Health Advocate",
      description: "Help 5 friends join MindMate",
      icon: "🤝",
      earned: false,
      progress: 0,
      total: 5,
      xp: 150,
    },
  ];

  const streakData = {
    current: 7,
    longest: 14,
    total: 24,
  };

  const weeklyChallenge = {
    name: "Mindful Week",
    description: "Complete a mindfulness activity each day this week",
    progress: 4,
    total: 7,
    reward: "50 XP + Zen Master badge",
    daysLeft: 3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center">
        <Link to="/dashboard" className="flex items-center space-x-2 mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <h1 className="text-xl font-bold text-gray-800">Your Achievements</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Level Progress */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Level {userLevel.current}</h2>
                <p className="text-blue-100">Mental Health Explorer</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{userLevel.xp} XP</div>
                <div className="text-blue-100">{userLevel.xpToNext} to next level</div>
              </div>
            </div>
            <Progress 
              value={(userLevel.xp / userLevel.totalXpForNext) * 100} 
              className="h-3 bg-blue-400"
            />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Streak Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span>Streak Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">{streakData.current}</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{streakData.longest}</div>
                      <div className="text-xs text-gray-600">Longest</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{streakData.total}</div>
                      <div className="text-xs text-gray-600">Total Check-ins</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span>Weekly Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{weeklyChallenge.name}</h3>
                    <p className="text-sm text-gray-600">{weeklyChallenge.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                    </div>
                    <Progress value={(weeklyChallenge.progress / weeklyChallenge.total) * 100} />
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      🎁 {weeklyChallenge.reward}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{weeklyChallenge.daysLeft} days left</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? "bg-yellow-50 border-yellow-200 shadow-md"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${
                              achievement.earned ? "text-yellow-800" : "text-gray-600"
                            }`}>
                              {achievement.name}
                            </h3>
                            <p className={`text-sm ${
                              achievement.earned ? "text-yellow-700" : "text-gray-500"
                            }`}>
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <p className="text-xs text-yellow-600 mt-1">
                                Earned {achievement.earnedDate}
                              </p>
                            ) : achievement.progress !== undefined ? (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/{achievement.total}</span>
                                </div>
                                <Progress value={(achievement.progress / achievement.total!) * 100} className="h-1" />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <Badge
                          variant={achievement.earned ? "default" : "outline"}
                          className={achievement.earned ? "bg-yellow-600" : ""}
                        >
                          {achievement.xp} XP
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-x-4">
          <Link to="/mood-checkin">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Complete Check-in (+10 XP)
            </Button>
          </Link>
          <Link to="/suggestions">
            <Button variant="outline">
              Browse Activities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
