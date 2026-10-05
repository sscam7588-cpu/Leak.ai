import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Leak,
  Subscription,
  ConnectedAccount,
  UserSettings,
  NotificationItem,
  ChatMessage,
  LeakCategory
} from '../types';
import {
  INITIAL_LEAKS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_CONNECTED_ACCOUNTS,
  INITIAL_USER_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type ActiveView = 
  | 'dashboard' 
  | 'leaks' 
  | 'subscriptions' 
  | 'money' 
  | 'time' 
  | 'weekly-report' 
  | 'ask-leak' 
  | 'privacy' 
  | 'settings' 
  | 'pricing';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  leaks: Leak[];
  subscriptions: Subscription[];
  connectedAccounts: ConnectedAccount[];
  settings: UserSettings;
  notifications: NotificationItem[];
  chatHistory: ChatMessage[];
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;
  selectedCategoryFilter: LeakCategory | 'all';
  setSelectedCategoryFilter: (cat: LeakCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeActionLeak: Leak | null;
  setActiveActionLeak: (leak: Leak | null) => void;
  
  // Computed metrics
  recoverableMoney: number;
  timeSavedMinutes: number;
  fixedCount: number;
  totalActiveLeaksCount: number;

  // Actions
  fixLeak: (leakId: string, notes?: string) => void;
  dismissLeak: (leakId: string) => void;
  cancelSubscription: (subId: string) => void;
  toggleConnectAccount: (accId: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
  isScanning: boolean;
  triggerScan: () => Promise<void>;
  resetAllData: () => void;
  exportDataJSON: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('leak_onboarding_completed') === 'true';
  });

  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [leaks, setLeaks] = useState<Leak[]>(() => {
    const saved = localStorage.getItem('leak_items');
    return saved ? JSON.parse(saved) : INITIAL_LEAKS;
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('leak_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(() => {
    const saved = localStorage.getItem('leak_accounts');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTED_ACCOUNTS;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('leak_settings');
    return saved ? JSON.parse(saved) : INITIAL_USER_SETTINGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('leak_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: "Good morning. I've finished auditing your 6 connected accounts. You have **$184 recoverable** and **7h 24m potential time saved** waiting across 4 urgent leaks. Ask me anything or let me know what you want to fix first.",
      timestamp: 'Just now',
    }
  ]);

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<LeakCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeActionLeak, setActiveActionLeak] = useState<Leak | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('leak_items', JSON.stringify(leaks));
  }, [leaks]);

  useEffect(() => {
    localStorage.setItem('leak_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('leak_accounts', JSON.stringify(connectedAccounts));
  }, [connectedAccounts]);

  useEffect(() => {
    localStorage.setItem('leak_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('leak_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('leak_onboarding_completed', String(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

  // Derived metrics
  const activeLeaks = leaks.filter((l) => l.status === 'active');
  const fixedCount = leaks.filter((l) => l.status === 'fixed').length;

  const recoverableMoney = activeLeaks.reduce((acc, curr) => acc + (curr.costAmount || 0), 0);
  const timeSavedMinutes = activeLeaks.reduce((acc, curr) => acc + (curr.timeAmountMinutes || 0), 0);

  const fixLeak = (leakId: string, notes?: string) => {
    setLeaks((prev) =>
      prev.map((item) => {
        if (item.id === leakId) {
          return {
            ...item,
            status: 'fixed',
            fixedAt: new Date().toLocaleDateString(),
            details: notes ? `${item.details || ''} [Resolved: ${notes}]` : item.details,
          };
        }
        return item;
      })
    );

    // If it's a subscription leak, update subscription list state too
    if (leakId === 'leak-adobe') {
      cancelSubscription('sub-adobe');
    }

    // Add confirmation notification
    const matched = leaks.find((l) => l.id === leakId);
    if (matched) {
      setNotifications((prev) => [
        {
          id: `fixed-${Date.now()}`,
          title: 'Leak fixed',
          message: `Successfully resolved: ${matched.title}`,
          type: matched.category === 'money' ? 'money' : 'system',
          read: false,
          timestamp: 'Just now',
        },
        ...prev,
      ]);
    }
  };

  const dismissLeak = (leakId: string) => {
    setLeaks((prev) =>
      prev.map((item) => (item.id === leakId ? { ...item, status: 'dismissed' } : item))
    );
  };

  const cancelSubscription = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === subId ? { ...sub, status: 'cancelled' } : sub))
    );
  };

  const toggleConnectAccount = (accId: string) => {
    setConnectedAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accId
          ? {
              ...acc,
              connected: !acc.connected,
              lastSync: !acc.connected ? 'Just now' : 'Disconnected',
            }
          : acc
      )
    );
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addChatMessage = async (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: msg.content,
      timestamp: 'Just now',
    };

    setChatHistory((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg.content,
          history: chatHistory,
          context: {
            userName: settings.name,
            recoverableMoney,
            timeSavedMinutes,
            activeLeaks: activeLeaks.map((l) => ({
              id: l.id,
              title: l.title,
              category: l.category,
              cost: l.costAmount,
              timeMin: l.timeAmountMinutes,
              action: l.actionLabel,
            })),
            subscriptions: subscriptions.map((s) => ({
              name: s.name,
              cost: s.cost,
              mightNotNeed: s.mightNotNeed,
              lastUsed: s.lastUsed,
            })),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatHistory((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            content: data.reply || "I've reviewed your leaks and queued the best actions.",
            timestamp: 'Just now',
          },
        ]);
      } else {
        throw new Error('Server returned non-200');
      }
    } catch (err) {
      // Fallback
      setChatHistory((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: `I've analyzed your data. You currently have **$${recoverableMoney.toFixed(2)}** in recoverable leaks and **${Math.floor(timeSavedMinutes / 60)}h ${timeSavedMinutes % 60}m** in time leaks. Your top priority is the $59.99 Adobe renewal tomorrow.`,
          timestamp: 'Just now',
        },
      ]);
    }
  };

  const triggerScan = async () => {
    setIsScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConnectedAccounts((prev) =>
      prev.map((acc) => (acc.connected ? { ...acc, lastSync: 'Just now', itemsAnalyzed: acc.itemsAnalyzed + 14 } : acc))
    );
    setIsScanning(false);
  };

  const resetAllData = () => {
    localStorage.clear();
    setLeaks(INITIAL_LEAKS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setConnectedAccounts(INITIAL_CONNECTED_ACCOUNTS);
    setSettings(INITIAL_USER_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setHasCompletedOnboarding(false);
  };

  const exportDataJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      user: settings,
      leaks,
      subscriptions,
      connectedAccounts,
      notifications,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LEAK-Export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        leaks,
        subscriptions,
        connectedAccounts,
        settings,
        notifications,
        chatHistory,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        activeActionLeak,
        setActiveActionLeak,
        recoverableMoney,
        timeSavedMinutes,
        fixedCount,
        totalActiveLeaksCount: activeLeaks.length,
        fixLeak,
        dismissLeak,
        cancelSubscription,
        toggleConnectAccount,
        updateSettings,
        markNotificationRead,
        markAllNotificationsRead,
        addChatMessage,
        isScanning,
        triggerScan,
        resetAllData,
        exportDataJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
