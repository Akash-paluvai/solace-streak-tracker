
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mood-checkin" element={<MoodCheckIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
