// MindraAssistant.tsx

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, Minimize2, Maximize2, MessageCircle, Zap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "mindra";
  timestamp: Date;
}

interface MindraAssistantProps {
  className?: string;
}

export const MindraAssistant = ({ className }: MindraAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MINDRA, your personal mental health companion. I'm here to help you track your mood, manage stress, and maintain healthy daily routines. How are you feeling today?",
      sender: "mindra",
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

const getMindraResponse = async (userMessage: string): Promise<string> => {
  try {
    console.log("✅ Model being used:", import.meta.env.VITE_OPENROUTER_API_MODEL);

    const response = await fetch(import.meta.env.VITE_OPENROUTER_API_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Or your live domain
        "X-Title": "MindRa", // Optional but good for OpenRouter usage tracking
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_OPENROUTER_API_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are MindRa, an emotionally intelligent AI assistant built to help users with mental health support in a warm and friendly way.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        
      }),
      
    });

    const data = await response.json();
    console.log("🔍 Full API response:", data); // Log the full response

    if (response.ok && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.error("❌ OpenRouter error:", data);
      return "Oops! Something went wrong while fetching response.";
    }
  } catch (error) {
    console.error("❗ MINDRA API exception:", error);
    return "Oops! Something went wrong.";
  }
};

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const reply = await getMindraResponse(inputText);
      const mindraResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "mindra",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, mindraResponse]);
    } catch (err) {
      console.error("Failed to get MINDRA reply", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full jarvis-button mindra-glow hover:mindra-active border-2 border-jarvis-cyan/60 bg-jarvis-dark/90 backdrop-blur-lg"
        >
          <Bot className="h-8 w-8 text-jarvis-cyan" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card
        className={cn(
          "jarvis-card border-2 border-jarvis-cyan/40 shadow-[0_0_30px_rgba(0,255,247,0.3)]",
          isMinimized ? "w-80 h-14" : "w-96 h-[500px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-jarvis-cyan/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-jarvis-cyan/20 flex items-center justify-center border border-jarvis-cyan/50">
              <Bot className="h-5 w-5 text-jarvis-cyan mindra-glow" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-jarvis-cyan text-sm">MINDRA</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-jarvis-green rounded-full animate-pulse"></div>
                <span className="text-xs text-jarvis-green font-mono">Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-jarvis-cyan hover:text-jarvis-aqua"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-jarvis-cyan hover:text-red-400"
            >
              ×
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-jarvis-cyan/20 text-white border border-jarvis-cyan/40"
                        : "bg-jarvis-surface/80 text-jarvis-cyan border border-jarvis-cyan/30"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "mindra" && (
                        <Bot className="h-4 w-4 text-jarvis-cyan mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-jarvis-surface/80 border border-jarvis-cyan/30 max-w-xs px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-jarvis-cyan" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-jarvis-cyan rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-jarvis-cyan rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-jarvis-cyan rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <CardContent className="p-4 border-t border-jarvis-cyan/30">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share with MINDRA..."
                  className="flex-1 jarvis-input bg-jarvis-dark/50 border-jarvis-cyan/40 text-white placeholder-gray-400 focus:border-jarvis-cyan focus:ring-jarvis-cyan/50"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="jarvis-button bg-jarvis-cyan/20 hover:bg-jarvis-cyan/30 border-jarvis-cyan/50"
                >
                  <Send className="h-4 w-4 text-jarvis-cyan" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Heart className="h-3 w-3 text-jarvis-green" />
                  <span className="text-xs text-jarvis-green font-mono">Mental Health Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-jarvis-cyan" />
                  <span className="text-xs text-jarvis-cyan font-mono">AI Powered</span>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};
