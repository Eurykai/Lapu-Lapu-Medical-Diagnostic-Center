import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Phone, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Mabuhay! Welcome to the **Lapu-Lapu Medical Diagnostic Center (LLMDCI)** Virtual Care desk. I am your responsive AI Health Assistant.\n\nAsk me about:\n• Fasting preparation timelines (FBS, Lipids)\n• Official prices (Chest X-Ray ₱250, OGTT ₱910, HbA1c ₱675)\n• Ultrasound scheduling in Lapu-Lapu City\n\nHow can I help you prepare today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "Check X-Ray Price", prompt: "How much is your Chest X-ray CXR-PA and PNS X-ray?" },
    { label: "Fasting rules for FBS", prompt: "What are the fasting rules and hours for Fats/Lipid profile and Fasting Blood Sugar?" },
    { label: "Do you have Spirometry?", prompt: "Do you have a Bronchodilator Spirometry or D-Dimer test?" },
    { label: "Pregnancy OGTT Fee", prompt: "Is pregnancy OGTT test available? How much does it cost and what is the preparation?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            content: "We apologize for the trouble. I'm experiencing some cellular connectivity issues. Please speak directly with our front desk receptionist at **(032) 495 9328** during operational hours!" 
          }
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "Connection timed out. Please check your internet, toggle your page view, or call LLMDCI Cebu at **(032) 495 9328**!" 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden select-none font-sans flex flex-col items-end">
      {/* Floating pulsing bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-blue hover:bg-brand-navy rounded-full text-white shadow-xl flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 relative group"
          aria-label="Open clinic AI support chat"
        >
          {/* Pulsing indicator wave */}
          <span className="absolute inset-0 rounded-full bg-brand-teal origin-center animate-ping opacity-25"></span>
          <MessageSquare size={26} className="relative z-10" />
          
          <div className="absolute right-16 bg-brand-dark text-white text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/5 shadow-md">
            💬 Have medical test questions?
          </div>
        </button>
      )}

      {/* Expanded Chat Widget Portal */}
      {isOpen && (
        <div className="bg-white max-w-sm sm:max-w-md w-[90vw] h-[500px] sm:h-[555px] rounded-3xl overflow-hidden shadow-2xl border border-gray-150 flex flex-col transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Widget Header bar */}
          <div className="bg-brand-dark p-4 flex justify-between items-center text-white border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-blue/30 text-brand-teal rounded-full flex items-center justify-center relative">
                <Bot size={20} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-brand-dark"></span>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold tracking-tight flex items-center gap-1.5">
                  <span>Care Concierge</span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-brand-blue text-[9px] font-bold uppercase rounded text-brand-teal">
                    <Sparkles size={8} /> AI
                  </span>
                </h4>
                <p className="text-[10px] text-gray-400">Offline backup active • Answers in seconds</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Minimize support panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, idx) => {
              const isAssistant = m.role === "assistant";
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 max-w-[85%] text-xs sm:text-sm ${
                    isAssistant ? "justify-start text-left" : "justify-end ml-auto text-right"
                  }`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 bg-brand-light-blue text-brand-blue rounded-full flex items-center justify-center shrink-0 self-start shadow-xs">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div
                      className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                        isAssistant
                          ? "bg-white text-gray-700 border border-gray-100 shadow-xs rounded-tl-none"
                          : "bg-brand-blue text-white rounded-tr-none text-left"
                      }`}
                    >
                      {/* Simple line-by-line helper to format bold headers */}
                      {m.content.split("\n").map((line, lidx) => {
                        let parsed = line;
                        if (line.startsWith("• **") || line.startsWith("* **")) {
                          // Extract bold words
                          const boldMatch = line.match(/\*\*(.*?)\*\*/);
                          if (boldMatch) {
                            const boldPart = boldMatch[1];
                            const normalPart = line.replace(/\*\*.*?\*\*/, "");
                            return (
                              <p key={lidx} className="pl-1">
                                <span className="font-semibold text-brand-navy">{boldPart}</span>
                                <span className="text-gray-600">{normalPart}</span>
                              </p>
                            );
                          }
                        }
                        return <p key={lidx}>{parsed}</p>;
                      })}
                    </div>
                    
                    <span className="text-[9px] text-gray-400 px-1 font-mono">
                      {isAssistant ? "LLMDCI Staff" : "Guest Patient"}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs pl-2 animate-pulse text-left">
                <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce delay-150"></div>
                <span>Triage reviewing your query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick interactive search prompts list */}
          <div className="p-2 border-t border-gray-150/55 scroll-smooth shrink-0 bg-white">
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gray-200">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="px-2.5 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-lg text-[10px] sm:text-xs font-semibold hover:border-brand-blue hover:text-brand-blue shrink-0 cursor-pointer text-left transition-colors whitespace-nowrap"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Form Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-150/75 flex gap-2 items-center bg-white shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask LLMDCI: 'how much is HbA1c?'..."
              disabled={loading}
              className="flex-1 px-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 focus:outline-hidden focus:bg-white focus:border-brand-blue rounded-full text-left"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-brand-blue hover:bg-brand-navy disabled:bg-gray-200 text-white rounded-full transition-colors cursor-pointer shrink-0"
              aria-label="Send messenger text"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
