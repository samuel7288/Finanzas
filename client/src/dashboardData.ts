import {
  AppRouteId,
  AppShellModel,
  BudgetItemData,
  CategoryItemData,
  GmailPageModel,
  GmailRowData,
  GmailStatus,
  GoalItemData,
  InsightCardData,
  MetricCardData,
  NavItem,
  RecentTransactionData,
  ReviewItemData,
  SummaryPageModel,
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
  "Tecnologia",
  "Otros"
];

const accountOptions = [
  "Tarjeta de credito - 4242",
  "Tarjeta de debito - 5678",
  "Cuenta bancaria - 1234"
];

const navItems: NavItem[] = [
  { id: "summary", label: "Resumen", icon: "home" },
  { id: "gmail", label: "Compras (Gmail)", icon: "gmail" },
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
  createTransaction("preview-amazon", "Amazon.com", 45.99, "Compras", "2026-04-23T09:14:00Z", "pending", "gmail", 0.95, "Pedido #114-3947002-1684236"),
  createTransaction("preview-uber", "Uber", 8.5, "Transporte", "2026-04-22T23:32:00Z", "pending", "gmail", 0.9, "Viaje del 30 de mayo"),
  createTransaction("preview-netflix", "Netflix", 15.99, "Entretenimiento", "2026-04-22T08:03:00Z", "pending", "gmail", 0.99, "Suscripcion mensual"),
  createTransaction("preview-starbucks", "Starbucks", 6.75, "Alimentacion", "2026-04-21T16:42:00Z", "pending", "gmail", 0.85, "Compra en tienda"),
  createTransaction("preview-airbnb", "Airbnb", 120, "Viajes", "2026-04-20T19:21:00Z", "pending", "gmail", 0.92, "Reserva #HM2K39F"),
  createTransaction("preview-apple", "Apple.com/Bill", 9.99, "Tecnologia", "2026-04-20T18:15:00Z", "pending", "gmail", 0.88, "Factura mensual"),
  createTransaction("preview-walmart", "Walmart", 72.4, "Compras", "2026-04-19T15:11:00Z", "pending", "gmail", 0.8, "Compra en linea"),
  createTransaction("preview-spotify", "Spotify", 4.99, "Entretenimiento", "2026-04-19T09:09:00Z", "pending", "gmail", 0.98, "Suscripcion mensual"),
  createTransaction("preview-amazon-old", "Amazon.com", 39.9, "Compras", "2026-04-12T09:14:00Z", "approved", "gmail", 0.96, "Pedido #114-1111111-1234567"),
  createTransaction("preview-gym-ignored", "Gym Pro", 25, "Salud", "2026-04-10T12:00:00Z", "ignored", "gmail", 0.74, "Cobro no recurrente"),
  createTransaction("preview-supermarket", "Supermercado", 85.4, "Alimentacion", "2026-04-19T14:35:00Z", "approved", "manual", 1, "Compra registrada"),
  createTransaction("preview-salary", "Salario", 1800, "Ingreso", "2026-04-18T09:20:00Z", "approved", "manual", 1, "Deposito mensual"),
  createTransaction("preview-freelance", "Freelance Project", 350, "Ingreso", "2026-04-17T13:10:00Z", "approved", "manual", 1, "Pago recibido"),
  createTransaction("preview-pharmacy", "Farmacia", 23.9, "Salud", "2026-04-16T16:24:00Z", "approved", "manual", 1, "Compra registrada"),
  createTransaction("preview-power", "Luz", 60, "Vivienda", "2026-04-15T10:12:00Z", "approved", "manual", 1, "Pago automatico")
];

export function createPreviewTransactions() {
  return previewTransactions.map((transaction) => ({ ...transaction }));
}

export function buildAppShellModel(
  gmailStatus: GmailStatus | null,
  currentRoute: AppRouteId,
  isPreview: boolean
): AppShellModel {
  const displayName = gmailStatus?.name || "Samuel";
  const displayEmail = gmailStatus?.email || "samuel@gmail.com";

  return {
    userName: getFirstName(displayName),
    dateRangeLabel: "1 - 31 Mayo 2024",
    navItems: navItems.map((item) => ({ ...item, id: item.id === currentRoute ? item.id : item.id })),
    profile: {
      name: displayName,
      email: displayEmail
    },
    connectedLabel: "Gmail",
    connectedHelper: getConnectedHelper(gmailStatus),
    connectionState: getConnectionState(gmailStatus),
    isPreview
  };
}

