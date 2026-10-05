import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sliders, 
  User, 
  Bell, 
  Shield, 
  DollarSign, 
  Globe, 
  Download, 
  Trash2, 
  Sparkles,
  Check,
  CreditCard
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportDataJSON, 
    resetAllData, 
    setActiveView,
    setHasCompletedOnboarding
  } = useApp();

  const [savedNotification, setSavedNotification] = useState(false);

  const handleHourlyRateChange = (rate: number) => {
    updateSettings({ hourlyRate: rate });
    triggerSaveToast();
  };

  const handleCurrencyChange = (currency: string) => {
    updateSettings({ currency });
    triggerSaveToast();
  };

  const handleNotificationIntensityChange = (intensity: 'minimal' | 'balanced' | 'proactive') => {
    updateSettings({ notificationIntensity: intensity });
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
            System Preferences
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Settings
          </h1>
        </div>

        {savedNotification && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Check className="w-3.5 h-3.5" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          User Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-400 block mb-1.5">Full Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => updateSettings({ name: e.target.value })}
              className="w-full text-xs font-medium bg-neutral-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs text-neutral-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateSettings({ email: e.target.value })}
              className="w-full text-xs font-medium bg-neutral-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
      </div>

      {/* Hourly Rate & Value Conversion */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Hourly Time Valuation
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Used to calculate dollar equivalencies when converting hours saved into tangible value.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[10, 25, 50, 100].map((rate) => {
            const isSelected = settings.hourlyRate === rate;
            return (
              <button
                key={rate}
                onClick={() => handleHourlyRateChange(rate)}
                className={`py-3 px-4 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-white bg-white text-neutral-950 font-bold shadow-md'
                    : 'border-white/[0.08] bg-white/[0.02] text-neutral-300 hover:border-white/20'
                }`}
              >
                <div className="text-lg font-mono">${rate}{rate === 100 ? '+' : ''}/hr</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Intensity (As specified in prompt) */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Notification Intensity
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            We never spam. Choose the threshold of severity before an alert is dispatched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'minimal', label: 'Minimal', desc: 'Critical financial renewals and day-of flights only' },
            { id: 'balanced', label: 'Balanced', desc: 'Overdue refunds, upcoming renewals, priority emails' },
            { id: 'proactive', label: 'Proactive', desc: 'Every opportunity, weekly digests, and subtle price hikes' },
          ].map((item) => {
            const isSelected = settings.notificationIntensity === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNotificationIntensityChange(item.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                    : 'border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold text-white mb-1">{item.label}</div>
                <div className="text-[11px] leading-relaxed text-neutral-400">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Currency & Regional */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Currency & Region
        </h2>

        <div className="grid grid-cols-4 gap-3 max-w-sm">
          {['$', '€', '£', '¥'].map((curr) => {
            const isSelected = settings.currency === curr;
            return (
              <button
                key={curr}
                onClick={() => handleCurrencyChange(curr)}
                className={`py-2 rounded-xl border text-center text-sm font-mono font-bold transition-all ${
                  isSelected
                    ? 'border-white bg-white text-neutral-950'
                    : 'border-white/[0.08] text-neutral-400 hover:text-white'
                }`}
              >
                {curr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-semibold mb-1">
            Membership Status
          </div>
          <h3 className="text-base font-bold text-white">
            {settings.isPro ? 'LEAK Pro Member ($29.99/mo)' : 'LEAK Free Plan'}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            {settings.isPro ? 'Unlimited scanning & autonomous AI actions enabled.' : 'Basic scanning and limited manual actions.'}
          </p>
        </div>

        <button
          onClick={() => setActiveView('pricing')}
          className="px-4 py-2 bg-white text-neutral-950 font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          {settings.isPro ? 'Manage Membership' : 'Upgrade to Pro'}
        </button>
      </div>

      {/* Re-run Onboarding & Quick Tour */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Interactive Setup Tour</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Rerun the initial discovery wizard to re-specify protected life domains.
          </p>
        </div>
        <button
          onClick={() => setHasCompletedOnboarding(false)}
          className="px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/[0.04] transition-colors"
        >
          Re-launch Setup
        </button>
      </div>

      {/* Data Management & Deletion (As specified in prompt) */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-rose-500/20 space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400">
            Data Portability & Destruction
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Export all stored telemetry or permanently delete all tokens and cached state.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJSON}
            className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium rounded-xl border border-white/10 flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export my data</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to permanently delete all data and reset LEAK?')) {
                resetAllData();
              }
            }}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/25 flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete all my data</span>
          </button>
        </div>
      </div>

    </div>
  );
};
