import {
  AppRouteId,
  AppShellModel,
  BudgetAdviceData,
  BudgetAlertData,
  BudgetChartRowData,
  BudgetDailyRowData,
  BudgetItemData,
  BudgetMetricData,
  BudgetQuickActionData,
  BudgetRowData,
  BudgetsPageModel,
  BudgetSummaryData,
  BudgetViewTabData,
  CategoryItemData,
  GmailPageModel,
  GmailRowData,
  GmailStatus,
  GoalItemData,
  InsightCardData,
  LinkedAccountData,
  MetricCardData,
  NavItem,
  NotificationPreferenceData,
  RecentTransactionData,
  ReportAverageCategoryData,
  ReportCategoryData,
  ReportComparisonRowData,
  ReportMetricData,
  ReportsPageModel,
  ReportTabData,
  ReportTrendPointData,
  ReviewItemData,
  SecurityItemData,
  SettingsPageModel,
  SettingsTabData,
  SummaryPageModel,
  ThemeOptionData,
  Transaction,
  TransactionChipData,
  TransactionKind,
  TransactionRowData,
  TransactionsPageModel,
  TransactionsTabData
} from "./types";

export const categories = [
  "Compras",
  "Alimentacion",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Vivienda",
  "Viajes",
  "Transferencia",
  "Ingreso",
  "Servicios",
  "Tecnologia",
  "Otros"
];

const accountOptions = [
  "Tarjeta de credito - 4242",
  "Tarjeta de debito - 5678",
  "Cuenta bancaria - 1234"
];

const paymentMethodOptions = ["Tarjeta", "Transferencia", "Automatico"];

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

const settingsTabs: SettingsTabData[] = [
  { id: "profile", label: "Perfil" },
  { id: "accounts", label: "Cuentas" },
  { id: "connections", label: "Conexiones" },
  { id: "notifications", label: "Notificaciones" },
  { id: "security", label: "Seguridad" },
  { id: "preferences", label: "Preferencias" }
];

const linkedAccounts: LinkedAccountData[] = [
  {
    id: "bbva",
    institution: "BBVA Bancomer",
    subtitle: "Cuenta de cheques - 1234",
    tone: "tone-blue",
    statusLabel: "Activa"
  },
  {
    id: "santander",
    institution: "Santander",
    subtitle: "Tarjeta de credito - 5678",
    tone: "tone-red",
    statusLabel: "Activa"
  },
  {
    id: "paypal",
    institution: "PayPal",
    subtitle: "Cuenta - samuelalas41@gmail.com",
    tone: "tone-cyan",
    statusLabel: "Activa"
  }
];

const notificationPreferences: NotificationPreferenceData[] = [
  {
    id: "gmail-purchases",
    title: "Compras detectadas (Gmail)",
    description: "Recibe alertas cuando encontremos nuevas compras.",
    enabled: true,
    icon: "gmail"
  },
  {
    id: "budget-reminders",
    title: "Recordatorios de presupuesto",
    description: "Te avisaremos si estas por exceder tu presupuesto.",
    enabled: true,
    icon: "calendar"
  },
  {
    id: "weekly-summary",
    title: "Resumen semanal",
    description: "Recibe un resumen de tu actividad cada semana.",
    enabled: false,
    icon: "reports"
  }
];

const securityItems: SecurityItemData[] = [
  {
    id: "password",
    title: "Cambiar contrasena",
    subtitle: "Disponible cuando uses acceso propio ademas de Google.",
    icon: "lock"
  },
  {
    id: "two-factor",
    title: "Autenticacion en dos pasos",
    statusLabel: "Activada",
    icon: "shield"
  },
  {
    id: "sessions",
    title: "Sesiones activas",
    statusLabel: "3",
    icon: "devices"
  }
];

const themeOptions: ThemeOptionData[] = [
  { id: "light", label: "Claro", description: "Tema luminoso" },
  { id: "dark", label: "Oscuro", description: "Tema principal" },
  { id: "system", label: "Sistema", description: "Segun tu dispositivo" }
];

const budgetViewTabs: BudgetViewTabData[] = [
  { id: "general", label: "Vista general" },
  { id: "daily", label: "Detalle por dia" }
];

