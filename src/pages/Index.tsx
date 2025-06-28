
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, TrendingUp, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">MindMate</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your Personal
            <span className="text-blue-600"> Mental Health</span>
            <br />
            Companion
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Track your mood, discover personalized self-care suggestions, and build healthy habits
            with AI-powered insights and gentle gamification.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/mood-checkin" className="transform hover:scale-105 transition-transform">
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Mood Check-In</h3>
                  <p className="text-gray-600">Track how you're feeling today</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard" className="transform hover:scale-105 transition-transform">
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">View Dashboard</h3>
                  <p className="text-gray-600">See your progress and insights</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/chatbot" className="transform hover:scale-105 transition-transform">
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Chat with AI</h3>
                  <p className="text-gray-600">Get supportive guidance anytime</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="space-y-4">
            <Link to="/mood-checkin">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                Get Started - It's Free
              </Button>
            </Link>
            <p className="text-sm text-gray-500">No credit card required • Start anonymously</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything You Need for Better Mental Health
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Daily Check-ins</h4>
              <p className="text-gray-600 text-sm">Track mood, stress, and energy levels</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI Suggestions</h4>
              <p className="text-gray-600 text-sm">Personalized self-care activities</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Progress Tracking</h4>
              <p className="text-gray-600 text-sm">Visualize your mental health journey</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">AI chatbot for instant help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
