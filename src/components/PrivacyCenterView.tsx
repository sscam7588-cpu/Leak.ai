import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Trash2, 
  Check, 
  AlertTriangle,
  RefreshCw,
  PowerOff
} from 'lucide-react';

export const PrivacyCenterView: React.FC = () => {
  const { connectedAccounts, toggleConnectAccount, exportDataJSON, resetAllData } = useApp();

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Cryptographic Isolation & Zero-Sale Guarantee</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
          Privacy Center
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Complete transparency over connected bridges, token scopes, and data residency.
        </p>
      </div>

      {/* Philosophy Callout (Adheres strictly to no '100% secure' claim) */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/[0.08] space-y-3">
        <h2 className="text-sm font-bold text-white">
          Our Privacy Architecture
        </h2>
        <p className="text-xs text-neutral-300 leading-relaxed">
          LEAK operates under strict least-privilege principles. We utilize AES-256 at rest and TLS 1.3 in transit with granular OAuth access scopes. We do not sell user data, train foundational public models on your personal financial receipts, or store unmasked payment card credentials. While no software system is invulnerable to all threats, our isolation boundaries ensure your credentials remain private to your device session.
        </p>
        <div className="flex flex-wrap gap-4 text-[11px] font-mono text-neutral-400 pt-1">
          <span>· Read-only tokens</span>
          <span>· Ephemeral AI prompts</span>
          <span>· Zero data broker sharing</span>
        </div>
      </div>

      {/* Connected Accounts Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Connected Data Sources ({connectedAccounts.filter(a => a.connected).length} active)
          </h2>
          <span className="text-xs text-neutral-500">1-click immediate revocation</span>
        </div>

        <div className="space-y-3">
          {connectedAccounts.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-2xl bg-neutral-900/30 border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-300">
                    {acc.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>{acc.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${acc.connected ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">{acc.description}</div>
                  </div>
                </div>

                {/* Scopes & Reason */}
                <div className="mt-3 pl-11 text-xs space-y-1">
                  <div className="text-neutral-500">
                    <span className="text-neutral-400 font-medium">Why access is needed: </span>
                    Extracting renewal dates, duplicate card swipes, overdue refund delivery timestamps.
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-neutral-400 font-medium">Items scanned: </span>
                    <span className="font-mono text-neutral-300">{acc.itemsAnalyzed} events/receipts</span> (last sync: {acc.lastSync})
                  </div>
                </div>
              </div>

              {/* Disconnect CTA */}
              <div className="md:self-center pl-11 md:pl-0">
                <button
                  onClick={() => toggleConnectAccount(acc.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    acc.connected
                      ? 'border-rose-500/20 text-rose-300 hover:bg-rose-500/15'
                      : 'border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {acc.connected ? 'Disconnect Bridge' : 'Connect Bridge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Governance & Export */}
      <div className="p-6 rounded-3xl bg-neutral-900/30 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Full Data Portability</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Download every parsed record, subscription date, and leak log in structured JSON.
          </p>
        </div>

        <button
          onClick={exportDataJSON}
          className="px-4 py-2.5 bg-white text-neutral-950 font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Export My Data (JSON)
        </button>
      </div>

    </div>
  );
};
