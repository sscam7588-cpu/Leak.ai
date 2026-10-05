import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingDown, 
  AlertCircle, 
  ArrowRight, 
  RefreshCcw, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const MoneyView: React.FC = () => {
  const { leaks, subscriptions, setActiveActionLeak, setActiveView } = useApp();

  const moneyLeaks = leaks.filter(l => l.category === 'money');
  const activeMoneyLeaks = moneyLeaks.filter(l => l.status === 'active');

  const moneyBreakdown = [
    {
      label: 'Subscriptions',
      amount: 247.43,
      desc: '8 recurring active billing items',
      status: 'High optimization potential',
      action: () => setActiveView('subscriptions')
    },
    {
      label: 'Missing Refunds',
      amount: 43.00,
      desc: 'Amazon return #882941 credit overdue by 4 days',
      status: 'Actionable immediately',
      leakId: 'leak-refund-amazon'
    },
    {
      label: 'Duplicate Payments',
      amount: 32.00,
      desc: 'DoorDash Tokyo Ramen dual swipe anomaly',
      status: 'Statement dispute eligible',
      leakId: 'leak-doordash-duplicate'
    },
    {
      label: 'Price Increases',
      amount: 30.00,
      desc: 'Netflix Standard plan $2.50/mo unnotified rise',
      status: 'Annualized drain',
      leakId: 'leak-netflix-price'
    },
    {
      label: 'Unexpected Charges',
      amount: 32.50,
      desc: 'Foreign transaction fee & cloud surge charge',
      status: 'Fee waiver eligible',
    },
    {
      label: 'Recurring Expenses',
      amount: 149.00,
      desc: 'Hosting servers, domain renewals, cloud backups',
      status: 'Monitored',
    },
  ];

  const totalDrain = moneyBreakdown.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="border-b border-white/[0.06] pb-6">
        <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
          Capital Audit
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
          Where your money is leaking.
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Not a budget tracker. A forensic lens on silent financial drains, duplicate charges, and lost credits.
        </p>
      </div>

      {/* Visual Bar Breakdown (Extremely minimal and clean) */}
      <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/[0.07] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Total Monitored Leak Surface
          </span>
          <span className="font-mono text-2xl font-bold text-white tabular-nums">
            ${totalDrain.toFixed(2)}
          </span>
        </div>

        {/* Proportional Segment Bar */}
        <div className="h-3 w-full rounded-full bg-neutral-800 overflow-hidden flex">
          <div style={{ width: '46%' }} className="bg-rose-500 h-full" title="Subscriptions: $247.43" />
          <div style={{ width: '12%' }} className="bg-amber-400 h-full" title="Refunds: $43.00" />
          <div style={{ width: '9%' }} className="bg-cyan-400 h-full" title="Duplicates: $32.00" />
          <div style={{ width: '8%' }} className="bg-purple-400 h-full" title="Price hikes: $30.00" />
          <div style={{ width: '25%' }} className="bg-neutral-600 h-full" title="Recurring base: $149.00" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-400 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Subscriptions ($247.43)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Missing Refunds ($43.00)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Duplicate Payments ($32.00)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Price Increases ($30.00)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-600" />
            <span>Recurring ($149.00)</span>
          </div>
        </div>
      </div>

      {/* Structured Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moneyBreakdown.map((item, idx) => {
          const matchedLeak = item.leakId ? leaks.find(l => l.id === item.leakId) : null;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900/30 border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className="font-mono text-base font-bold text-rose-400 tabular-nums">
                    ${item.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="text-[11px] text-neutral-500 font-mono">
                  {item.status}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-end">
                {matchedLeak && matchedLeak.status === 'active' ? (
                  <button
                    onClick={() => setActiveActionLeak(matchedLeak)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors flex items-center gap-1"
                  >
                    <span>Fix this leak</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : item.action ? (
                  <button
                    onClick={item.action}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    Manage
                  </button>
                ) : (
                  <span className="text-xs text-neutral-500">Monitored</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
