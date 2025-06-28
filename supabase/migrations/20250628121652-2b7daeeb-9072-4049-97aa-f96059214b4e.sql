
-- Create profiles table that automatically gets populated when users sign up
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create mood_logs table
CREATE TABLE public.mood_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create stress_logs table
CREATE TABLE public.stress_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10) NOT NULL,
  trigger_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ai_suggestions table
CREATE TABLE public.ai_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  suggestion_type TEXT NOT NULL,
  suggestion_text TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create chat_history table
CREATE TABLE public.chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  message_text TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create streaks table
CREATE TABLE public.streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  last_checkin DATE,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for mood_logs
CREATE POLICY "Users can view own mood logs" ON public.mood_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood logs" ON public.mood_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood logs" ON public.mood_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood logs" ON public.mood_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for stress_logs
CREATE POLICY "Users can view own stress logs" ON public.stress_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stress logs" ON public.stress_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stress logs" ON public.stress_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stress logs" ON public.stress_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ai_suggestions
CREATE POLICY "Users can view own ai suggestions" ON public.ai_suggestions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ai suggestions" ON public.ai_suggestions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ai suggestions" ON public.ai_suggestions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ai suggestions" ON public.ai_suggestions
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for chat_history
CREATE POLICY "Users can view own chat history" ON public.chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat history" ON public.chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat history" ON public.chat_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history" ON public.chat_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for streaks
CREATE POLICY "Users can view own streaks" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks" ON public.streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.streaks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own streaks" ON public.streaks
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Initialize streak record for new user
  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (new.id, 0, 0);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile and streak when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
