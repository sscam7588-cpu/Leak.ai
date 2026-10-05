import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  XCircle, 
  Check, 
  History,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Subscription } from '../types';

export const SubscriptionsView: React.FC = () => {
  const { subscriptions, cancelSubscription, setActiveActionLeak } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Compute monthly and yearly totals
  const activeSubs = subscriptions.filter((s) => s.status !== 'cancelled');
  const monthlyTotal = activeSubs.reduce((acc, s) => acc + s.cost, 0);
  const yearlyTotal = monthlyTotal * 12;

  const flaggedSubs = activeSubs.filter((s) => s.mightNotNeed);
  const flaggedMonthlySavings = flaggedSubs.reduce((acc, s) => acc + s.cost, 0);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header & Cadence Switch */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
            Recurring Commitments
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Subscriptions
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Continuous audit of recurring software, media, and membership billing.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl">
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedPeriod === 'monthly'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setSelectedPeriod('yearly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedPeriod === 'yearly'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Yearly View
          </button>
        </div>
      </div>

      {/* Main Totals Cards (As defined by prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Monthly Total */}
        <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/[0.07] relative overflow-hidden">
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
            Monthly
          </div>
          <div className="text-5xl font-mono font-bold tracking-tight text-white tabular-nums mb-1">
            ${monthlyTotal.toFixed(2)}
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            Across {activeSubs.length} active recurring billing subscriptions
          </div>
        </div>

        {/* Yearly Total */}
        <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/[0.07] relative overflow-hidden">
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
            Yearly
          </div>
          <div className="text-5xl font-mono font-bold tracking-tight text-white tabular-nums mb-1">
            ${yearlyTotal.toFixed(2)}
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            Annualized commitment if all subscriptions renew
          </div>
        </div>

      </div>

      {/* “Subscriptions you might not need” AI Section */}
      {flaggedSubs.length > 0 && (
        <div className="p-6 rounded-3xl bg-amber-500/[0.03] border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                Subscriptions you might not need
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400 font-semibold">
              Potential savings: ${flaggedMonthlySavings.toFixed(2)}/mo (${(flaggedMonthlySavings * 12).toFixed(2)}/yr)
            </span>
          </div>

          <p className="text-xs text-neutral-400">
            LEAK analyzed your app launches, card receipts, and inbox usage to identify dormant services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {flaggedSubs.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-neutral-950/70 border border-amber-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">{sub.name}</span>
                    <span className="font-mono text-xs font-bold text-amber-400">
                      ${sub.cost.toFixed(2)}/mo
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed mb-3">
                    {sub.reasonForFlag}
                  </div>
                  <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                    <span>Last used: {sub.lastUsed}</span>
                    <span>·</span>
                    <span>Renews: {sub.renewalDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-mono">1-click cancel available</span>
                  <button
                    onClick={() => {
                      cancelSubscription(sub.id);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 rounded-lg transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Active Subscriptions Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            All Monitored Subscriptions ({subscriptions.length})
          </h2>
          <span className="text-xs text-neutral-500">Auto-detected from Chase & PayPal</span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-neutral-900/30 divide-y divide-white/[0.04] overflow-hidden">
          {subscriptions.map((sub) => {
            const isCancelled = sub.status === 'cancelled';
            return (
              <div
                key={sub.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isCancelled ? 'opacity-40 bg-neutral-950/40' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-300">
                    {sub.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{sub.name}</span>
                      {sub.mightNotNeed && !isCancelled && (
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                          Dormant
                        </span>
                      )}
                      {isCancelled && (
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                          Cancelled
                        </span>
                      )}
                    </div>
                    
                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                      <span>{sub.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Renews {sub.renewalDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>Last used {sub.lastUsed}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                  {/* Price History Preview */}
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-white tabular-nums">
                      ${sub.cost.toFixed(2)}
                      <span className="text-xs font-normal text-neutral-400">/mo</span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500">
                      ${(sub.cost * 12).toFixed(2)}/yr
                    </div>
                  </div>

                  {!isCancelled ? (
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="px-3 py-1.5 text-xs text-neutral-400 hover:text-rose-400 border border-white/[0.08] hover:border-rose-500/30 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  ) : (
                    <div className="text-xs text-neutral-500 font-mono">
                      Cancelled
                    </div>
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
