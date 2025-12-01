import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { generateERPAssistance } from '../services/aiService';
import { Employee, Item, SalesOrder } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: {
    employees: Employee[];
    inventory: Item[];
    sales: SalesOrder[];
  };
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, contextData }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! I am your Insight ERP Assistant powered by Gemini 3 Pro. I can analyze your live inventory and sales trends. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Context is now handled by the backend tools, but we can pass basic prompt
    const aiResponse = await generateERPAssistance(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 animate-fade-in overflow-hidden font-sans"
    >
      <div className="bg-indigo-600 p-4 flex justify-between items-center text-white bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-300" />
          <span className="font-semibold">Insight AI</span>
        </div>
        <button onClick={onClose} className="text-indigo-200 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-white'}`}>
                {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-5 w-5 text-indigo-600" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-sm text-slate-500 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about stock, sales, or trends..."
            className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-slate-50"
          />
          <Button onClick={handleSend} size="sm" className="rounded-full w-10 h-10 p-0 bg-indigo-600 hover:bg-indigo-700 shadow-soft">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};