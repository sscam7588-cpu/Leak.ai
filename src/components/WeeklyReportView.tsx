import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const WeeklyReportView: React.FC = () => {
  const { setActiveActionLeak, leaks, setActiveView } = useApp();

  const nextWeekPriorities = [
    {
      id: 'priority-tax',
      title: 'Estimated tax voucher payment',
      due: 'Thursday (Oct 09)',
      desc: 'Avoid $72.50 statutory 5% underpayment penalty.',
      actionLeakId: 'leak-tax-deadline'
    },
    {
      id: 'priority-flight',
      title: 'United flight UA 442 check-in',
      due: 'Tomorrow morning 8:00 AM',
      desc: 'Check-in opens in 6 hours to claim premium aisle seat.',
      actionLeakId: 'leak-flight-checkin'
    },
    {
      id: 'priority-sarah',
      title: 'Sign off on Apex Ventures advisory terms',
      due: 'Friday 5:00 PM',
      desc: 'Sarah Lin is awaiting comments on Section 4 before closing.',
      actionLeakId: 'leak-email-sarah'
    }
  ];

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-500 tracking-wider">
          <span>Personal Intelligence Briefing</span>
          <span>·</span>
          <span>Week 40</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
          Your Week
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          A definitive accounting of recovered capital, time defended, and friction eliminated.
        </p>
      </div>

      {/* 4 Core Metrics Grid (As specified in prompt) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06]">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 tabular-nums">
            $184
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            potentially recovered
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06]">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-cyan-400 tabular-nums">
            7h 24m
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            potential time saved
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06]">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
            12
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            problems detected
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06]">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-amber-300 tabular-nums">
            4
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            problems fixed
          </div>
        </div>
      </div>

      {/* WHERE YOU LOST MONEY */}
      <div className="p-6 rounded-3xl bg-neutral-900/30 border border-white/[0.06] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Where you lost money
          </h2>
          <span className="text-xs font-mono text-rose-400 font-semibold">$184.00 Total Leakage</span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">$79.00 subscription</span>
            <span className="text-neutral-500">Unused Adobe CC & Wall Street Journal billing</span>
          </div>
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">$43.00 missing refund</span>
            <span className="text-neutral-500">Amazon returned parcel delivered 11 days ago</span>
          </div>
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">$32.00 duplicate charge</span>
            <span className="text-neutral-500">DoorDash Tokyo Ramen dual capture glitch</span>
          </div>
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">$30.00 unexpected price increase</span>
            <span className="text-neutral-500">Netflix tier jump from $15.49 to $17.99</span>
          </div>
        </div>
      </div>

      {/* WHERE YOU LOST TIME */}
      <div className="p-6 rounded-3xl bg-neutral-900/30 border border-white/[0.06] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Where you lost time
          </h2>
          <span className="text-xs font-mono text-cyan-400 font-semibold">7h 24m Total Lost</span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">3 unnecessary meetings</span>
            <span className="text-neutral-500">Recurring status syncs without agendas (2h 30m)</span>
          </div>
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">14 repetitive emails</span>
            <span className="text-neutral-500">Manual replies regarding project timeline & status (3h 10m)</span>
          </div>
          <div className="py-3 flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-medium">2 manual tasks</span>
            <span className="text-neutral-500">Reconciling receipt PDFs into spreadsheet ledger (1h 44m)</span>
          </div>
        </div>
      </div>

      {/* NEXT WEEK — 3 things you should handle before Friday */}
      <div className="p-7 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.1] space-y-5">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
            Next Week
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            3 things you should handle before Friday.
          </h2>
        </div>

        <div className="space-y-3">
          {nextWeekPriorities.map((item, idx) => {
            const matchedLeak = leaks.find(l => l.id === item.actionLeakId);
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-950/80 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">0{idx + 1}.</span>
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 pl-6 leading-relaxed">
                    {item.desc}
                  </div>
                  <div className="text-[11px] font-mono text-amber-400/90 pl-6 mt-1">
                    Due: {item.due}
                  </div>
                </div>

                {matchedLeak && matchedLeak.status === 'active' ? (
                  <button
                    onClick={() => setActiveActionLeak(matchedLeak)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 transition-colors whitespace-nowrap self-end sm:self-auto"
                  >
                    Fix Now
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium pl-6 sm:pl-0">Scheduled</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
