import { IconName } from "./icons";
import {
  BudgetItemData,
  CategoryItemData,
  DashboardModel,
  GmailStatus,
  GoalItemData,
  InsightCardData,
  MetricCardData,
  NavItem,
  RecentTransactionData,
  ReviewItemData,
  Transaction
} from "./types";

export const categories = [
  "Compras",
  "Alimentacion",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Vivienda",
  "Viajes",
  "Ingreso",
  "Otros"
];

const navItems: NavItem[] = [
  { id: "summary", label: "Resumen", icon: "home", active: true },
  { id: "transactions", label: "Transacciones", icon: "transactions" },
  { id: "budgets", label: "Presupuestos", icon: "budgets" },
  { id: "goals", label: "Metas", icon: "goals" },
  { id: "reports", label: "Reportes", icon: "reports" },
  { id: "accounts", label: "Cuentas", icon: "accounts" },
  { id: "investments", label: "Inversiones", icon: "investments" },
  { id: "alerts", label: "Alertas", icon: "alerts" },
  { id: "settings", label: "Configuracion", icon: "settings" }
];

const metricCards: MetricCardData[] = [
  {
    id: "balance",
    label: "Saldo total",
    value: "$24,580.50",
    delta: "8.5% vs. Abril",
    deltaPositive: true,
    icon: "summary",
    accent: "#33d69f",
    series: [8, 14, 12, 18, 24, 16, 26, 30, 42, 38, 48, 55]
  },
  {
    id: "income",
    label: "Ingresos",
    value: "$38,250.00",
    delta: "12.3% vs. Abril",
    deltaPositive: true,
    icon: "income",
    accent: "#2e74ff",
    series: [10, 18, 28, 22, 30, 40, 34, 42, 48, 60, 54, 68]
  },
  {
    id: "expense",
    label: "Gastos",
    value: "$13,669.50",
    delta: "5.6% vs. Abril",
    deltaPositive: false,
    icon: "expense",
    accent: "#ff4c88",
    series: [12, 20, 15, 24, 18, 26, 20, 30, 24, 36, 34, 42]
  },
  {
    id: "savings",
    label: "Ahorro",
    value: "$8,930.50",
    delta: "15.8% vs. Abril",
    deltaPositive: true,
    icon: "savings",
    accent: "#14c8c0",
    series: [6, 10, 9, 12, 12, 18, 20, 19, 24, 32, 33, 40]
  }
];

const budgetItems: BudgetItemData[] = [
  {
    id: "food",
    title: "Alimentacion",
    subtitle: "$420.00 de $600.00",
    progress: 0.7,
    color: "#2ed39b"
  },
  {
    id: "transport",
    title: "Transporte",
    subtitle: "$135.00 de $300.00",
    progress: 0.45,
    color: "#ffbe2f"
  },
  {
    id: "fun",
    title: "Entretenimiento",
    subtitle: "$180.00 de $200.00",
    progress: 0.9,
    color: "#ff5578"
  }
];

const goalItems: GoalItemData[] = [
  {
    id: "trip",
    title: "Viaje a Japon",
    amountLabel: "$2,880.00 de $4,000.00",
    timeLabel: "Quedan 3 meses",
    progress: 0.72,
    color: "#2f9cff",
    icon: "investments"
  },
  {
    id: "emergency",
    title: "Fondo de emergencia",
    amountLabel: "$1,200.00 de $3,000.00",
    timeLabel: "Quedan 6 meses",
    progress: 0.4,
    color: "#7e58ff",
    icon: "goals"
  },
  {
    id: "home",
    title: "Casa propia",
    amountLabel: "$8,000.00 de $28,000.00",
    timeLabel: "Quedan 18 meses",
    progress: 0.28,
    color: "#52c5d9",
    icon: "home"
  },
  {
    id: "add",
    title: "Nueva meta",
    amountLabel: "",
    timeLabel: "",
    progress: 0,
    color: "#2a3246",
    icon: "summary",
    isAddCard: true
  }
];

const insightItems: InsightCardData[] = [
  {
    id: "food-alert",
    title: "Gasto en alimentacion alto",
    description: "Has gastado un 25% mas en alimentacion que el mes pasado.",
    accentValue: "Ver detalles",
    icon: "goals",
    tone: "violet"
  },
  {
    id: "savings-tip",
    title: "Ahorro posible",
    description: "Podrias ahorrar $120.00 si mantienes el ritmo de esta semana.",
    accentValue: "+$120.00",
    icon: "summary",
    tone: "green"
  }
];

