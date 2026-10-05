import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Calendar, 
  Check, 
  Zap,
  TrendingDown
} from 'lucide-react';

export const TimeView: React.FC = () => {
  const { settings, setActiveActionLeak, leaks } = useApp();
  const [appliedAutomations, setAppliedAutomations] = useState<string[]>([]);

  const timeBreakdown = [
    {
      id: 'time-email',
      category: 'Email',
      timeSpent: '3h 10m / week',
      desc: '14 repetitive emails replying to the same Q3 delivery and schedule questions.',
      leakId: 'leak-time-repetitive-emails',
      automationTitle: 'Auto-Knowledge Snippet Rule',
      automationDesc: 'Direct incoming timeline inquiries to a secure real-time read-only status page.',
      potentialSavings: '2h 15m/week',
    },
    {
      id: 'time-meetings',
      category: 'Meetings',
      timeSpent: '2h 30m / week',
      desc: '3 recurring standing syncs with >6 attendees and zero circulating agenda.',
      leakId: 'leak-time-status-meeting',
      automationTitle: 'Async Slack Standup Bridge',
      automationDesc: 'Replace Friday verbal checkin with automatic 9:00 AM async Slack thread prompt.',
      potentialSavings: '2h 00m/week',
    },
    {
      id: 'time-tasks',
      category: 'Repetitive Tasks',
      timeSpent: '1h 44m / week',
      desc: 'Manual receipt scanning and spreadsheet data entry for quarterly expenses.',
      automationTitle: 'Receipt Auto-Ingest Sync',
      automationDesc: 'Instantly parse attached PDF receipts from Gmail directly into Google Sheets ledger.',
      potentialSavings: '1h 30m/week',
    },
    {
      id: 'time-admin',
      category: 'Administrative Work',
      timeSpent: '50m / week',
      desc: 'Flight check-in alarms, document expiry reminders, and calendar conflict alerts.',
      automationTitle: 'Autonomous Alert Priority',
      automationDesc: 'Pre-check boarding pass availability 24 hours in advance and queue reminders.',
      potentialSavings: '45m/week',
    },
  ];

  const handleApplyAutomation = (id: string) => {
    setAppliedAutomations(prev => [...prev, id]);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-6">
        <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
          Cognitive Bandwidth
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
          Your Time Leaks
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Based on calendar invitations, email thread lengths, and manual workflow friction.
        </p>
      </div>

      {/* Prominent "LEAK CAN SAVE YOU" Section */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-neutral-900/50 to-neutral-900/30 border border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                LEAK CAN SAVE YOU
              </span>
            </div>
            
            <div className="text-5xl sm:text-6xl font-bold font-mono text-white tabular-nums tracking-tight">
              6h 40m<span className="text-xl font-normal text-neutral-400 font-sans">/week</span>
            </div>

            <div className="text-xs text-neutral-400 mt-2">
              Equivalent to <span className="text-white font-mono font-semibold">${(settings.hourlyRate * 6.66).toFixed(0)}</span> in recovered professional time every single week.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400/90 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
              4 Automations Ready
            </span>
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Where you spent friction time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeBreakdown.map((item) => {
            const isApplied = appliedAutomations.includes(item.id);
            const matchedLeak = item.leakId ? leaks.find(l => l.id === item.leakId) : null;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{item.category}</span>
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {item.timeSpent}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Recommended Automation */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                    <div className="text-neutral-300 font-semibold mb-0.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{item.automationTitle}</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      {item.automationDesc}
                    </p>
                    <div className="text-[11px] font-mono text-cyan-400 mt-1.5">
                      Saves: {item.potentialSavings}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    {isApplied ? 'Automation Active' : 'Ready to deploy'}
                  </span>

                  {isApplied ? (
                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Enabled</span>
                    </div>
                  ) : matchedLeak && matchedLeak.status === 'active' ? (
                    <button
                      onClick={() => setActiveActionLeak(matchedLeak)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
                    >
                      Fix this leak
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyAutomation(item.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Enable Automation
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
