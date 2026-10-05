import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  X, 
  Mail, 
  Calendar, 
  CreditCard, 
  FileText, 
  CheckSquare, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'email' | 'calendar' | 'transaction' | 'subscription' | 'document' | 'task';
  title: string;
  subtitle: string;
  dateOrAmount?: string;
  actionPayload?: () => void;
}

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    leaks, 
    subscriptions, 
    setActiveActionLeak, 
    setActiveView 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Synthesize index across all 6 data types
  const fullIndex: SearchResultItem[] = [
    // Subscriptions
    ...subscriptions.map((s) => ({
      id: s.id,
      type: 'subscription' as const,
      title: s.name,
      subtitle: `${s.category} · Renews ${s.renewalDate}`,
      dateOrAmount: `$${s.cost.toFixed(2)}/mo`,
      actionPayload: () => {
        setActiveView('subscriptions');
        setIsSearchOpen(false);
      }
    })),
    // Leaks / Tasks
    ...leaks.map((l) => ({
      id: l.id,
      type: 'task' as const,
      title: l.title,
      subtitle: `${l.recommendedAction} (${l.source})`,
      dateOrAmount: l.costAmount ? `$${l.costAmount.toFixed(2)}` : l.dueDate,
      actionPayload: () => {
        setActiveActionLeak(l);
        setIsSearchOpen(false);
      }
    })),
    // Emails
    {
      id: 'email-1',
      type: 'email' as const,
      title: 'Sarah Lin: Term Sheet feedback on Advisory Cap',
      subtitle: 'Apex Ventures · 4 days awaiting response',
      dateOrAmount: 'Oct 02',
      actionPayload: () => {
        const leak = leaks.find(l => l.id === 'leak-email-sarah');
        if (leak) setActiveActionLeak(leak);
        setIsSearchOpen(false);
      }
    },
    {
      id: 'email-2',
      type: 'email' as const,
      title: 'Amazon.com: Your return #882941 has arrived at facility',
      subtitle: 'UPS Tracking #1Z999 · $43.00 refund pending',
      dateOrAmount: 'Sep 24',
      actionPayload: () => {
        const leak = leaks.find(l => l.id === 'leak-refund-amazon');
        if (leak) setActiveActionLeak(leak);
        setIsSearchOpen(false);
      }
    },
    {
      id: 'email-3',
      type: 'email' as const,
      title: 'United Airlines: E-Ticket Confirmation UA 442 (SFO → JFK)',
      subtitle: 'Confirmation #K8192A · Check-in opens in 6 hours',
      dateOrAmount: 'Flight: Oct 07',
      actionPayload: () => {
        const leak = leaks.find(l => l.id === 'leak-flight-checkin');
        if (leak) setActiveActionLeak(leak);
        setIsSearchOpen(false);
      }
    },
    // Calendar events
    {
      id: 'cal-1',
      type: 'calendar' as const,
      title: 'United Flight UA 442 Departure (SFO)',
      subtitle: 'Terminal 3 Gate 74 · 8:00 AM Departure',
      dateOrAmount: 'Tomorrow',
    },
    {
      id: 'cal-2',
      type: 'calendar' as const,
      title: 'Weekly Standup Extra (Unnecessary meeting flagged)',
      subtitle: 'Google Calendar · 8 attendees, no agenda',
      dateOrAmount: 'Fri 10:00 AM',
    },
    // Transactions
    {
      id: 'tx-1',
      type: 'transaction' as const,
      title: 'DoorDash Tokyo Ramen (Duplicate swipe)',
      subtitle: 'Chase Sapphire · Two charges $32.00 within 90s',
      dateOrAmount: '$32.00',
    },
    {
      id: 'tx-2',
      type: 'transaction' as const,
      title: 'Netflix Monthly Subscription',
      subtitle: 'PayPal Billing Agreement · Increased to $17.99',
      dateOrAmount: '$17.99',
    },
    // Documents
    {
      id: 'doc-1',
      type: 'document' as const,
      title: 'US Passport #542***912',
      subtitle: 'Expiring in March 2027 (Under 6 month threshold for Intl)',
      dateOrAmount: 'Expires Mar 2027',
    },
    {
      id: 'doc-2',
      type: 'document' as const,
      title: 'Q3 Estimated Tax Voucher 1040-ES',
      subtitle: 'California State Franchise Tax Board & IRS voucher',
      dateOrAmount: 'Due Oct 09',
    },
  ];

  const filteredResults = query.trim()
    ? fullIndex.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          (item.dateOrAmount && item.dateOrAmount.toLowerCase().includes(q))
        );
      })
    : fullIndex.slice(0, 6);

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'email': return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case 'calendar': return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
      case 'transaction': return <CreditCard className="w-3.5 h-3.5 text-rose-400" />;
      case 'subscription': return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'document': return <FileText className="w-3.5 h-3.5 text-emerald-400" />;
      case 'task': return <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0c0d14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emails, transactions, subscriptions, flights, tasks..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-neutral-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick query tags */}
        <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-2 overflow-x-auto text-[11px] text-neutral-400">
          <span className="text-neutral-500">Try:</span>
          {['Netflix', 'Refund', 'Flight', 'John', 'September payments', 'Things I need to do'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="hover:text-white hover:underline transition-colors whitespace-nowrap"
            >
              "{tag}"
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-white/[0.04]">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              No matching records found across your connected accounts.
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.actionPayload) item.actionPayload();
                  else setIsSearchOpen(false);
                }}
                className="w-full text-left p-3.5 hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-neutral-100">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 line-clamp-1">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {item.dateOrAmount && (
                    <span className="font-mono text-xs text-neutral-400">
                      {item.dateOrAmount}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-950/60 border-t border-white/[0.04] text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Unified cross-provider index</span>
          <span>6 linked services</span>
        </div>

      </div>
    </div>
  );
};
