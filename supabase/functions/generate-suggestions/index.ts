
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mood, stressLevel, userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let suggestions = [];

    if (openAIApiKey) {
      // Generate AI-powered suggestions using OpenAI
      const prompt = `Generate 3 personalized self-care suggestions for someone feeling ${mood} with stress level ${stressLevel}/10. 
      
      Format each suggestion as a JSON object with:
      - type: category (breathing, exercise, mindfulness, creative, social, rest)
      - title: brief title
      - description: 2-3 sentence description
      - duration: estimated time (e.g., "5 minutes", "15 minutes")
      
      Return only a JSON array of these 3 objects, no other text.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful mental health assistant that provides personalized self-care suggestions. Always respond with valid JSON only.' 
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        try {
          const parsedSuggestions = JSON.parse(aiResponse);
          suggestions = Array.isArray(parsedSuggestions) ? parsedSuggestions : [parsedSuggestions];
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          // Fall back to default suggestions if parsing fails
        }
      }
    }

    // Fallback to default suggestions if OpenAI is not available or failed
    if (suggestions.length === 0) {
      const defaultSuggestions = {
        happy: [
          { type: 'social', title: 'Share your joy', description: 'Call a friend or family member to share your positive mood. Spreading happiness can amplify your own joy.', duration: '10 minutes' },
          { type: 'creative', title: 'Creative expression', description: 'Channel your positive energy into a creative activity like drawing, writing, or playing music.', duration: '20 minutes' },
          { type: 'exercise', title: 'Energizing walk', description: 'Take a brisk walk outside to maintain your positive energy and get some fresh air.', duration: '15 minutes' }
        ],
        calm: [
          { type: 'mindfulness', title: 'Meditation practice', description: 'Enjoy a peaceful meditation session to maintain your sense of calm and centeredness.', duration: '10 minutes' },
          { type: 'creative', title: 'Gentle journaling', description: 'Write down your thoughts and feelings in a journal to preserve this peaceful moment.', duration: '15 minutes' },
          { type: 'rest', title: 'Mindful tea time', description: 'Prepare and slowly enjoy a cup of herbal tea while being fully present in the moment.', duration: '10 minutes' }
        ],
        anxious: [
          { type: 'breathing', title: 'Deep breathing exercise', description: 'Practice the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. Repeat 4 times.', duration: '5 minutes' },
          { type: 'mindfulness', title: 'Grounding technique', description: 'Use the 5-4-3-2-1 technique: notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.', duration: '5 minutes' },
          { type: 'exercise', title: 'Gentle movement', description: 'Do some light stretching or yoga to release physical tension and calm your mind.', duration: '10 minutes' }
        ],
        sad: [
          { type: 'social', title: 'Reach out to someone', description: 'Connect with a trusted friend or family member. Sometimes sharing your feelings can provide comfort.', duration: '15 minutes' },
          { type: 'creative', title: 'Express through art', description: 'Draw, paint, or write about your feelings. Creative expression can be therapeutic and healing.', duration: '20 minutes' },
          { type: 'rest', title: 'Self-compassion break', description: 'Practice self-kindness. Treat yourself with the same compassion you would show a good friend.', duration: '10 minutes' }
        ],
        angry: [
          { type: 'exercise', title: 'Physical release', description: 'Do some vigorous exercise like jumping jacks, push-ups, or go for a run to release pent-up energy.', duration: '15 minutes' },
          { type: 'breathing', title: 'Cooling breath', description: 'Practice slow, deep breathing to cool down your anger. Count to 10 with each breath.', duration: '5 minutes' },
          { type: 'creative', title: 'Write it out', description: 'Write down what made you angry in detail, then tear up the paper as a symbolic release.', duration: '10 minutes' }
        ],
        neutral: [
          { type: 'mindfulness', title: 'Mindful observation', description: 'Spend a few minutes observing your surroundings mindfully. Notice details you usually miss.', duration: '10 minutes' },
          { type: 'exercise', title: 'Energizing activity', description: 'Do something that brings you energy - dance to your favorite song or take a short walk.', duration: '10 minutes' },
          { type: 'creative', title: 'Try something new', description: 'Learn something new or try a small creative project to add some spark to your day.', duration: '15 minutes' }
        ]
      };

      suggestions = defaultSuggestions[mood as keyof typeof defaultSuggestions] || defaultSuggestions.neutral;
    }

    // Save suggestions to database
    const suggestionPromises = suggestions.map(async (suggestion: any) => {
      const { error } = await supabase
        .from('ai_suggestions')
        .insert({
          user_id: userId,
          suggestion_type: suggestion.type,
          suggestion_text: JSON.stringify({
            title: suggestion.title,
            description: suggestion.description,
            duration: suggestion.duration
          })
        });
      
      if (error) {
        console.error('Error saving suggestion:', error);
      }
      
      return suggestion;
    });

    const savedSuggestions = await Promise.all(suggestionPromises);

    return new Response(
      JSON.stringify({ suggestions: savedSuggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-suggestions function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
