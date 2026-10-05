import React from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
  Crown
} from 'lucide-react';

export const Navigation: React.FC<{ onOpenNotifications: () => void }> = ({ onOpenNotifications }) => {
  const { 
    activeView, 
    setActiveView, 
    notifications, 
    setIsSearchOpen, 
    isScanning, 
    triggerScan,
    settings
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks: { id: ActiveView; label: string }[] = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'leaks', label: 'Leaks' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'money', label: 'Money' },
    { id: 'time', label: 'Time' },
    { id: 'weekly-report', label: 'Weekly Report' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#08090d]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
          >
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              LEAK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Scan Button */}
          <button
            onClick={triggerScan}
            disabled={isScanning}
            title="Scan connected accounts"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-white/[0.08] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden lg:inline">{isScanning ? 'Scanning...' : 'Scan'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-900/70 hover:bg-neutral-800/90 border border-white/[0.08] rounded-lg transition-colors group cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-200" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700 font-mono">⌘K</kbd>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            title="Notifications"
            className="relative p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Ask LEAK Assistant Button */}
          <button
            onClick={() => setActiveView('ask-leak')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeView === 'ask-leak'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                : 'bg-white/[0.08] text-neutral-200 hover:bg-white/[0.12] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask LEAK</span>
          </button>

          {/* Privacy Center */}
          <button
            onClick={() => setActiveView('privacy')}
            title="Privacy Center"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'privacy' 
                ? 'text-white bg-white/[0.08]' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveView('settings')}
            title="Settings"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'settings' 
                ? 'text-white bg-white/[0.08]' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Pro Badge / Pricing */}
          <button
            onClick={() => setActiveView('pricing')}
            className={`hidden xl:flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all cursor-pointer ${
              settings.isPro
                ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Crown className="w-3 h-3 text-amber-400" />
            <span>{settings.isPro ? 'PRO' : 'Upgrade'}</span>
          </button>
        </div>

      </div>

      {/* Mobile secondary navigation scroller */}
      <div className="md:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-white/[0.04] scrollbar-none">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveView(link.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === link.id
                ? 'text-white bg-white/[0.1]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