const balanceSeries = [8, 14, 13, 26, 24, 38, 40, 48, 50, 55, 46, 44, 53, 51, 56, 58, 62, 78, 82, 95];

const seededCategories: CategoryItemData[] = [
  {
    id: "housing",
    label: "Vivienda",
    amountLabel: "$4,250.00",
    percentageLabel: "31.1%",
    color: "#2f6ef9",
    value: 4250
  },
  {
    id: "food",
    label: "Alimentacion",
    amountLabel: "$2,850.00",
    percentageLabel: "20.8%",
    color: "#1fd1b2",
    value: 2850
  },
  {
    id: "transport",
    label: "Transporte",
    amountLabel: "$1,850.00",
    percentageLabel: "13.5%",
    color: "#ffb629",
    value: 1850
  },
  {
    id: "entertainment",
    label: "Entretenimiento",
    amountLabel: "$1,200.00",
    percentageLabel: "8.8%",
    color: "#ff7a45",
    value: 1200
  },
  {
    id: "health",
    label: "Salud",
    amountLabel: "$1,050.00",
    percentageLabel: "7.7%",
    color: "#ff5ba8",
    value: 1050
  },
  {
    id: "others",
    label: "Otros",
    amountLabel: "$2,469.50",
    percentageLabel: "18.1%",
    color: "#7d4dff",
    value: 2469.5
  }
];

const previewTransactions: Transaction[] = [
  createTransaction("preview-amazon", "Amazon.com", 45.99, "Compras", "2026-04-23T09:14:00Z", "pending", "gmail", 0.82, "Pedido #114-3947002-1684236"),
  createTransaction("preview-uber", "Uber", 8.5, "Transporte", "2026-04-22T23:32:00Z", "pending", "gmail", 0.76, "Viaje del 30 de mayo"),
  createTransaction("preview-netflix", "Netflix", 15.99, "Entretenimiento", "2026-04-22T08:03:00Z", "pending", "gmail", 0.93, "Suscripcion mensual"),
  createTransaction("preview-starbucks", "Starbucks", 6.75, "Alimentacion", "2026-04-21T16:42:00Z", "pending", "gmail", 0.71, "Compra en tienda"),
  createTransaction("preview-airbnb", "Airbnb", 120, "Viajes", "2026-04-20T19:21:00Z", "pending", "gmail", 0.67, "Reserva #HM2K39F"),
  createTransaction("preview-supermarket", "Supermercado", 85.4, "Alimentacion", "2026-04-19T14:35:00Z", "approved", "manual", 1, "Compra registrada"),
  createTransaction("preview-salary", "Salario", 1800, "Ingreso", "2026-04-18T09:20:00Z", "approved", "manual", 1, "Deposito mensual"),
  createTransaction("preview-freelance", "Freelance Project", 350, "Ingreso", "2026-04-17T13:10:00Z", "approved", "manual", 1, "Pago recibido"),
  createTransaction("preview-pharmacy", "Farmacia", 23.9, "Salud", "2026-04-16T16:24:00Z", "approved", "manual", 1, "Compra registrada"),
  createTransaction("preview-power", "Luz", 60, "Vivienda", "2026-04-15T10:12:00Z", "approved", "manual", 1, "Pago automatico")
];

export function createPreviewTransactions() {
  return previewTransactions.map((transaction) => ({ ...transaction }));
}

export function buildDashboardModel(
  transactions: Transaction[],
  gmailStatus: GmailStatus | null,
  isPreview: boolean
): DashboardModel {
  const displayName = gmailStatus?.name || "Samuel";
  const displayEmail = gmailStatus?.email || "samuel@gmail.com";

  return {
    userName: getFirstName(displayName),
    subtitle: "Aqui tienes el resumen de tus finanzas",
    dateRangeLabel: "1 - 31 Mayo 2024",
    navItems,
    metrics: metricCards,
    reviewItems: buildReviewItems(transactions),
    recentTransactions: buildRecentTransactions(transactions),
    budgets: budgetItems,
    categories: buildCategoryBreakdown(transactions),
    balanceSeries,
    goals: goalItems,
    insights: insightItems,
    profile: {
      name: displayName,
      email: displayEmail
    },
    connectedLabel: getConnectedLabel(gmailStatus),
    connectedHelper: getConnectedHelper(gmailStatus),
    connectionState: getConnectionState(gmailStatus),
    isPreview
  };
}

