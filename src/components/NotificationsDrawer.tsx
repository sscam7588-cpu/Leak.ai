import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, X, ShieldAlert, Sparkles, ChevronRight, Sliders } from 'lucide-react';

export const NotificationsDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    leaks, 
    setActiveActionLeak,
    setActiveView
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0c0d14] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl text-neutral-100">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-white" />
              <h2 className="text-base font-bold text-white tracking-tight">
                High-Signal Notifications
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2 flex items-center justify-between text-xs text-neutral-500">
            <span>Filtered for zero spam</span>
            <button
              onClick={markAllNotificationsRead}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* List of high signal notifications */}
          <div className="space-y-3 mt-4 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-xs text-neutral-500">
                No active notifications.
              </div>
            ) : (
              notifications.map((notif) => {
                const matchedLeak = notif.leakId ? leaks.find(l => l.id === notif.leakId) : null;
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      notif.read
                        ? 'border-white/[0.04] bg-white/[0.01] opacity-60'
                        : 'border-white/[0.1] bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white">
                        {notif.title}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      {!notif.read ? (
                        <button
                          onClick={() => markNotificationRead(notif.id)}
                          className="text-[11px] text-neutral-400 hover:text-white"
                        >
                          Dismiss
                        </button>
                      ) : (
                        <span className="text-[11px] text-neutral-600">Read</span>
                      )}

                      {matchedLeak && matchedLeak.status === 'active' && (
                        <button
                          onClick={() => {
                            setActiveActionLeak(matchedLeak);
                            markNotificationRead(notif.id);
                            onClose();
                          }}
                          className="px-3 py-1 bg-white text-neutral-950 font-semibold text-xs rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer configure intensity link */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <span>Manage notification intensity</span>
          <button
            onClick={() => {
              setActiveView('settings');
              onClose();
            }}
            className="text-white hover:underline flex items-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
