import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Leak } from '../types';
import { 
  ShieldAlert, 
  Send, 
  Check, 
  X, 
  Sparkles, 
  AlertCircle,
  Copy,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AiActionModal: React.FC = () => {
  const { activeActionLeak, setActiveActionLeak, fixLeak, dismissLeak } = useApp();
  const [draftContent, setDraftContent] = useState<string>('');
  const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(false);
  const [hasConfirmedSafety, setHasConfirmedSafety] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [executionState, setExecutionState] = useState<'idle' | 'executing' | 'done'>('idle');

  useEffect(() => {
    if (!activeActionLeak) {
      setDraftContent('');
      setHasConfirmedSafety(false);
      setExecutionState('idle');
      return;
    }

    const fetchDraft = async () => {
      setIsLoadingDraft(true);
      try {
        const response = await fetch('/api/generate-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            actionType: activeActionLeak.actionType,
            leakTitle: activeActionLeak.title,
            cost: activeActionLeak.costAmount ? `$${activeActionLeak.costAmount}` : undefined,
            details: activeActionLeak.details || activeActionLeak.whatHappened,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setDraftContent(data.result);
        } else {
          setDraftContent(getDefaultDraft(activeActionLeak));
        }
      } catch (err) {
        setDraftContent(getDefaultDraft(activeActionLeak));
      } finally {
        setIsLoadingDraft(false);
      }
    };

    fetchDraft();
  }, [activeActionLeak]);

  if (!activeActionLeak) return null;

  const getDefaultDraft = (leak: Leak): string => {
    if (leak.actionType === 'cancel_subscription') {
      return `Subject: Cancellation Request - Account associated with ${leak.title}\n\nPlease cancel my recurring subscription immediately prior to the upcoming renewal date. Ensure no further charges are billed to my card, and send confirmation.\n\nThank you,\nArno`;
    }
    if (leak.actionType === 'track_refund') {
      return `Subject: Missing Refund Status Inquiry - ${leak.title}\n\nDear Customer Support,\n\nI am following up regarding the pending refund of $${leak.costAmount?.toFixed(2) || '0.00'}. The return package was delivered over 7 business days ago, but the statement credit has not posted.\n\nPlease expedite this credit to the original payment method.\n\nSincerely,\nArno`;
    }
    if (leak.actionType === 'draft_reply') {
      return `Hi Sarah,\n\nThanks for your patience. I've reviewed the updated advisory term sheet—all points look solid from my end. Let's schedule a brief 10-minute check tomorrow afternoon to sign off.\n\nBest,\nArno`;
    }
    return `Scheduled: ${leak.recommendedAction}\nAutomatic priority notification queued 2 hours before cutoff.`;
  };

  const handleExecute = () => {
    setExecutionState('executing');
    setTimeout(() => {
      fixLeak(activeActionLeak.id, `Executed action: ${activeActionLeak.actionLabel}`);
      setExecutionState('done');
      setTimeout(() => {
        setActiveActionLeak(null);
        setExecutionState('idle');
      }, 1200);
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e0f18] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl text-neutral-100 overflow-hidden">
        
        {/* Top header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase font-medium text-neutral-400 tracking-wider">
              Autonomous Action Executor
            </span>
          </div>
          <button
            onClick={() => setActiveActionLeak(null)}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-5">
          <h3 className="text-xl font-bold tracking-tight text-white mb-1">
            {activeActionLeak.title}
          </h3>
          <p className="text-xs text-neutral-400 mb-4">
            {activeActionLeak.recommendedAction}
          </p>

          {/* Impact preview */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4 flex items-center justify-between">
            <div className="text-xs text-neutral-400">
              <span>Potential Recovery: </span>
              {activeActionLeak.costAmount ? (
                <span className="font-mono text-emerald-400 font-semibold text-sm ml-1">
                  ${activeActionLeak.costAmount.toFixed(2)}
                </span>
              ) : activeActionLeak.timeAmountMinutes ? (
                <span className="font-mono text-cyan-400 font-semibold text-sm ml-1">
                  {Math.floor(activeActionLeak.timeAmountMinutes / 60)}h {activeActionLeak.timeAmountMinutes % 60}m saved
                </span>
              ) : (
                <span className="text-amber-400 font-semibold text-sm ml-1">Deadline Safe</span>
              )}
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Source: {activeActionLeak.source}
            </div>
          </div>

          {/* AI generated message / action payload */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI-Prepared Draft / Instruction</span>
              </label>
              <button
                onClick={handleCopy}
                className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Copied' : 'Copy text'}</span>
              </button>
            </div>

            {isLoadingDraft ? (
              <div className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-xs text-neutral-400">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin mr-2" />
                Generating verified action text...
              </div>
            ) : (
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                rows={4}
                className="w-full text-xs font-mono bg-neutral-950/80 border border-white/10 rounded-xl p-3 text-neutral-200 focus:outline-none focus:border-white/30 resize-none leading-relaxed"
                placeholder="Message draft or action payload..."
              />
            )}
          </div>

          {/* Safety requirement check */}
          <div className="p-3 bg-amber-500/[0.06] border border-amber-500/20 rounded-xl mb-5 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <span className="font-semibold text-amber-300 block mb-0.5">Explicit User Authorization Required</span>
              <p className="text-neutral-400 text-[11px] leading-relaxed mb-2">
                LEAK will never execute financial or account cancellations secretly. Confirm you authorize this action.
              </p>
              <label className="flex items-center gap-2 cursor-pointer text-neutral-200 select-none">
                <input
                  type="checkbox"
                  checked={hasConfirmedSafety}
                  onChange={(e) => setHasConfirmedSafety(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-emerald-400 focus:ring-0"
                />
                <span className="text-[11px] font-medium">I authorize executing this resolution</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <button
            onClick={() => setActiveActionLeak(null)}
            className="px-4 py-2 text-xs text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            Dismiss
          </button>

          <button
            onClick={handleExecute}
            disabled={!hasConfirmedSafety || executionState !== 'idle'}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              hasConfirmedSafety && executionState === 'idle'
                ? 'bg-white text-neutral-950 hover:bg-neutral-200 shadow-md cursor-pointer'
                : 'bg-white/10 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {executionState === 'executing' ? (
              <>
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Safe Action...</span>
              </>
            ) : executionState === 'done' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resolved & Fixed!</span>
              </>
            ) : (
              <>
                <span>Confirm & Fix It</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
