import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { LeaksView } from './components/LeaksView';
import { SubscriptionsView } from './components/SubscriptionsView';
import { MoneyView } from './components/MoneyView';
import { TimeView } from './components/TimeView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { AskLeakView } from './components/AskLeakView';
import { PrivacyCenterView } from './components/PrivacyCenterView';
import { SettingsView } from './components/SettingsView';
import { PricingView } from './components/PricingModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AiActionModal } from './components/AiActionModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, hasCompletedOnboarding, setHasCompletedOnboarding, setActiveView } = useApp();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'leaks':
        return <LeaksView />;
      case 'subscriptions':
        return <SubscriptionsView />;
      case 'money':
        return <MoneyView />;
      case 'time':
        return <TimeView />;
      case 'weekly-report':
        return <WeeklyReportView />;
      case 'ask-leak':
        return <AskLeakView />;
      case 'privacy':
        return <PrivacyCenterView />;
      case 'settings':
        return <SettingsView />;
      case 'pricing':
        return <PricingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Top Bar Navigation */}
      <Navigation onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1 w-full pb-16">
        {renderActiveView()}
      </main>

      {/* Minimal Apple-Grade Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-4 sm:px-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-neutral-300">LEAK</span>
            <span>—</span>
            <span>Find what you're losing. Fix it.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('privacy')}
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Architecture
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className="hover:text-neutral-300 transition-colors"
            >
              Data Retention
            </button>
            <button
              onClick={() => setActiveView('pricing')}
              className="hover:text-neutral-300 transition-colors"
            >
              Membership
            </button>
          </div>
        </div>
      </footer>

      {/* Onboarding Wizard (auto-opens if not yet completed) */}
      <OnboardingModal
        isOpen={!hasCompletedOnboarding}
        onClose={() => setHasCompletedOnboarding(true)}
      />

      {/* Universal Search Modal (Cmd+K) */}
      <SearchModal />

      {/* AI Action Execution & Safety Confirmation Modal */}
      <AiActionModal />

      {/* High-Signal Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
