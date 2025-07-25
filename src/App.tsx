import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ParticleBackground } from "@/components/ParticleBackground";
import { MindraAssistant } from "@/components/MindraAssistant";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import MoodCheckIn from "./pages/MoodCheckIn";
import Dashboard from "./pages/Dashboard";
import Suggestions from "./pages/Suggestions";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import Gamification from "./pages/Gamification";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import NeuralBreathingPage from "./pages/NeuralBreathing"; 
import GratitudeMatrixPage from "./pages/GratitudeMatrix";
import ComingSoon from "./pages/ComingSoon";




const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <ParticleBackground />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mood-checkin" element={
                <ProtectedRoute>
                  <MoodCheckIn />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/suggestions" element={
                <ProtectedRoute>
                  <Suggestions />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              } />
              <Route path="/gamification" element={
                <ProtectedRoute>
                  <Gamification />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />

<Route path="/activity/neural-breathing" element={
  <ProtectedRoute>
    <NeuralBreathingPage/>
  </ProtectedRoute>
} />


<Route path="/activity/gratitude-matrix" element={
  <ProtectedRoute>
    <GratitudeMatrixPage/>
  </ProtectedRoute>
} />

<Route path="/activity/progressive-muscle" element={
  <ProtectedRoute>
    <ComingSoon  />
  </ProtectedRoute>
} />

<Route path="/activity/binaural-meditation" element={
  <ProtectedRoute>
    <ComingSoon  />
  </ProtectedRoute>
} />
<Route path="/activity/flexibility" element={
  <ProtectedRoute>
    <ComingSoon  />
  </ProtectedRoute>
} />
<Route path="/activity/neural-reinforcement" element={
  <ProtectedRoute>
    <ComingSoon />
  </ProtectedRoute>
} />



            </Routes>
            {/* MINDRA AI Assistant - Available globally */}
            <MindraAssistant />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