export function buildSummaryModel(
  transactions: Transaction[],
  gmailStatus: GmailStatus | null
): SummaryPageModel {
  const displayName = gmailStatus?.name || "Samuel";

  return {
    userName: getFirstName(displayName),
    subtitle: "Aqui tienes el resumen de tus finanzas",
    dateRangeLabel: "1 - 31 Mayo 2024",
    metrics: metricCards,
    reviewItems: buildReviewItems(transactions),
    recentTransactions: buildRecentTransactions(transactions),
    budgets: budgetItems,
    categories: buildCategoryBreakdown(transactions),
    balanceSeries,
    goals: goalItems,
    insights: insightItems
  };
}

export function buildGmailPageModel(transactions: Transaction[]): GmailPageModel {
  const gmailTransactions = transactions
    .filter((transaction) => transaction.source === "gmail")
    .sort((left, right) => new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime());
  const rows = gmailTransactions.map((transaction) => buildGmailRow(transaction));

  return {
    dateRangeLabel: "1 - 31 Mayo 2024",
    tabs: [
      { id: "pending", label: "Pendientes", count: rows.filter((row) => row.status === "pending").length },
      { id: "registered", label: "Registradas", count: rows.filter((row) => row.status === "approved").length },
      { id: "ignored", label: "Ignoradas", count: rows.filter((row) => row.status === "ignored").length },
      { id: "rules", label: "Reglas", count: rows.filter((row) => row.isAutomatic || row.createRuleSuggested).length }
    ],
    rows,
    pendingCount: rows.filter((row) => row.status === "pending").length,
    categoryOptions: ["Todas las categorias", ...categories],
    accountOptions: ["Todas las cuentas", ...accountOptions]
  };
}

function buildReviewItems(transactions: Transaction[]): ReviewItemData[] {
  return transactions
    .filter((transaction) => transaction.source === "gmail" && transaction.status === "pending")
    .sort((left, right) => new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime())
    .slice(0, 5)
    .map((transaction) => ({
      id: transaction.id,
      merchant: transaction.merchant,
      subtitle: transaction.emailSubject ?? "Compra detectada en Gmail",
      timeLabel: formatRelativeDate(transaction.purchasedAt),
      amountLabel: formatSignedAmount(transaction.amount, transaction.currency, false),
      category: transaction.category,
      confidence: transaction.confidence,
      actionLabel: transaction.confidence >= 0.95 ? "Automatico" : "Registrar",
      actionTone: transaction.confidence >= 0.95 ? "success" : "primary"
    }));
}

