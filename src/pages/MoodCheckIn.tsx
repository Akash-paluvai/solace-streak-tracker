
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [stressLevel, setStressLevel] = useState([5]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😢", label: "Sad", value: "sad" },
    { emoji: "😠", label: "Angry", value: "angry" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to submit a mood check-in",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Submit mood log
      const { error: moodError } = await supabase
        .from('mood_logs')
        .insert({
          user_id: user.id,
          mood: selectedMood,
          note: note || null
        });

      if (moodError) throw moodError;

      // Submit stress log
      const { error: stressError } = await supabase
        .from('stress_logs')
        .insert({
          user_id: user.id,
          stress_level: stressLevel[0],
          trigger_note: note || null
        });

      if (stressError) throw stressError;

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const { data: existingStreak } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existingStreak) {
        const lastCheckin = existingStreak.last_checkin;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = 1;
        if (lastCheckin === yesterdayStr) {
          newStreak = existingStreak.current_streak + 1;
        } else if (lastCheckin !== today) {
          newStreak = 1;
        } else {
          newStreak = existingStreak.current_streak;
        }

        const { error: streakError } = await supabase
          .from('streaks')
          .update({
            current_streak: newStreak,
            last_checkin: today,
            longest_streak: Math.max(newStreak, existingStreak.longest_streak)
          })
          .eq('user_id', user.id);

        if (streakError) throw streakError;
      }

      toast({
        title: "Check-in completed! 🎉",
        description: "Your mood and stress levels have been recorded",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error('Error submitting check-in:', error);
      toast({
        title: "Failed to submit check-in",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-700">MindMate</span>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-gray-800">
              Daily Mood Check-In
            </CardTitle>
            <p className="text-center text-gray-600">
              How are you feeling today?
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mood Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Select Your Mood</h3>
                <div className="grid grid-cols-3 gap-4">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-center hover:scale-105 ${
                        selectedMood === mood.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Stress Level</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Low (1)</span>
                    <span>Current: {stressLevel[0]}</span>
                    <span>High (10)</span>
                  </div>
                  <Slider
                    value={stressLevel}
                    onValueChange={setStressLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Optional Note */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Notes (Optional)
                </h3>
                <Textarea
                  placeholder="Anything specific you'd like to note about your mood or day?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Complete Check-In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodCheckIn;