const budgetSeed: Array<{
  id: string;
  category: string;
  subtitle: string;
  budget: number;
  spent: number;
  icon: string;
  tone: string;
}> = [
  {
    id: "food",
    category: "Alimentacion",
    subtitle: "Comida y supermercado",
    budget: 4000,
    spent: 2850.4,
    icon: "utensils",
    tone: "tone-green"
  },
  {
    id: "transport",
    category: "Transporte",
    subtitle: "Gasolina, transporte publico, apps",
    budget: 2500,
    spent: 1965.5,
    icon: "car",
    tone: "tone-blue"
  },
  {
    id: "entertainment",
    category: "Entretenimiento",
    subtitle: "Streaming, cine, juegos, salidas",
    budget: 1800,
    spent: 1672.8,
    icon: "playCircle",
    tone: "tone-red"
  },
  {
    id: "services",
    category: "Servicios",
    subtitle: "Luz, agua, internet, telefono",
    budget: 2200,
    spent: 2045.3,
    icon: "zap",
    tone: "tone-gold"
  },
  {
    id: "health",
    category: "Salud",
    subtitle: "Medicamentos, consultas, gimnasio",
    budget: 1200,
    spent: 820.9,
    icon: "heart",
    tone: "tone-pink"
  },
  {
    id: "shopping",
    category: "Compras",
    subtitle: "Ropa, electronicos, hogar",
    budget: 2000,
    spent: 980.6,
    icon: "bag",
    tone: "tone-purple"
  },
  {
    id: "education",
    category: "Educacion",
    subtitle: "Cursos, libros, suscripciones",
    budget: 800,
    spent: 115,
    icon: "book",
    tone: "tone-cyan"
  },
  {
    id: "savings",
    category: "Ahorro e inversiones",
    subtitle: "Ahorros, inversiones, retiros",
    budget: 5500,
    spent: 0,
    icon: "investments",
    tone: "tone-green"
  }
];

const budgetDailySeed: BudgetDailyRowData[] = [
  {
    id: "day-24",
    dateLabel: "24 May",
    spentLabel: "$380.00",
    targetLabel: "$520.00",
    progress: 0.73,
    statusLabel: "Bien",
    statusTone: "success"
  },
  {
    id: "day-25",
    dateLabel: "25 May",
    spentLabel: "$460.00",
    targetLabel: "$520.00",
    progress: 0.88,
    statusLabel: "Bien",
    statusTone: "success"
  },
  {
    id: "day-26",
    dateLabel: "26 May",
    spentLabel: "$540.00",
    targetLabel: "$520.00",
    progress: 1,
    statusLabel: "En riesgo",
    statusTone: "warning"
  },
  {
    id: "day-27",
    dateLabel: "27 May",
    spentLabel: "$610.00",
    targetLabel: "$520.00",
    progress: 1,
    statusLabel: "Excedido",
    statusTone: "danger"
  },
  {
    id: "day-28",
    dateLabel: "28 May",
    spentLabel: "$410.00",
    targetLabel: "$520.00",
    progress: 0.79,
    statusLabel: "Bien",
    statusTone: "success"
  },
  {
    id: "day-29",
    dateLabel: "29 May",
    spentLabel: "$485.00",
    targetLabel: "$520.00",
    progress: 0.93,
    statusLabel: "En riesgo",
    statusTone: "warning"
  }
];

const budgetAlerts: BudgetAlertData[] = [
  {
    id: "alert-entertainment",
    title: "Entretenimiento",
    description: "Has alcanzado el 93% de tu presupuesto.",
    icon: "warning",
    tone: "warning"
  },
  {
    id: "alert-services",
    title: "Servicios",
    description: "Has alcanzado el 93% de tu presupuesto.",
    icon: "warning",
    tone: "warning"
  }
];

const budgetAdvice: BudgetAdviceData[] = [
  {
    id: "advice-food",
    title: "Vas por buen camino",
    description: "Has gastado 18% menos que el mes pasado en Alimentacion.",
    icon: "bag",
    tone: "green"
  },
  {
    id: "advice-review",
    title: "Revisa esta categoria",
    description: "Entretenimiento ha superado tu promedio habitual.",
    icon: "budgets",
    tone: "violet"
  },
  {
    id: "advice-save",
    title: "Ahorra mas",
    description: "Tienes dinero disponible para asignar o ahorrar este mes.",
    icon: "investments",
    tone: "blue"
  }
];

