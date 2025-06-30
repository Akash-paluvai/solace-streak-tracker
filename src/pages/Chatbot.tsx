
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Send, Bot, User, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Jarvis-powered MindMate AI companion. I'm here to listen and support you on your health quest. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI responses with Jarvis personality
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I'm analyzing your input, and I want you to know that your feelings are completely valid. Can you tell me more about what's happening in your world?",
      "Based on my assessment, that sounds challenging. Remember, experiencing these emotions is part of the human condition. What coping strategies have proven effective for you in the past?",
      "Thank you for sharing that data with me. It takes courage to be vulnerable. How can I optimize my support for you right now?",
      "I'm glad you're prioritizing your mental health by checking in. What's one small action that might bring you comfort in this moment?",
      "Your wellbeing is my primary directive. Have you experimented with any breathing protocols or mindfulness techniques recently?",
      "It's completely normal to experience fluctuations. What area would you like to focus on improving today?",
      "I appreciate your transparency. Remember, incremental progress is still progress. What's one positive element from your day?",
      "You're demonstrating courage by reaching out. Is there a particular domain of your life that's been occupying your thoughts?",
    ];
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depressed")) {
      return "I'm detecting emotional distress in your input. Remember that these feelings are temporary states, not permanent conditions. You're not alone in this journey. Would you like me to suggest a mood-boosting protocol?";
    }
    
    if (lowerMessage.includes("anxious") || lowerMessage.includes("worried") || lowerMessage.includes("stress")) {
      return "I'm reading elevated stress indicators. Let's implement a systematic approach to manage this. Would you like to activate a breathing exercise protocol to help stabilize your neural state?";
    }
    
    if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great")) {
      return "Excellent! I'm detecting positive emotional markers. It's wonderful that you're in an optimal state. What factors are contributing to these positive feelings?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate Jarvis processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 hud-grid">
      {/* Jarvis Header */}
      <header className="p-6 flex items-center border-b border-primary/10 surface-panel">
        <Link to="/dashboard" className="flex items-center space-x-2 mr-4">
          <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-jarvis-blue transition-colors" />
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 jarvis-card rounded-full flex items-center justify-center border-2 border-jarvis-blue/40">
            <Bot className="h-6 w-6 text-jarvis-blue jarvis-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-orbitron font-bold jarvis-text">Jarvis MindMate AI</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-jarvis-blue rounded-full animate-pulse"></div>
              <p className="text-sm text-jarvis-blue font-mono">Online & Ready to Assist</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-120px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-jarvis-blue/80 to-jarvis-blue text-white jarvis-glow-blue"
                    : "ai-chat-bubble text-foreground"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && (
                    <Bot className="h-4 w-4 text-jarvis-blue mt-1 flex-shrink-0 jarvis-pulse" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <User className="h-4 w-4 text-blue-100 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Jarvis Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="ai-chat-bubble max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-jarvis-blue jarvis-pulse" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-jarvis-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-jarvis-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-jarvis-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-xs text-jarvis-blue font-mono">Processing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Jarvis Input Area */}
        <div className="p-6 border-t border-primary/10 surface-panel">
          <div className="flex space-x-4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Speak to Jarvis..."
              className="flex-1 jarvis-border bg-card/50 backdrop-blur-sm focus:jarvis-glow-blue transition-all font-exo"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-jarvis-blue to-jarvis-blue/80 hover:jarvis-glow-blue jarvis-border"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground font-exo">
              Jarvis AI • Responses are for support only and don't replace professional help
            </p>
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-jarvis-gold" />
              <span className="text-xs text-jarvis-gold font-mono">Powered by Advanced AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
