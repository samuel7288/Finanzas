export type TransactionStatus = "pending" | "approved" | "ignored";
export type TransactionSource = "gmail" | "manual";

export interface Transaction {
  id: string;
  source: TransactionSource;
  sourceMessageId?: string;
  emailSubject?: string;
  emailFrom?: string;
  amount: number;
  currency: string;
  merchant: string;
  purchasedAt: string;
  category: string;
  status: TransactionStatus;
  confidence: number;
  rawText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GmailStatus {
  configured: boolean;
  connected: boolean;
  email?: string;
  name?: string;
  picture?: string;
  lastSyncAt?: string;
  dataFile: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  icon: string;
  accent: string;
  series: number[];
}

export interface ReviewItemData {
  id: string;
  merchant: string;
  subtitle: string;
  timeLabel: string;
  amountLabel: string;
  category: string;
  confidence: number;
  actionLabel: string;
  actionTone: "primary" | "success";
}

export interface RecentTransactionData {
  id: string;
  merchant: string;
  dateLabel: string;
  category: string;
  amountLabel: string;
  positive: boolean;
}

export interface BudgetItemData {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  color: string;
}

export interface CategoryItemData {
  id: string;
  label: string;
  amountLabel: string;
  percentageLabel: string;
  color: string;
  value: number;
}

export interface GoalItemData {
  id: string;
  title: string;
  amountLabel: string;
  timeLabel: string;
  progress: number;
  color: string;
  icon: string;
  isAddCard?: boolean;
}

export interface InsightCardData {
  id: string;
  title: string;
  description: string;
  accentValue: string;
  icon: string;
  tone: "violet" | "green";
}

export interface SidebarProfileData {
  name: string;
  email: string;
}

export interface DashboardModel {
  userName: string;
  subtitle: string;
  dateRangeLabel: string;
  navItems: NavItem[];
  metrics: MetricCardData[];
  reviewItems: ReviewItemData[];
  recentTransactions: RecentTransactionData[];
  budgets: BudgetItemData[];
  categories: CategoryItemData[];
  balanceSeries: number[];
  goals: GoalItemData[];
  insights: InsightCardData[];
  profile: SidebarProfileData;
  connectedLabel: string;
  connectedHelper: string;
  connectionState: "active" | "ready" | "setup";
  isPreview: boolean;
}
