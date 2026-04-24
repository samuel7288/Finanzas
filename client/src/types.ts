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
export type TransactionsTabId = "all" | "income" | "expense" | "transfer";
export type TransactionChipId = "all" | "approved" | "pending" | "gmail" | "ignored";
export type TransactionKind = "income" | "expense" | "transfer";
export type SettingsTabId =
  | "profile"
  | "accounts"
  | "connections"
  | "notifications"
  | "security"
  | "preferences";
export type BudgetViewTabId = "general" | "daily";
export type ReportTabId =
  | "overview"
  | "expenses"
  | "income"
  | "accounts"
  | "comparisons"
  | "trends";
export type GoalCategoryTabId =
  | "all"
  | "savings"
  | "debt"
  | "investment"
  | "travel"
  | "education"
  | "home"
  | "custom";
export type AccountTabId =
  | "overview"
  | "banking"
  | "cards"
  | "cash"
  | "investments"
  | "loans"
  | "connections";
export type AccountKind = "bank" | "card" | "cash" | "investment" | "loan";
export type InvestmentTabId =
  | "overview"
  | "portfolio"
  | "assets"
  | "movements"
  | "performance"
  | "objectives";

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

export interface TransactionsTabData {
  id: TransactionsTabId;
  label: string;
  count: number;
}

export interface TransactionChipData {
  id: TransactionChipId;
  label: string;
  count: number;
  tone: "violet" | "green" | "amber" | "blue" | "muted";
}

export interface TransactionRowData {
  id: string;
  merchant: string;
  subtitle: string;
  dateLabel: string;
  category: string;
  categoryTone: string;
  accountLabel: string;
  paymentMethodLabel: string;
  amountLabel: string;
  positive: boolean;
  kind: TransactionKind;
  status: TransactionStatus;
  statusLabel: string;
  statusTone: "success" | "warning" | "muted";
  source: TransactionSource;
  sourceLabel?: string;
  confidencePercent?: number;
  detail: {
    totalLabel: string;
    categoryLabel: string;
    accountLabel: string;
    paymentMethodLabel: string;
    statusLabel: string;
    statusTone: "success" | "warning" | "muted";
    sourceLabel?: string;
    confidenceLabel?: string;
    fields: GmailDetailField[];
    products: GmailProductData[];
  };
}

export interface TransactionsPageModel {
  dateRangeLabel: string;
  tabs: TransactionsTabData[];
  chips: TransactionChipData[];
  rows: TransactionRowData[];
  categoryOptions: string[];
  accountOptions: string[];
  paymentMethodOptions: string[];
}

export interface SettingsTabData {
  id: SettingsTabId;
  label: string;
}

export interface LinkedAccountData {
  id: string;
  institution: string;
  subtitle: string;
  tone: string;
  statusLabel: string;
}

export interface ServiceConnectionData {
  id: string;
  name: string;
  email: string;
  connected: boolean;
}

export interface NotificationPreferenceData {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export interface SecurityItemData {
  id: string;
  title: string;
  subtitle?: string;
  statusLabel?: string;
  icon: string;
}

export interface ThemeOptionData {
  id: string;
  label: string;
  description: string;
}

export interface SettingsPageModel {
  dateRangeLabel: string;
  tabs: SettingsTabData[];
  profile: {
    name: string;
    email: string;
    phone: string;
    timezone: string;
    currency: string;
    language: string;
    picture?: string;
  };
  timezoneOptions: string[];
  currencyOptions: string[];
  languageOptions: string[];
  preferences: {
    defaultCurrency: string;
    dateFormat: string;
    timeFormat: string;
  };
  defaultCurrencyOptions: string[];
  dateFormatOptions: string[];
  timeFormatOptions: string[];
  themeOptions: ThemeOptionData[];
  linkedAccounts: LinkedAccountData[];
  services: ServiceConnectionData[];
  notifications: NotificationPreferenceData[];
  securityItems: SecurityItemData[];
}

export interface BudgetMetricData {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: string;
  accent: string;
}

export interface BudgetRowData {
  id: string;
  category: string;
  subtitle: string;
  budgetLabel: string;
  spentLabel: string;
  remainingLabel: string;
  remainingPositive: boolean;
  progress: number;
  statusLabel: string;
  statusTone: "success" | "warning" | "danger";
  icon: string;
  tone: string;
}

export interface BudgetDailyRowData {
  id: string;
  dateLabel: string;
  spentLabel: string;
  targetLabel: string;
  progress: number;
  statusLabel: string;
  statusTone: "success" | "warning" | "danger";
}

export interface BudgetSummaryData {
  totalLabel: string;
  spentLabel: string;
  remainingLabel: string;
  spentProgress: number;
  daysRemainingLabel: string;
}

export interface BudgetAlertData {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: "warning" | "danger";
}

export interface BudgetAdviceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: "green" | "violet" | "blue";
}

