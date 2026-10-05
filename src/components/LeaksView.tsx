import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LeakCategory, Leak } from '../types';
import { 
  DollarSign, 
  Clock, 
  Calendar, 
  Mail, 
  Plane, 
  Check, 
  ArrowRight, 
  Filter,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const LeaksView: React.FC = () => {
  const { 
    leaks, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter, 
    setActiveActionLeak,
    recoverableMoney,
    timeSavedMinutes
  } = useApp();

  const [statusTab, setStatusTab] = useState<'active' | 'fixed'>('active');
  const [expandedLeakId, setExpandedLeakId] = useState<string | null>(null);

  const categories: { id: LeakCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Leaks', count: leaks.filter(l => l.status === statusTab).length },
    { id: 'money', label: 'Money', count: leaks.filter(l => l.category === 'money' && l.status === statusTab).length },
    { id: 'time', label: 'Time', count: leaks.filter(l => l.category === 'time' && l.status === statusTab).length },
    { id: 'deadlines', label: 'Deadlines', count: leaks.filter(l => l.category === 'deadlines' && l.status === statusTab).length },
    { id: 'communication', label: 'Communication', count: leaks.filter(l => l.category === 'communication' && l.status === statusTab).length },
    { id: 'travel', label: 'Travel', count: leaks.filter(l => l.category === 'travel' && l.status === statusTab).length },
  ];

  const filteredLeaks = leaks.filter((leak) => {
    const matchesStatus = leak.status === statusTab;
    const matchesCategory = selectedCategoryFilter === 'all' || leak.category === selectedCategoryFilter;
    return matchesStatus && matchesCategory;
  });

  const getIndicator = (cat: string) => {
    switch (cat) {
      case 'money': return 'bg-rose-500';
      case 'time': return 'bg-cyan-400';
      case 'deadlines': return 'bg-amber-400';
      case 'communication': return 'bg-blue-400';
      case 'travel': return 'bg-emerald-400';
      default: return 'bg-neutral-400';
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Page Title & Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
            Continuous Life Detection
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Leaks
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Every detected problem with root causes, real cost, and one-click fixes.
          </p>
        </div>

        {/* Status switch (Active vs Fixed) */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl">
          <button
            onClick={() => setStatusTab('active')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              statusTab === 'active'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Active ({leaks.filter(l => l.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusTab('fixed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              statusTab === 'fixed'
                ? 'bg-emerald-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Fixed ({leaks.filter(l => l.status === 'fixed').length})
          </button>
        </div>
      </div>

      {/* Category Filter Segments (Zero-pill compliant interactive button group) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'border-white/20 bg-white/[0.1] text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Leaks List */}
      {filteredLeaks.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-white/[0.06] bg-white/[0.01]">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No {statusTab} leaks in this category</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            {statusTab === 'active' 
              ? 'Your connected accounts are fully optimized for this section.'
              : 'Fixed leaks will be cataloged here once resolved.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeaks.map((leak) => {
            const isExpanded = expandedLeakId === leak.id;
            return (
              <div
                key={leak.id}
                className="rounded-2xl border border-white/[0.07] bg-neutral-900/30 hover:border-white/15 transition-all overflow-hidden"
              >
                {/* Header Row */}
                <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    
                    {/* Metadata unboxed text */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                      <span className={`w-2 h-2 rounded-full ${getIndicator(leak.category)}`} />
                      <span className="capitalize text-neutral-400 font-medium">{leak.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Source: {leak.source}</span>
                      {leak.dueDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-400 font-mono">{leak.dueDate}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {leak.title}
                    </h2>

                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed max-w-3xl">
                      {leak.whatHappened}
                    </p>
                  </div>

                  {/* Right Side Cost / Time and Main Action */}
                  <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.05]">
                    <div className="text-right">
                      <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                        Estimated Cost
                      </div>
                      <div className="text-lg font-bold font-mono text-white tabular-nums">
                        {leak.costAmount ? (
                          <span className="text-rose-400">${leak.costAmount.toFixed(2)}</span>
                        ) : leak.timeAmountMinutes ? (
                          <span className="text-cyan-400">{leak.timeAmountMinutes} min</span>
                        ) : (
                          <span className="text-amber-400">Critical</span>
                        )}
                      </div>
                    </div>

                    {leak.status === 'active' ? (
                      <button
                        onClick={() => setActiveActionLeak(leak)}
                        className="px-6 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>FIX IT</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolved</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Structured Breakdown: What happened, Why it matters, Recommended action */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/[0.04] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 font-medium block mb-1">What happened</span>
                    <p className="text-neutral-300 leading-relaxed">{leak.whatHappened}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block mb-1">Why it matters</span>
                    <p className="text-neutral-300 leading-relaxed">{leak.whyItMatters}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block mb-1">Recommended action</span>
                    <p className="text-neutral-300 leading-relaxed">{leak.recommendedAction}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
