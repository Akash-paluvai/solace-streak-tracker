
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState([5]);
  const [energyLevel, setEnergyLevel] = useState([5]);
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const moods = [
    { emoji: "😢", label: "Sad", value: 1, color: "text-blue-500" },
    { emoji: "😟", label: "Down", value: 2, color: "text-blue-400" },
    { emoji: "😐", label: "Okay", value: 3, color: "text-gray-500" },
    { emoji: "🙂", label: "Good", value: 4, color: "text-green-400" },
    { emoji: "😊", label: "Great", value: 5, color: "text-green-500" },
  ];

  const handleSubmit = async () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to continue",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    try {
      console.log("Mood check-in data:", {
        mood: selectedMood,
        stressLevel: stressLevel[0],
        energyLevel: energyLevel[0],
        sleepQuality: sleepQuality[0],
        note,
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "Check-in completed! 🎉",
        description: "You earned 10 XP. Keep up the great work!",
      });

      navigate("/suggestions");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center">
        <Link to="/" className="flex items-center space-x-2 mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">MindMate</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling today?</h2>
          <p className="text-gray-600">Take a moment to check in with yourself</p>
        </div>

        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Select Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:scale-102"
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Stress Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={stressLevel}
                  onValueChange={setStressLevel}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low</span>
                  <span className="font-medium">{stressLevel[0]}/10</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Energy Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={energyLevel}
                  onValueChange={setEnergyLevel}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low</span>
                  <span className="font-medium">{energyLevel[0]}/10</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Sleep Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={sleepQuality}
                  onValueChange={setSleepQuality}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Poor</span>
                  <span className="font-medium">{sleepQuality[0]}/10</span>
                  <span>Great</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How are you feeling? What's on your mind today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-24 resize-none"
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="px-12 py-6 text-lg bg-blue-600 hover:bg-blue-700"
          >
            Complete Check-In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckIn;