function buildRecentTransactions(transactions: Transaction[]): RecentTransactionData[] {
  return transactions
    .filter((transaction) => transaction.status !== "pending")
    .sort((left, right) => new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime())
    .slice(0, 7)
    .map((transaction) => ({
      id: transaction.id,
      merchant: transaction.merchant,
      dateLabel: formatTransactionDate(transaction.purchasedAt),
      category: transaction.category,
      amountLabel: formatSignedAmount(transaction.amount, transaction.currency, isIncome(transaction)),
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

function buildGmailRow(transaction: Transaction): GmailRowData {
  const confidencePercent = Math.round(transaction.confidence * 100);
  const accountLabel = getSuggestedAccount(transaction);
  const products = getSuggestedProducts(transaction.merchant, transaction.amount, transaction.currency);

  return {
    id: transaction.id,
    merchant: transaction.merchant,
    subtitle: transaction.emailSubject ?? "Compra detectada en Gmail",
    emailFrom: transaction.emailFrom ?? getDefaultEmailFrom(transaction.merchant),
    dateLabel: formatDateWithTime(transaction.purchasedAt),
    amountLabel: formatSignedAmount(transaction.amount, transaction.currency, false),
    category: transaction.category,
    categoryTone: getCategoryTone(transaction.category),
    accountLabel,
    confidencePercent,
    confidenceTone:
      confidencePercent >= 90 ? "high" : confidencePercent >= 80 ? "medium" : "low",
    status: transaction.status,
    statusLabel: getStatusLabel(transaction.status),
    isAutomatic: transaction.confidence >= 95 / 100,
    createRuleSuggested: transaction.confidence >= 90 / 100,
    detail: {
      datetimeLabel: formatFullDate(transaction.purchasedAt),
      totalLabel: `${formatSignedAmount(transaction.amount, transaction.currency, false)} ${transaction.currency}`.replace("--", "-"),
      fields: [
        { label: "Comercio", value: transaction.merchant },
        { label: "Fecha", value: formatFullDate(transaction.purchasedAt) },
        { label: "Metodo de pago", value: accountLabel },
        { label: "Numero de pedido", value: transaction.emailSubject ?? "Sin numero visible" },
        { label: "Correo origen", value: transaction.emailFrom ?? getDefaultEmailFrom(transaction.merchant) }
      ],
      products
    }
  };
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
    emailFrom: getDefaultEmailFrom(merchant),
    createdAt: purchasedAt,
    updatedAt: purchasedAt
  };
}

function getSuggestedAccount(transaction: Transaction) {
  const merchant = transaction.merchant.toLowerCase();

  if (merchant.includes("uber") || merchant.includes("walmart") || merchant.includes("spotify")) {
    return "Cuenta bancaria - 1234";
  }

  if (merchant.includes("starbucks")) {
    return "Tarjeta de debito - 5678";
  }

  return "Tarjeta de credito - 4242";
}

function getSuggestedProducts(merchant: string, amount: number, currency: string) {
  const label = merchant.toLowerCase();

  if (label.includes("amazon")) {
    return [
      { id: "p1", name: "Audifonos inalambricos", amountLabel: formatMoney(29.99, currency) },
      { id: "p2", name: "Cable USB-C", amountLabel: formatMoney(amount - 29.99, currency) }
    ];
  }

  if (label.includes("uber")) {
    return [{ id: "p1", name: "Viaje urbano", amountLabel: formatMoney(amount, currency) }];
  }

  if (label.includes("netflix") || label.includes("spotify")) {
    return [{ id: "p1", name: "Suscripcion mensual", amountLabel: formatMoney(amount, currency) }];
  }

  if (label.includes("starbucks")) {
    return [
      { id: "p1", name: "Cafe latte", amountLabel: formatMoney(4.5, currency) },
      { id: "p2", name: "Pan dulce", amountLabel: formatMoney(amount - 4.5, currency) }
    ];
  }

  return [{ id: "p1", name: "Cargo detectado", amountLabel: formatMoney(amount, currency) }];
}

function getCategoryTone(category: string) {
  const toneMap: Record<string, string> = {
    Compras: "tone-purple",
    Alimentacion: "tone-green",
    Transporte: "tone-blue",
    Entretenimiento: "tone-red",
    Salud: "tone-pink",
    Vivienda: "tone-gold",
    Viajes: "tone-violet",
    Tecnologia: "tone-cyan",
    Ingreso: "tone-green",
    Otros: "tone-muted"
  };

  return toneMap[category] ?? "tone-muted";
}

function getDefaultEmailFrom(merchant: string) {
  const label = merchant.toLowerCase();

  if (label.includes("amazon")) return "no-reply@amazon.com";
  if (label.includes("uber")) return "uber.receipts@uber.com";
  if (label.includes("netflix")) return "info@account.netflix.com";
  if (label.includes("spotify")) return "no-reply@spotify.com";
  if (label.includes("apple")) return "do_not_reply@apple.com";
  return `no-reply@${label.replace(/[^a-z0-9]/g, "") || "merchant"}.com`;
}

function isIncome(transaction: Transaction) {
  return transaction.category === "Ingreso";
}

function getConnectedHelper(gmailStatus: GmailStatus | null) {
  if (!gmailStatus?.configured) return "Falta configurar credenciales";
  if (!gmailStatus.connected) return "Listo para conectar";
  return "Monitoreando correos en tiempo real";
}

function getConnectionState(gmailStatus: GmailStatus | null): AppShellModel["connectionState"] {
  if (!gmailStatus?.configured) return "setup";
  if (!gmailStatus.connected) return "ready";
  return "active";
}

function getStatusLabel(status: Transaction["status"]) {
  if (status === "approved") return "Registrada";
  if (status === "ignored") return "Ignorada";
  return "Pendiente";
}

function formatRelativeDate(value: string) {
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatTransactionDate(value: string) {
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatDateWithTime(value: string) {
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

function formatSignedAmount(value: number, currency: string, positive: boolean) {
  const formatted = formatMoney(value, currency);
  return `${positive ? "+" : "-"}${formatted}`;
}

function getFirstName(name: string) {
  return name.split(" ").filter(Boolean)[0] ?? name;
}
