import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Check, 
  HelpCircle,
  ChevronRight,
  TrendingDown,
  Clock
} from 'lucide-react';

export const AskLeakView: React.FC = () => {
  const { chatHistory, addChatMessage, leaks, subscriptions, setActiveActionLeak } = useApp();
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Am I wasting money anywhere?',
    'What subscriptions do I have?',
    'What do I need to do this week?',
    'Do I have any upcoming deadlines?',
    'Which emails should I answer?',
    'How much money did I waste this month?',
    'What can you fix for me?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isSubmitting]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSubmitting) return;

    setInputText('');
    setIsSubmitting(true);
    try {
      await addChatMessage({ role: 'user', content: text });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Top Header */}
      <div className="border-b border-white/[0.06] pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
              Connected Life Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-0.5">
            Ask LEAK
          </h1>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Model: gemini-3.8-flash · 6 data sources
        </div>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="py-3 border-b border-white/[0.04]">
        <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium mb-2">
          Suggested Inquiries
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-white/[0.06] rounded-xl whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-5 pr-2">
        {chatHistory.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-white text-neutral-950 font-medium'
                    : 'bg-neutral-900/60 border border-white/[0.08] text-neutral-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* If assistant references urgent leaks, embed interactive card */}
                {!isUser && msg.content.includes('Adobe') && (
                  <div className="mt-3 p-3 bg-neutral-950/80 border border-rose-500/20 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Adobe Creative Cloud</div>
                      <div className="text-[11px] text-neutral-400">$59.99 auto-renews tomorrow</div>
                    </div>
                    <button
                      onClick={() => {
                        const leak = leaks.find(l => l.id === 'leak-adobe');
                        if (leak) setActiveActionLeak(leak);
                      }}
                      className="px-3 py-1 bg-white text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      Cancel Now
                    </button>
                  </div>
                )}

                {!isUser && msg.content.includes('Amazon') && (
                  <div className="mt-3 p-3 bg-neutral-950/80 border border-amber-500/20 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Missing Amazon Return</div>
                      <div className="text-[11px] text-neutral-400">$43.00 credit overdue</div>
                    </div>
                    <button
                      onClick={() => {
                        const leak = leaks.find(l => l.id === 'leak-refund-amazon');
                        if (leak) setActiveActionLeak(leak);
                      }}
                      className="px-3 py-1 bg-white text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      Track Refund
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-white/[0.1] border border-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-neutral-300" />
                </div>
              )}
            </div>
          );
        })}

        {isSubmitting && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-neutral-900/50 border border-white/[0.06] text-xs text-neutral-400">
              Synthesizing data across accounts...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-3 border-t border-white/[0.06] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask LEAK about wasted money, forgotten tasks, deadlines..."
          className="flex-1 bg-neutral-900/70 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSubmitting}
          className="p-3 bg-white text-neutral-950 font-bold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
