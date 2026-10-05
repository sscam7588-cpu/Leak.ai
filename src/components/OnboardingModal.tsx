import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Clock, 
  DollarSign, 
  Calendar, 
  Mail, 
  RefreshCcw, 
  Plane,
  CreditCard,
  Lock,
  Sparkles
} from 'lucide-react';

export const OnboardingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { setHasCompletedOnboarding, updateSettings, toggleConnectAccount, connectedAccounts } = useApp();
  const [step, setStep] = useState<number>(1);
  const [selectedProtections, setSelectedProtections] = useState<string[]>([
    'Money',
    'Time',
    'Important deadlines',
    'Subscriptions',
    'Travel'
  ]);
  const [selectedRate, setSelectedRate] = useState<number>(50);
  const [isScanningAnimation, setIsScanningAnimation] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(10);
  const [scanPhaseText, setScanPhaseText] = useState<string>('Connecting secure read-only bridges...');

  if (!isOpen) return null;

  const protectionOptions = [
    { id: 'Money', label: 'Money', desc: 'Subscriptions, duplicate charges, missing refunds' },
    { id: 'Time', label: 'Time', desc: 'Repetitive emails, dead meetings, manual tasks' },
    { id: 'Important deadlines', label: 'Important deadlines', desc: 'Bills, renewals, appointments, filings' },
    { id: 'Subscriptions', label: 'Subscriptions', desc: 'Zombie recurring fees, silent price hikes' },
    { id: 'Travel', label: 'Travel', desc: 'Flight check-ins, hotel cancellation cut-offs' },
    { id: 'Everything', label: 'Everything', desc: 'Complete autonomous life protection' },
  ];

  const handleToggleProtection = (id: string) => {
    if (id === 'Everything') {
      setSelectedProtections(['Money', 'Time', 'Important deadlines', 'Subscriptions', 'Travel', 'Everything']);
      return;
    }
    if (selectedProtections.includes(id)) {
      setSelectedProtections(selectedProtections.filter((item) => item !== id && item !== 'Everything'));
    } else {
      setSelectedProtections([...selectedProtections, id]);
    }
  };

  const handleStartScan = () => {
    setIsScanningAnimation(true);
    setScanProgress(15);
    setScanPhaseText('Connecting read-only financial & inbox tokens...');

    setTimeout(() => {
      setScanProgress(45);
      setScanPhaseText('Auditing active recurring billing agreements...');
    }, 1100);

    setTimeout(() => {
      setScanProgress(78);
      setScanPhaseText('Detecting overdue refunds & flight check-in windows...');
    }, 2200);

    setTimeout(() => {
      setScanProgress(100);
      setScanPhaseText('Analysis complete. 4 major leaks identified.');
    }, 3400);

    setTimeout(() => {
      updateSettings({
        hourlyRate: selectedRate,
        protectedAreas: selectedProtections,
      });
      setHasCompletedOnboarding(true);
      onClose();
    }, 4200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl bg-[#0c0d14] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden transition-all text-neutral-100">
        
        {/* Subtle ambient background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* SCREEN 1: Welcome & Mission */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-8 shadow-inner">
              <span className="font-extrabold text-2xl tracking-tighter text-white">LEAK</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Your life has leaks.
              <br />
              <span className="text-neutral-400 font-normal">We'll find them.</span>
            </h1>

            <p className="text-neutral-400 text-sm max-w-md mb-10 leading-relaxed">
              Find what you're losing in money, time, and missed deadlines.
              An AI operating system built quietly for your personal life.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-950 font-semibold text-sm rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group shadow-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <div className="mt-8 flex items-center gap-2 text-xs text-neutral-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-knowledge client tokens · Read-only scanning</span>
            </div>
          </div>
        )}

        {/* SCREEN 2: Protection Scope */}
        {step === 2 && (
          <div className="py-2">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                What do you want LEAK to protect?
              </h2>
              <p className="text-neutral-400 text-sm mt-1">Select all areas you want monitored continuously.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
              {protectionOptions.map((opt) => {
                const isSelected = selectedProtections.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleProtection(opt.id)}
                    className={`p-3.5 text-left rounded-xl border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                        : 'border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:border-white/[0.12] hover:text-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{opt.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 ${
                      isSelected ? 'border-white bg-white text-neutral-950' : 'border-neutral-600'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={selectedProtections.length === 0}
                className="px-6 py-2.5 bg-white text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Hourly Rate */}
        {step === 3 && (
          <div className="py-2">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Step 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                How much is your time worth?
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                LEAK converts hours lost to friction into actual dollar impact.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-8">
              {[10, 25, 50, 100].map((rate) => {
                const isSelected = selectedRate === rate;
                return (
                  <button
                    key={rate}
                    onClick={() => setSelectedRate(rate)}
                    className={`py-5 px-4 text-center rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-white bg-white text-neutral-950 shadow-md font-bold'
                        : 'border-white/[0.08] bg-white/[0.02] text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl font-mono tracking-tight font-extrabold">
                      ${rate}{rate === 100 ? '+' : ''}/hr
                    </div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                      {rate <= 25 ? 'Baseline value' : rate === 50 ? 'Standard professional' : 'Executive rate'}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-white text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Connect Accounts */}
        {step === 4 && !isScanningAnimation && (
          <div className="py-2">
            <div className="mb-5">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Final Step</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Connect accounts
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                LEAK uses strictly scoped read-only access. You can disconnect anytime with 1 click.
              </p>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 my-5">
              {connectedAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-xs font-bold text-neutral-300">
                      {acc.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{acc.name}</div>
                      <div className="text-[11px] text-neutral-400">{acc.type} · Read-only</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnectAccount(acc.id)}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      acc.connected
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                    }`}
                  >
                    {acc.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/[0.05] mb-5 text-[11px] text-neutral-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No credentials or card details are ever stored. Scans focus exclusively on renewal dates, receipts, refund lags, and deadlines.</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => setStep(3)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleStartScan}
                className="px-6 py-2.5 bg-white text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Discovery Scan</span>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: Scanning Animation & Reveal */}
        {isScanningAnimation && (
          <div className="py-12 flex flex-col items-center text-center">
            {/* Radial pulsating radar */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-emerald-500/30 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <RefreshCcw className="w-7 h-7 text-emerald-400 animate-spin" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Scanning your digital life…
            </h3>
            <p className="text-xs font-mono text-neutral-400 h-6">
              {scanPhaseText}
            </p>

            {/* Clean minimal progress bar */}
            <div className="w-64 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-6 border border-white/10">
              <div
                className="h-full bg-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            <div className="mt-8 text-[11px] text-neutral-500 flex items-center gap-2">
              <Lock className="w-3 h-3" />
              <span>Zero-knowledge client tokens</span>
              <span>·</span>
              <span>Encrypted local session</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