function buildReviewItems(transactions: Transaction[]): ReviewItemData[] {
  return transactions
    .filter((transaction) => transaction.source === "gmail" && transaction.status === "pending")
    .sort((left, right) => sortByDate(right.purchasedAt, left.purchasedAt))
    .slice(0, 5)
    .map((transaction) => ({
      id: transaction.id,
      merchant: transaction.merchant,
      subtitle: transaction.emailSubject ?? "Compra detectada en Gmail",
      timeLabel: formatRelativeDate(transaction.purchasedAt),
      amountLabel: formatMoney(transaction.amount, transaction.currency),
      category: transaction.category,
      confidence: transaction.confidence,
      actionLabel: transaction.confidence >= 0.9 ? "Automatico" : "Registrar",
      actionTone: transaction.confidence >= 0.9 ? "success" : "primary"
    }));
}

function buildRecentTransactions(transactions: Transaction[]): RecentTransactionData[] {
  return transactions
    .filter((transaction) => transaction.status !== "pending")
    .sort((left, right) => sortByDate(right.purchasedAt, left.purchasedAt))
    .slice(0, 7)
    .map((transaction) => ({
      id: transaction.id,
      merchant: transaction.merchant,
      dateLabel: formatTransactionDate(transaction.purchasedAt),
      category: transaction.category,
      amountLabel: `${isIncome(transaction) ? "+" : "-"}${formatMoney(transaction.amount, transaction.currency)}`,
      positive: isIncome(transaction)
    }));
}

function buildCategoryBreakdown(transactions: Transaction[]): CategoryItemData[] {
  const approvedExpenses = transactions.filter(
    (transaction) => transaction.status === "approved" && !isIncome(transaction)
  );

  if (approvedExpenses.length < 3) {
    return seededCategories;
  }

  const palette = ["#2f6ef9", "#1fd1b2", "#ffb629", "#ff7a45", "#ff5ba8", "#7d4dff"];
  const grouped = new Map<string, number>();

  for (const transaction of approvedExpenses) {
    grouped.set(
      transaction.category,
      (grouped.get(transaction.category) ?? 0) + transaction.amount
    );
  }

  const total = Array.from(grouped.values()).reduce((sum, value) => sum + value, 0);

  return Array.from(grouped.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([label, value], index) => ({
      id: label.toLowerCase(),
      label,
      amountLabel: formatMoney(value, "USD"),
      percentageLabel: `${((value / total) * 100).toFixed(1)}%`,
      color: palette[index % palette.length],
      value
    }));
}

function createTransaction(
  id: string,
  merchant: string,
  amount: number,
  category: string,
  purchasedAt: string,
  status: Transaction["status"],
  source: Transaction["source"],
  confidence: number,
  emailSubject: string
): Transaction {
  return {
    id,
    merchant,
    amount,
    category,
    purchasedAt,
    status,
    source,
    confidence,
    currency: "USD",
    emailSubject,
    createdAt: purchasedAt,
    updatedAt: purchasedAt
  };
}

function isIncome(transaction: Transaction) {
  return transaction.category === "Ingreso";
}

function getConnectedLabel(gmailStatus: GmailStatus | null) {
  if (!gmailStatus?.configured) return "Gmail";
  if (!gmailStatus.connected) return "Gmail";
  return "Gmail";
}

function getConnectedHelper(gmailStatus: GmailStatus | null) {
  if (!gmailStatus?.configured) return "Falta configurar credenciales";
  if (!gmailStatus.connected) return "Listo para conectar";
  return "Monitoreando correos en tiempo real";
}

function getConnectionState(gmailStatus: GmailStatus | null): DashboardModel["connectionState"] {
  if (!gmailStatus?.configured) return "setup";
  if (!gmailStatus.connected) return "ready";
  return "active";
}

function sortByDate(left: string, right: string) {
  return new Date(left).getTime() - new Date(right).getTime();
}

function formatRelativeDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function formatTransactionDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

function getFirstName(name: string) {
  return name.split(" ").filter(Boolean)[0] ?? name;
}
