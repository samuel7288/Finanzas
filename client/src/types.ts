export type TransactionStatus = "pending" | "approved" | "ignored";
export type TransactionSource = "gmail" | "manual";
export type AppRouteId =
  | "summary"
  | "gmail"
  | "transactions"
  | "budgets"
  | "goals"
  | "reports"
  | "accounts"
  | "investments"
  | "alerts"
  | "settings";
export type GmailTabId = "pending" | "registered" | "ignored" | "rules";

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
  id: AppRouteId;
  label: string;
  icon: string;
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

export interface AppShellModel {
  userName: string;
  dateRangeLabel: string;
  navItems: NavItem[];
  profile: SidebarProfileData;
  connectedLabel: string;
  connectedHelper: string;
  connectionState: "active" | "ready" | "setup";
  isPreview: boolean;
}

export interface SummaryPageModel {
  userName: string;
  subtitle: string;
  dateRangeLabel: string;
  metrics: MetricCardData[];
  reviewItems: ReviewItemData[];
  recentTransactions: RecentTransactionData[];
  budgets: BudgetItemData[];
  categories: CategoryItemData[];
  balanceSeries: number[];
  goals: GoalItemData[];
  insights: InsightCardData[];
}

export interface GmailTabData {
  id: GmailTabId;
  label: string;
  count: number;
}

export interface GmailDetailField {
  label: string;
  value: string;
}

export interface GmailProductData {
  id: string;
  name: string;
  amountLabel: string;
}

export interface GmailRowData {
  id: string;
  merchant: string;
  subtitle: string;
  emailFrom: string;
  dateLabel: string;
  amountLabel: string;
  category: string;
  categoryTone: string;
  accountLabel: string;
  confidencePercent: number;
  confidenceTone: "high" | "medium" | "low";
  status: TransactionStatus;
  statusLabel: string;
  isAutomatic: boolean;
  createRuleSuggested: boolean;
  detail: {
    datetimeLabel: string;
    totalLabel: string;
    fields: GmailDetailField[];
    products: GmailProductData[];
  };
}

export interface GmailPageModel {
  dateRangeLabel: string;
  tabs: GmailTabData[];
  rows: GmailRowData[];
  pendingCount: number;
  categoryOptions: string[];
  accountOptions: string[];
}
