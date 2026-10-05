export type LeakCategory = 'money' | 'time' | 'deadlines' | 'communication' | 'travel';
export type LeakSeverity = 'critical' | 'high' | 'medium' | 'low';
export type LeakStatus = 'active' | 'in_progress' | 'fixed' | 'dismissed';

export interface Leak {
  id: string;
  title: string;
  category: LeakCategory;
  severity: LeakSeverity;
  costAmount?: number;
  timeAmountMinutes?: number;
  whatHappened: string;
  whyItMatters: string;
  recommendedAction: string;
  actionLabel: string;
  actionType: 'cancel_subscription' | 'track_refund' | 'draft_reply' | 'create_reminder' | 'automate_task' | 'claim_credit';
  dueDate?: string;
  source: string;
  status: LeakStatus;
  dateDetected: string;
  fixedAt?: string;
  details?: string;
}

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingPeriod: 'monthly' | 'yearly';
  renewalDate: string;
  lastUsed: string;
  daysSinceLastUsed?: number;
  mightNotNeed: boolean;
  reasonForFlag?: string;
  priceHistory: { date: string; amount: number }[];
  status: 'active' | 'canceling' | 'cancelled';
  category: string;
}

export interface ConnectedAccount {
  id: string;
  name: string;
  provider: string;
  type: 'email' | 'calendar' | 'financial' | 'travel' | 'payment';
  connected: boolean;
  lastSync: string;
  itemsAnalyzed: number;
  permissions: string[];
  description: string;
}

export interface UserSettings {
  name: string;
  email: string;
  hourlyRate: number; // e.g. 50
  currency: string; // '$', '€', '£', '¥'
  protectedAreas: string[];
  notificationIntensity: 'minimal' | 'balanced' | 'proactive';
  isPro: boolean;
  theme: 'dark' | 'light';
  scanCadence: 'continuous' | 'daily' | 'weekly';
  dataRetentionMonths: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'money' | 'deadline' | 'time' | 'system';
  read: boolean;
  timestamp: string;
  leakId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedLeakIds?: string[];
}