export interface BudgetQuickActionData {
  id: string;
  label: string;
  icon: string;
}

export interface BudgetChartRowData {
  id: string;
  label: string;
  budget: number;
  spent: number;
}

export interface BudgetViewTabData {
  id: BudgetViewTabId;
  label: string;
}

export interface BudgetsPageModel {
  monthLabel: string;
  viewTabs: BudgetViewTabData[];
  metrics: BudgetMetricData[];
  rows: BudgetRowData[];
  dailyRows: BudgetDailyRowData[];
  accountOptions: string[];
  summary: BudgetSummaryData;
  alerts: BudgetAlertData[];
  advice: BudgetAdviceData[];
  quickActions: BudgetQuickActionData[];
  chartRows: BudgetChartRowData[];
}

export interface ReportTabData {
  id: ReportTabId;
  label: string;
}

export interface ReportMetricData {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  icon: string;
  accent: string;
}

export interface ReportComparisonRowData {
  id: string;
  label: string;
  income: number;
  expense: number;
  savings: number;
}

export interface ReportCategoryData {
  id: string;
  label: string;
  amountLabel: string;
  percentageLabel: string;
  color: string;
  value: number;
}

export interface ReportTrendPointData {
  id: string;
  label: string;
  value: number;
  movingAverage: number;
}

export interface ReportAverageCategoryData {
  id: string;
  label: string;
  value: number;
  valueLabel: string;
}

export interface ReportAnnualSummaryData {
  incomeLabel: string;
  expenseLabel: string;
  savingsLabel: string;
  savingsRateLabel: string;
  savingsRateProgress: number;
}

export interface ReportsPageModel {
  dateRangeLabel: string;
  tabs: ReportTabData[];
  metrics: ReportMetricData[];
  accountOptions: string[];
  categoryOptions: string[];
  comparisonRows: ReportComparisonRowData[];
  comparisonSummary: Array<{
    id: string;
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  }>;
  categories: ReportCategoryData[];
  trendPoints: ReportTrendPointData[];
  averageCategories: ReportAverageCategoryData[];
  annualSummary: ReportAnnualSummaryData;
}

export interface GoalCategoryTabData {
  id: GoalCategoryTabId;
  label: string;
}

export interface GoalMetricData {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: string;
  accent: string;
  progress?: number;
}

export interface GoalRowData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  amountSavedLabel: string;
  targetLabel: string;
  progress: number;
  progressLabel: string;
  monthlyContributionLabel: string;
  dueDateLabel: string;
  imageTone: "travel" | "personal" | "home" | "education" | "savings";
}

export interface GoalSummarySliceData {
  id: string;
  label: string;
  amountLabel: string;
  percentageLabel: string;
  color: string;
  value: number;
}

export interface UpcomingGoalData {
  id: string;
  title: string;
  subtitle: string;
  progressLabel: string;
  tone: string;
}

