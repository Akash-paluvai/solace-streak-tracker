
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock AI-generated suggestions based on mood
  const mockSuggestions = [
    {
      id: 1,
      title: "5-Minute Deep Breathing",
      description: "A calming breathing exercise to reduce stress and center your mind",
      duration: "5 min",
      category: "Mindfulness",
      difficulty: "Easy",
      icon: "🫁",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: 2,
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today",
      duration: "10 min",
      category: "Reflection",
      difficulty: "Easy",
      icon: "📝",
      color: "bg-green-50 border-green-200",
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "Systematically tense and relax different muscle groups",
      duration: "15 min",
      category: "Relaxation",
      difficulty: "Medium",
      icon: "💪",
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: 4,
      title: "Nature Sounds Meditation",
      description: "Listen to calming nature sounds while focusing on your breath",
      duration: "20 min",
      category: "Meditation",
      difficulty: "Easy",
      icon: "🌿",
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      id: 5,
      title: "Gentle Stretching",
      description: "Simple stretches to release tension and improve mood",
      duration: "12 min",
      category: "Movement",
      difficulty: "Easy",
      icon: "🧘‍♀️",
      color: "bg-pink-50 border-pink-200",
    },
    {
      id: 6,
      title: "Positive Affirmations",
      description: "Practice self-compassion with guided positive affirmations",
      duration: "8 min",
      category: "Self-Care",
      difficulty: "Easy",
      icon: "✨",
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  useEffect(() => {
    // Simulate API call to get personalized suggestions
    const fetchSuggestions = async () => {
      setLoading(true);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuggestions(mockSuggestions);
      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  const handleStartActivity = (suggestion: any) => {
    console.log("Starting activity:", suggestion.title);
    // Here you would typically start a timer or navigate to activity details
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating personalized suggestions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center">
        <Link to="/mood-checkin" className="flex items-center space-x-2 mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">MindMate</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Personalized Self-Care</h2>
          <p className="text-gray-600">Based on your current mood and stress level, here are some activities to help you feel better</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className={`${suggestion.color} border-2 hover:shadow-lg transition-all hover:scale-105`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{suggestion.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{suggestion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{suggestion.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{suggestion.difficulty}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartActivity(suggestion)}
                  className="w-full bg-white/80 text-gray-800 border border-gray-200 hover:bg-white hover:shadow-md"
                  variant="outline"
                >
                  Start Activity
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/dashboard">
            <Button size="lg" className="px-8 py-6 bg-blue-600 hover:bg-blue-700">
              View Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
