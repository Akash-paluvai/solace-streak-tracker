
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ArrowLeft, TrendingUp, BarChart3, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");

  const moodData = [
    { date: "Jan 1", mood: 3, stress: 6, energy: 4, sleep: 7 },
    { date: "Jan 2", mood: 4, stress: 4, energy: 6, sleep: 8 },
    { date: "Jan 3", mood: 3, stress: 7, energy: 3, sleep: 5 },
    { date: "Jan 4", mood: 5, stress: 3, energy: 8, sleep: 9 },
    { date: "Jan 5", mood: 4, stress: 5, energy: 6, sleep: 7 },
    { date: "Jan 6", mood: 5, stress: 2, energy: 9, sleep: 8 },
    { date: "Jan 7", mood: 4, stress: 4, energy: 7, sleep: 8 },
  ];

  const moodDistribution = [
    { name: "Great", value: 30, color: "#10b981" },
    { name: "Good", value: 40, color: "#84cc16" },
    { name: "Okay", value: 20, color: "#eab308" },
    { name: "Down", value: 8, color: "#f97316" },
    { name: "Sad", value: 2, color: "#ef4444" },
  ];

  const weeklyPatterns = [
    { day: "Mon", avgMood: 3.2, avgStress: 6.8 },
    { day: "Tue", avgMood: 3.8, avgStress: 5.2 },
    { day: "Wed", avgMood: 3.5, avgStress: 6.5 },
    { day: "Thu", avgMood: 4.2, avgStress: 4.8 },
    { day: "Fri", avgMood: 4.5, avgStress: 4.2 },
    { day: "Sat", avgMood: 4.8, avgStress: 3.5 },
    { day: "Sun", avgMood: 4.2, avgStress: 4.0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2 mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Analytics</h1>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Mental Health Insights</h2>
          <p className="text-gray-600">Track your progress and identify patterns in your mental wellbeing</p>
        </div>

        <Tabs defaultValue="trends" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Main Trends Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Mood & Wellness Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} name="Mood" />
                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} name="Stress" />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} name="Energy" />
                    <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={3} name="Sleep Quality" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mood Distribution */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={moodDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {moodDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Average Mood</span>
                      <span className="text-xl font-bold text-blue-600">4.1/5</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Average Stress</span>
                      <span className="text-xl font-bold text-red-600">4.3/10</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Average Energy</span>
                      <span className="text-xl font-bold text-green-600">6.1/10</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Sleep Quality</span>
                      <span className="text-xl font-bold text-purple-600">7.4/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Weekly Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 10]} />
                    <Tooltip />
                    <Bar dataKey="avgMood" fill="#3b82f6" name="Average Mood" />
                    <Bar dataKey="avgStress" fill="#ef4444" name="Average Stress" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Best Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Saturday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">4.8/5</span>
                        <span className="text-2xl">😊</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Friday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">4.5/5</span>
                        <span className="text-2xl">🙂</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thursday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">4.2/5</span>
                        <span className="text-2xl">🙂</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Challenging Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Monday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600 font-medium">3.2/5</span>
                        <span className="text-2xl">😐</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wednesday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600 font-medium">3.5/5</span>
                        <span className="text-2xl">😐</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tuesday</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600 font-medium">3.8/5</span>
                        <span className="text-2xl">🙂</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Positive Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">Improving Sleep Quality</div>
                      <div className="text-sm text-green-600">Your sleep quality has improved by 23% this week</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Consistent Check-ins</div>
                      <div className="text-sm text-blue-600">You've maintained a 7-day streak!</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800">Weekend Wellness</div>
                      <div className="text-sm text-purple-600">Your mood is consistently better on weekends</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <div className="font-medium text-yellow-800">Monday Blues</div>
                      <div className="text-sm text-yellow-700">Consider planning something enjoyable for Monday evenings</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <div className="font-medium text-orange-800">Stress Management</div>
                      <div className="text-sm text-orange-700">Try our breathing exercises when stress levels are high</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div className="font-medium text-green-800">Keep It Up</div>
                      <div className="text-sm text-green-700">Your weekend routine seems to work well - maintain it!</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