export interface GoalsPageModel {
  tabs: GoalCategoryTabData[];
  metrics: GoalMetricData[];
  rows: GoalRowData[];
  summarySlices: GoalSummarySliceData[];
  upcomingGoals: UpcomingGoalData[];
  recommendation: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

export interface AccountTabData {
  id: AccountTabId;
  label: string;
}

export interface AccountMetricData {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: string;
  accent: string;
}

export interface AccountDistributionSliceData {
  id: string;
  label: string;
  amountLabel: string;
  percentageLabel: string;
  color: string;
  value: number;
}

export interface AccountConnectionData {
  id: string;
  badgeLabel: string;
  tone: string;
}

export interface AccountMovementData {
  id: string;
  merchant: string;
  dateLabel: string;
  amountLabel: string;
  positive: boolean;
}

export interface AccountInfoFieldData {
  label: string;
  value: string;
}

export interface AccountRowData {
  id: string;
  name: string;
  maskedNumber: string;
  kind: AccountKind;
  typeLabel: string;
  typeTone: string;
  institution: string;
  balanceValue: number;
  balanceLabel: string;
  positive: boolean;
  statusLabel: string;
  statusTone: "success" | "muted";
  badgeLabel: string;
  badgeTone: string;
  availableBalanceLabel: string;
  accountTypeLabel: string;
  recentMovements: AccountMovementData[];
  infoFields: AccountInfoFieldData[];
}

export interface AccountsPageModel {
  dateRangeLabel: string;
  tabs: AccountTabData[];
  metrics: AccountMetricData[];
  rows: AccountRowData[];
  typeOptions: string[];
  distribution: AccountDistributionSliceData[];
  connections: AccountConnectionData[];
}

export interface InvestmentTabData {
  id: InvestmentTabId;
  label: string;
}

export interface InvestmentMetricData {
  id: string;
  label: string;
  value: string;
  helper: string;
  trendLabel?: string;
  trendPositive?: boolean;
  icon: string;
  accent: string;
}

export interface InvestmentPointData {
  id: string;
  label: string;
  value: number;
}

export interface InvestmentDistributionSliceData {
  id: string;
  label: string;
  amountLabel: string;
  percentageLabel: string;
  color: string;
  value: number;
}

export interface InvestmentPositionData {
  id: string;
  name: string;
  symbol: string;
  typeLabel: string;
  accountLabel: string;
  accountTone: string;
  quantityLabel: string;
  averagePriceLabel: string;
  currentValueLabel: string;
  returnLabel: string;
  returnPercentLabel: string;
  returnPositive: boolean;
  portfolioShareLabel: string;
  badgeLabel: string;
  badgeTone: string;
  detail: {
    statusLabel: string;
    statusTone: "success" | "warning" | "muted";
    totalValueLabel: string;
    totalReturnLabel: string;
    totalReturnPercentLabel: string;
    totalReturnPositive: boolean;
    quantityLabel: string;
    averagePriceLabel: string;
    currentPriceLabel: string;
    portfolioShareLabel: string;
    accountLabel: string;
    updatedAtLabel: string;
    historyPoints: InvestmentPointData[];
    noteLines: string[];
  };
}

export interface InvestmentPerformanceItemData {
  id: string;
  label: string;
  symbol: string;
  metricLabel: string;
  positive: boolean;
}

export interface InvestmentIncomeItemData {
  id: string;
  label: string;
  symbol: string;
  dateLabel: string;
  amountLabel: string;
}

export interface InvestmentContributionItemData {
  id: string;
  label: string;
  dateLabel: string;
  amountLabel: string;
  positive: boolean;
}

export interface InvestmentsPageModel {
  tabs: InvestmentTabData[];
  accountOptions: string[];
  typeOptions: string[];
  metrics: InvestmentMetricData[];
  portfolioPoints: InvestmentPointData[];
  distribution: InvestmentDistributionSliceData[];
  positions: InvestmentPositionData[];
  bestPerformers: InvestmentPerformanceItemData[];
  worstPerformers: InvestmentPerformanceItemData[];
  upcomingIncome: InvestmentIncomeItemData[];
  contributions: InvestmentContributionItemData[];
}