const budgetQuickActions: BudgetQuickActionData[] = [
  { id: "new", label: "Crear nuevo presupuesto", icon: "plus" },
  { id: "copy", label: "Copiar presupuesto del mes pasado", icon: "copy" }
];

const reportTabs: ReportTabData[] = [
  { id: "overview", label: "Resumen general" },
  { id: "expenses", label: "Gastos" },
  { id: "income", label: "Ingresos" },
  { id: "accounts", label: "Cuentas" },
  { id: "comparisons", label: "Comparaciones" },
  { id: "trends", label: "Tendencias" }
];

const reportComparisonRows: ReportComparisonRowData[] = [
  { id: "jan", label: "Ene 2024", income: 17800, expense: 12150, savings: 7850 },
  { id: "feb", label: "Feb 2024", income: 17700, expense: 13850, savings: 6550 },
  { id: "mar", label: "Mar 2024", income: 18600, expense: 13920, savings: 10620 },
  { id: "apr", label: "Abr 2024", income: 18950, expense: 14280, savings: 10120 },
  { id: "may", label: "May 2024", income: 22000, expense: 12450.75, savings: 11120 }
];

const reportTrendPoints: ReportTrendPointData[] = [
  { id: "dec", label: "Dic 2023", value: 7400, movingAverage: 7300 },
  { id: "jan", label: "Ene 2024", value: 10300, movingAverage: 8600 },
  { id: "feb", label: "Feb 2024", value: 11450, movingAverage: 9700 },
  { id: "mar", label: "Mar 2024", value: 12640, movingAverage: 11500 },
  { id: "apr", label: "Abr 2024", value: 14520, movingAverage: 13400 },
  { id: "may", label: "May 2024", value: 16700, movingAverage: 15950 }
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
  createTransaction("preview-supermarket", "Supermercado", 85.4, "Alimentacion", "2026-04-18T14:35:00Z", "approved", "manual", 1, "Compra registrada"),
  createTransaction("preview-salary", "Salario", 1800, "Ingreso", "2026-04-18T09:20:00Z", "approved", "manual", 1, "Pago mensual"),
  createTransaction("preview-restaurant", "Restaurante El Faro", 45.6, "Alimentacion", "2026-04-17T20:10:00Z", "approved", "manual", 1, "Cena"),
  createTransaction("preview-transfer", "Transferencia a Sofia", 200, "Transferencia", "2026-04-16T11:42:00Z", "approved", "manual", 1, "Apoyo mensual"),
  createTransaction("preview-gas", "Gasolina Pemex", 40, "Transporte", "2026-04-15T16:20:00Z", "approved", "manual", 1, "Estacion de servicio"),
  createTransaction("preview-freelance", "Freelance Project", 350, "Ingreso", "2026-04-14T13:10:00Z", "approved", "manual", 1, "Pago recibido"),
  createTransaction("preview-pharmacy", "Farmacia Guadalajara", 23.9, "Salud", "2026-04-13T16:24:00Z", "approved", "manual", 1, "Medicamentos"),
  createTransaction("preview-power", "Luz CFE", 60, "Servicios", "2026-04-12T10:12:00Z", "approved", "manual", 1, "Recibo de luz")
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

export function buildTransactionsPageModel(
  transactions: Transaction[]
): TransactionsPageModel {
  const rows = transactions
    .slice()
    .sort((left, right) => new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime())
    .map((transaction) => buildTransactionRow(transaction));

  const tabs: TransactionsTabData[] = [
    { id: "all", label: "Todas", count: rows.length },
    {
      id: "income",
      label: "Ingresos",
      count: rows.filter((row) => row.kind === "income").length
    },
    {
      id: "expense",
      label: "Gastos",
      count: rows.filter((row) => row.kind === "expense").length
    },
    {
      id: "transfer",
      label: "Transferencias",
      count: rows.filter((row) => row.kind === "transfer").length
    }
  ];

  const chips: TransactionChipData[] = [
    { id: "all", label: "Todas", count: rows.length, tone: "violet" },
    {
      id: "approved",
      label: "Confirmadas",
      count: rows.filter((row) => row.status === "approved").length,
      tone: "green"
    },
    {
      id: "pending",
      label: "Pendientes",
      count: rows.filter((row) => row.status === "pending").length,
      tone: "amber"
    },
    {
      id: "gmail",
      label: "Detectadas (Gmail)",
      count: rows.filter((row) => row.source === "gmail").length,
      tone: "blue"
    },
    {
      id: "ignored",
      label: "Ignoradas",
      count: rows.filter((row) => row.status === "ignored").length,
      tone: "muted"
    }
  ];

  return {
    dateRangeLabel: "1 - 31 Mayo 2024",
    tabs,
    chips,
    rows,
    categoryOptions: ["Todas las categorias", ...categories],
    accountOptions: ["Todas las cuentas", ...accountOptions],
    paymentMethodOptions: ["Todos los metodos", ...paymentMethodOptions]
  };
}

export function buildSettingsPageModel(
  gmailStatus: GmailStatus | null
): SettingsPageModel {
  const displayName = gmailStatus?.name || "Samuel Alas";
  const displayEmail = gmailStatus?.email || "samuelalas41@gmail.com";

  return {
    dateRangeLabel: "1 - 31 Mayo 2024",
    tabs: settingsTabs,
    profile: {
      name: displayName,
      email: displayEmail,
      phone: "+503 7000 1122",
      timezone: "(GMT-06:00) San Salvador",
      currency: "USD - Dolar estadounidense",
      language: "Espanol",
      picture: gmailStatus?.picture
    },
    timezoneOptions: [
      "(GMT-06:00) San Salvador",
      "(GMT-06:00) Ciudad de Mexico",
      "(GMT-05:00) Bogota",
      "(GMT-04:00) Santo Domingo"
    ],
    currencyOptions: [
      "USD - Dolar estadounidense",
      "MXN - Peso mexicano",
      "EUR - Euro"
    ],
    languageOptions: ["Espanol", "English"],
    preferences: {
      defaultCurrency: "USD - Dolar estadounidense",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12 horas (1:30 PM)"
    },
    defaultCurrencyOptions: [
      "USD - Dolar estadounidense",
      "MXN - Peso mexicano",
      "EUR - Euro"
    ],
    dateFormatOptions: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    timeFormatOptions: ["12 horas (1:30 PM)", "24 horas (13:30)"],
    themeOptions,
    linkedAccounts,
    services: [
      {
        id: "gmail",
        name: "Gmail",
        email: displayEmail,
        connected: Boolean(gmailStatus?.connected)
      }
    ],
    notifications: notificationPreferences,
    securityItems
  };
}

export function buildBudgetsPageModel(): BudgetsPageModel {
  const rows = budgetSeed.map((item) => buildBudgetRow(item));
  const totalBudget = budgetSeed.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetSeed.reduce((sum, item) => sum + item.spent, 0);
  const remaining = totalBudget - totalSpent;
  const riskCount = rows.filter((row) => row.statusTone !== "success").length;

  const metrics: BudgetMetricData[] = [
    {
      id: "total",
      label: "Presupuesto total",
      value: formatMoney(totalBudget, "USD"),
      helper: "Mensual",
      icon: "budgets",
      accent: "#7d4dff"
    },
    {
      id: "spent",
      label: "Gastado",
      value: formatMoney(totalSpent, "USD"),
      helper: `${Math.round((totalSpent / totalBudget) * 100)}% del presupuesto`,
      icon: "car",
      accent: "#2f6ef9"
    },
    {
      id: "remaining",
      label: "Restante",
      value: formatMoney(remaining, "USD"),
      helper: `${Math.round((remaining / totalBudget) * 100)}% del presupuesto`,
      icon: "bag",
      accent: "#1fd1b2"
    },
    {
      id: "risk",
      label: "En riesgo",
      value: `${riskCount} categorias`,
      helper: "Superan el 80%",
      icon: "warning",
      accent: "#f2a93b"
    }
  ];

  const summary: BudgetSummaryData = {
    totalLabel: formatMoney(totalBudget, "USD"),
    spentLabel: formatMoney(totalSpent, "USD"),
    remainingLabel: formatMoney(remaining, "USD"),
    spentProgress: totalSpent / totalBudget,
    daysRemainingLabel: "12 dias"
  };

  const chartRows: BudgetChartRowData[] = budgetSeed.map((item) => ({
    id: item.id,
    label: item.category,
    budget: item.budget,
    spent: item.spent
  }));

  return {
    monthLabel: "Mayo 2024",
    viewTabs: budgetViewTabs,
    metrics,
    rows,
    dailyRows: budgetDailySeed,
    accountOptions: ["Todas las cuentas", ...accountOptions],
    summary,
    alerts: budgetAlerts,
    advice: budgetAdvice,
    quickActions: budgetQuickActions,
    chartRows
  };
}

export function buildReportsPageModel(
  transactions: Transaction[]
): ReportsPageModel {
  const approvedTransactions = transactions.filter(
    (transaction) => transaction.status === "approved"
  );
  const derivedExpense = approvedTransactions
    .filter((transaction) => getTransactionKind(transaction) === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const derivedIncome = approvedTransactions
    .filter((transaction) => getTransactionKind(transaction) === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenseTotal = derivedExpense > 5000 ? derivedExpense : 12450.75;
  const incomeTotal = derivedIncome > 5000 ? derivedIncome : 18000;
  const savingsTotal = incomeTotal - expenseTotal;
  const transactionCount = approvedTransactions.length > 20 ? approvedTransactions.length : 124;

  const metrics: ReportMetricData[] = [
    {
      id: "expense",
      label: "Gasto total",
      value: formatMoney(expenseTotal, "USD"),
      delta: "8.2% vs Abr 2024",
      deltaPositive: false,
      icon: "budgets",
      accent: "#7d4dff"
    },
    {
      id: "income",
      label: "Ingreso total",
      value: formatMoney(incomeTotal, "USD"),
      delta: "12.4% vs Abr 2024",
      deltaPositive: true,
      icon: "income",
      accent: "#24c96f"
    },
    {
      id: "savings",
      label: "Ahorro neto",
      value: formatMoney(savingsTotal, "USD"),
      delta: "25.6% vs Abr 2024",
      deltaPositive: true,
      icon: "summary",
      accent: "#2f6ef9"
    },
    {
      id: "count",
      label: "Transacciones",
      value: `${transactionCount}`,
      delta: "5 vs Abr 2024",
      deltaPositive: true,
      icon: "transactions",
      accent: "#f2a93b"
    },
    {
      id: "average",
      label: "Gasto promedio diario",
      value: formatMoney(expenseTotal / 31, "USD"),
      delta: "6.3% vs Abr 2024",
      deltaPositive: false,
      icon: "expense",
      accent: "#ff5479"
    }
  ];

  const categories = buildReportCategories(expenseTotal);
  const averageCategories = buildAverageCategorySeries(categories);

  return {
    dateRangeLabel: "1 - 31 Mayo 2024",
    tabs: reportTabs,
    metrics,
    accountOptions: ["Todas las cuentas", ...accountOptions],
    categoryOptions: ["Todas las categorias", ...categories.map((item) => item.label)],
    comparisonRows: reportComparisonRows,
    comparisonSummary: [
      {
        id: "summary-income",
        label: "Ingresos totales",
        value: formatMoney(incomeTotal, "USD"),
        delta: "12.4% vs Abr 2024",
        positive: true
      },
      {
        id: "summary-expense",
        label: "Gastos totales",
        value: formatMoney(expenseTotal, "USD"),
        delta: "8.2% vs Abr 2024",
        positive: false
      },
      {
        id: "summary-savings",
        label: "Ahorro total",
        value: formatMoney(savingsTotal, "USD"),
        delta: "25.6% vs Abr 2024",
        positive: true
      }
    ],
    categories,
    trendPoints: reportTrendPoints,
    averageCategories,
    annualSummary: {
      incomeLabel: formatMoney(89250, "USD"),
      expenseLabel: formatMoney(64320.35, "USD"),
      savingsLabel: formatMoney(24929.65, "USD"),
      savingsRateLabel: "27.9%",
      savingsRateProgress: 0.279
    }
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
      category: getDisplayCategoryLabel(transaction.category),
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
    statusLabel: getGmailStatusLabel(transaction.status),
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

function buildTransactionRow(transaction: Transaction): TransactionRowData {
  const kind = getTransactionKind(transaction);
  const positive = isPositiveTransaction(transaction, kind);
  const paymentMethodLabel = getPaymentMethodLabel(transaction, kind);
  const accountLabel = getSuggestedAccount(transaction);
  const products = getSuggestedProducts(transaction.merchant, transaction.amount, transaction.currency);
  const confidencePercent = transaction.source === "gmail"
    ? Math.round(transaction.confidence * 100)
    : undefined;

  return {
    id: transaction.id,
    merchant: transaction.merchant,
    subtitle: getTransactionSubtitle(transaction),
    dateLabel: formatTransactionDate(transaction.purchasedAt),
    category: transaction.category,
    categoryTone: getCategoryTone(transaction.category),
    accountLabel,
    paymentMethodLabel,
    amountLabel: formatSignedAmount(transaction.amount, transaction.currency, positive),
    positive,
    kind,
    status: transaction.status,
    statusLabel: getTransactionStatusLabel(transaction.status),
    statusTone: getTransactionStatusTone(transaction.status),
    source: transaction.source,
    sourceLabel: transaction.source === "gmail" ? "Detectada (Gmail)" : undefined,
    confidencePercent,
    detail: {
      totalLabel: `${formatSignedAmount(transaction.amount, transaction.currency, positive)} ${transaction.currency}`,
      categoryLabel: transaction.category,
      accountLabel,
      paymentMethodLabel,
      statusLabel: getTransactionStatusLabel(transaction.status),
      statusTone: getTransactionStatusTone(transaction.status),
      sourceLabel: transaction.source === "gmail" ? "Detectada (Gmail)" : undefined,
      confidenceLabel: confidencePercent ? `${confidencePercent}%` : undefined,
      fields: [
        { label: "Comercio", value: transaction.merchant },
        {
          label: "Correo origen",
          value: transaction.emailFrom ?? getDefaultEmailFrom(transaction.merchant)
        }
      ],
      products
    }
  };
}

function buildBudgetRow(item: {
  id: string;
  category: string;
  subtitle: string;
  budget: number;
  spent: number;
  icon: string;
  tone: string;
}): BudgetRowData {
  const remaining = item.budget - item.spent;
  const progress = item.budget === 0 ? 0 : item.spent / item.budget;

  return {
    id: item.id,
    category: item.category,
    subtitle: item.subtitle,
    budgetLabel: formatMoney(item.budget, "USD"),
    spentLabel: formatMoney(item.spent, "USD"),
    remainingLabel: formatMoney(Math.abs(remaining), "USD"),
    remainingPositive: remaining >= 0,
    progress,
    statusLabel: getBudgetStatusLabel(progress),
    statusTone: getBudgetStatusTone(progress),
    icon: item.icon,
    tone: item.tone
  };
}

function buildReportCategories(expenseTotal: number): ReportCategoryData[] {
  const seeded = [
    { id: "food", label: "Alimentacion", value: 2850.4, color: "#2ed39b" },
    { id: "transport", label: "Transporte", value: 1965.5, color: "#2f6ef9" },
    { id: "entertainment", label: "Entretenimiento", value: 1672.8, color: "#e64b75" },
    { id: "services", label: "Servicios", value: 2045.3, color: "#ffad34" },
    { id: "health", label: "Salud", value: 820.9, color: "#c96bd2" },
    { id: "shopping", label: "Compras", value: 980.6, color: "#5b63ff" },
    { id: "others", label: "Otros", value: 2115.25, color: "#274f86" }
  ];

  const total = seeded.reduce((sum, item) => sum + item.value, 0);
  const normalizedTotal = total > 0 ? total : expenseTotal;

  return seeded.map((item) => ({
    id: item.id,
    label: item.label,
    amountLabel: formatMoney(item.value, "USD"),
    percentageLabel: `${((item.value / normalizedTotal) * 100).toFixed(1)}%`,
    color: item.color,
    value: item.value
  }));
}

function buildAverageCategorySeries(
  categories: ReportCategoryData[]
): ReportAverageCategoryData[] {
  return categories
    .slice()
    .sort((left, right) => right.value - left.value)
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      label: item.label,
      value: Number((item.value / 30).toFixed(2)),
      valueLabel: formatMoney(item.value / 30, "USD")
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
    emailFrom: getDefaultEmailFrom(merchant),
    createdAt: purchasedAt,
    updatedAt: purchasedAt
  };
}

function getSuggestedAccount(transaction: Transaction) {
  const merchant = transaction.merchant.toLowerCase();

  if (
    merchant.includes("uber") ||
    merchant.includes("walmart") ||
    merchant.includes("spotify") ||
    merchant.includes("salario") ||
    merchant.includes("freelance") ||
    merchant.includes("transferencia") ||
    merchant.includes("luz")
  ) {
    return "Cuenta bancaria - 1234";
  }

  if (
    merchant.includes("starbucks") ||
    merchant.includes("restaurante") ||
    merchant.includes("gasolina") ||
    merchant.includes("pemex") ||
    merchant.includes("farmacia")
  ) {
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

  if (label.includes("restaurante")) {
    return [
      { id: "p1", name: "Cena", amountLabel: formatMoney(amount, currency) }
    ];
  }

  if (label.includes("gasolina") || label.includes("pemex")) {
    return [
      { id: "p1", name: "Combustible", amountLabel: formatMoney(amount, currency) }
    ];
  }

  if (label.includes("farmacia")) {
    return [
      { id: "p1", name: "Medicamentos", amountLabel: formatMoney(amount, currency) }
    ];
  }

  if (label.includes("luz")) {
    return [
      { id: "p1", name: "Servicio electrico", amountLabel: formatMoney(amount, currency) }
    ];
  }

  if (label.includes("salario") || label.includes("freelance")) {
    return [
      { id: "p1", name: "Abono recibido", amountLabel: formatMoney(amount, currency) }
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
    Transferencia: "tone-gold",
    Servicios: "tone-gold",
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
  if (label.includes("restaurante")) return "hola@restauranteelfaro.com";
  if (label.includes("freelance")) return "payments@client.com";
  if (label.includes("farmacia")) return "notificaciones@farmacia.com";
  if (label.includes("luz")) return "facturacion@energia.com";
  return `no-reply@${label.replace(/[^a-z0-9]/g, "") || "merchant"}.com`;
}

function isIncome(transaction: Transaction) {
  return transaction.category === "Ingreso";
}

function getTransactionKind(transaction: Transaction): TransactionKind {
  if (transaction.category === "Ingreso") return "income";
  if (transaction.category === "Transferencia") return "transfer";
  return "expense";
}

function isPositiveTransaction(transaction: Transaction, kind: TransactionKind) {
  if (kind === "income") return true;
  if (kind === "transfer") {
    return transaction.merchant.toLowerCase().includes("recib");
  }

  return false;
}

function getPaymentMethodLabel(
  transaction: Transaction,
  kind: TransactionKind
) {
  const merchant = transaction.merchant.toLowerCase();

  if (kind === "income" || kind === "transfer") return "Transferencia";
  if (
    merchant.includes("uber") ||
    merchant.includes("netflix") ||
    merchant.includes("spotify") ||
    merchant.includes("apple") ||
    merchant.includes("luz")
  ) {
    return "Automatico";
  }

  return "Tarjeta";
}

function getDisplayCategoryLabel(category: string) {
  if (category === "Ingreso") return "Ingresos";
  return category;
}

function getTransactionSubtitle(transaction: Transaction) {
  if (transaction.emailSubject) return transaction.emailSubject;
  return "Movimiento registrado";
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

function getGmailStatusLabel(status: Transaction["status"]) {
  if (status === "approved") return "Registrada";
  if (status === "ignored") return "Ignorada";
  return "Pendiente";
}

function getTransactionStatusLabel(status: Transaction["status"]) {
  if (status === "approved") return "Confirmada";
  if (status === "ignored") return "Ignorada";
  return "Pendiente";
}

function getTransactionStatusTone(
  status: Transaction["status"]
): TransactionRowData["statusTone"] {
  if (status === "approved") return "success";
  if (status === "ignored") return "muted";
  return "warning";
}

function getBudgetStatusLabel(progress: number) {
  if (progress >= 1) return "Excedido";
  if (progress >= 0.8) return "En riesgo";
  return "Bien";
}

function getBudgetStatusTone(progress: number): BudgetRowData["statusTone"] {
  if (progress >= 1) return "danger";
  if (progress >= 0.8) return "warning";
  return "success";
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
