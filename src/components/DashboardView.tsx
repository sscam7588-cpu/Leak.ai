import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Calendar, 
  Mail, 
  RefreshCw, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Leak } from '../types';

export const DashboardView: React.FC = () => {
  const { 
    settings, 
    leaks, 
    recoverableMoney, 
    timeSavedMinutes, 
    setActiveActionLeak, 
    setActiveView,
    triggerScan,
    isScanning,
    fixedCount,
    connectedAccounts
  } = useApp();

  const activeLeaks = leaks.filter(l => l.status === 'active');

  // Specific 4 biggest leaks as defined by prompt
  const biggestLeaks = activeLeaks.slice(0, 4);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'money':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'time':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'deadlines':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'communication':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'travel':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  const getIndicatorDot = (category: string) => {
    switch (category) {
      case 'money': return 'bg-rose-500';
      case 'time': return 'bg-cyan-400';
      case 'deadlines': return 'bg-amber-400';
      case 'communication': return 'bg-blue-400';
      case 'travel': return 'bg-emerald-400';
      default: return 'bg-neutral-400';
    }
  };

  const formattedHours = Math.floor(timeSavedMinutes / 60);
  const formattedMins = timeSavedMinutes % 60;

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Top Greeting & Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
            Autonomous Life Protection Active
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Good morning, {settings.name}.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{connectedAccounts.filter(a => a.connected).length} sources linked</span>
          </div>

          <button
            onClick={triggerScan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.09] text-neutral-300 hover:text-white border border-white/[0.08] rounded-lg text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Scan now'}</span>
          </button>
        </div>
      </div>

      {/* Massive Highlighted Metric Section (As specified in brief) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Potentially Recoverable Money */}
        <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.07] overflow-hidden group hover:border-white/15 transition-all">
          <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-medium text-neutral-400 tracking-wider">
              Capital Drain
            </span>
            <span className="text-xs text-rose-400 flex items-center gap-1 font-mono">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{activeLeaks.filter(l => l.category === 'money').length} active leaks</span>
            </span>
          </div>

          <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-white tabular-nums mb-1">
            ${recoverableMoney.toFixed(0)}
          </div>
          
          <div className="text-sm font-medium text-neutral-400">
            potentially recoverable
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-neutral-500">
            <span>Includes subscriptions, refunds & duplicate charges</span>
            <button 
              onClick={() => setActiveView('money')}
              className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View Money</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Potential Time Saved */}
        <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.07] overflow-hidden group hover:border-white/15 transition-all">
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-medium text-neutral-400 tracking-wider">
              Focus Friction
            </span>
            <span className="text-xs text-cyan-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{(formattedHours * settings.hourlyRate).toFixed(0)}/wk equiv</span>
            </span>
          </div>

          <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-white tabular-nums mb-1">
            {formattedHours}h {formattedMins}m
          </div>
          
          <div className="text-sm font-medium text-neutral-400">
            potential time saved
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-neutral-500">
            <span>Repetitive email threads & dead meetings</span>
            <button 
              onClick={() => setActiveView('time')}
              className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View Time</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* YOUR BIGGEST LEAKS SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight uppercase text-xs sm:text-sm tracking-wider">
              Your Biggest Leaks
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              · {activeLeaks.length} items requiring attention
            </span>
          </div>

          <button
            onClick={() => setActiveView('leaks')}
            className="text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>See all leaks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Featured Leak Cards with Crisp Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {biggestLeaks.map((leak) => {
            return (
              <div
                key={leak.id}
                className="group relative p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category and Source unboxed metadata (Zero-pill discipline) */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getIndicatorDot(leak.category)}`} />
                      <span className="capitalize text-neutral-400 font-medium">{leak.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{leak.source}</span>
                    </div>
                    {leak.dueDate && (
                      <span className="text-amber-400/90 font-mono text-[11px]">{leak.dueDate}</span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight mb-1 group-hover:text-neutral-100">
                    {leak.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {leak.whatHappened}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="text-xs font-mono font-semibold">
                    {leak.costAmount ? (
                      <span className="text-rose-400">${leak.costAmount.toFixed(2)}</span>
                    ) : leak.timeAmountMinutes ? (
                      <span className="text-cyan-400">{leak.timeAmountMinutes} min friction</span>
                    ) : (
                      <span className="text-neutral-400">High priority</span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveActionLeak(leak)}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm flex items-center gap-1"
                  >
                    <span>{leak.actionLabel}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week Glance Banner */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Your Weekly Intelligence Report is ready</div>
            <div className="text-xs text-neutral-400 mt-0.5">
              12 problems detected · 4 problems resolved this week
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveView('weekly-report')}
          className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 transition-colors whitespace-nowrap"
        >
          View Full Report
        </button>
      </div>

    </div>
  );
};
