import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, X, Shield, ArrowRight } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { settings, updateSettings, setActiveView } = useApp();

  const handleSelectPro = () => {
    updateSettings({ isPro: true });
    setActiveView('dashboard');
  };

  const handleSelectFree = () => {
    updateSettings({ isPro: false });
    setActiveView('dashboard');
  };

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
          Autonomous Life Defense
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Simple, transparent membership.
        </h1>
        <p className="text-xs text-neutral-400 leading-relaxed">
          LEAK typically recovers more in the first 48 hours than an entire annual subscription costs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* FREE PLAN */}
        <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Free</span>
              <span className="text-xs font-mono text-neutral-500">Essential baseline</span>
            </div>

            <div className="text-4xl font-bold font-mono text-white mb-2">
              $0
              <span className="text-xs font-normal text-neutral-500 font-sans ml-1">/forever</span>
            </div>

            <p className="text-xs text-neutral-400 mb-6">
              Passive detection for casual household management.
            </p>

            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Basic leak detection (Weekly frequency)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Limited scans (2 connected accounts max)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Basic overview dashboard</span>
              </li>
              <li className="flex items-center gap-2.5 text-neutral-600">
                <X className="w-3.5 h-3.5 shrink-0" />
                <span>No automated AI action execution</span>
              </li>
              <li className="flex items-center gap-2.5 text-neutral-600">
                <X className="w-3.5 h-3.5 shrink-0" />
                <span>No overdue refund automated traces</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={handleSelectFree}
              className={`w-full py-3 rounded-xl text-xs font-semibold border transition-all ${
                !settings.isPro
                  ? 'border-white/20 bg-white/5 text-neutral-300'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {!settings.isPro ? 'Current Plan' : 'Downgrade to Free'}
            </button>
          </div>
        </div>

        {/* PRO PLAN ($29.99/mo) */}
        <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.08] to-neutral-900/60 border border-white/20 relative flex flex-col justify-between shadow-2xl">
          <div className="absolute -top-3 right-6 bg-white text-neutral-950 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
            Recommended
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pro</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">ROI Guaranteed</span>
            </div>

            <div className="text-4xl font-bold font-mono text-white mb-2">
              $29.99
              <span className="text-xs font-normal text-neutral-400 font-sans ml-1">/month</span>
            </div>

            <p className="text-xs text-neutral-400 mb-6">
              Complete autonomous intelligence operating system for your personal life.
            </p>

            <ul className="space-y-3 text-xs text-neutral-200">
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">Unlimited continuous real-time monitoring</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">Unlimited leak detection across all 10 categories</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">1-Click AI Actions (Disputes, Cancellations, Replies)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full subscription monitoring & zombie fee alerts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Overdue merchant refund auto-tracker & claims</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Travel deadlines, passport alerts & seat upgrades</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={handleSelectPro}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                settings.isPro
                  ? 'bg-emerald-500 text-neutral-950 cursor-default'
                  : 'bg-white text-neutral-950 hover:bg-neutral-200 cursor-pointer'
              }`}
            >
              <span>{settings.isPro ? 'Pro Active' : 'Start LEAK Pro'}</span>
              {!settings.isPro && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
