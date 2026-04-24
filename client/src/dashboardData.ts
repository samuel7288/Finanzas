import {
  AppRouteId,
  AccountConnectionData,
  AccountDistributionSliceData,
  AccountInfoFieldData,
  AccountKind,
  AccountMetricData,
  AccountRowData,
  AccountsPageModel,
  AccountTabData,
  AlertMetricData,
  AlertRecommendationData,
  AlertRowData,
  AlertRuleData,
  AlertsPageModel,
  AlertSummarySliceData,
  AlertTabData,
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
  GoalCategoryTabData,
  GoalMetricData,
  GoalRowData,
  GoalsPageModel,
  GoalSummarySliceData,
  InsightCardData,
  InvestmentContributionItemData,
  InvestmentDistributionSliceData,
  InvestmentMetricData,
  InvestmentPerformanceItemData,
  InvestmentPointData,
  InvestmentPositionData,
  InvestmentsPageModel,
  InvestmentTabData,
  LinkedAccountData,
  MetricCardData,
  NavItem,
  NotificationPreferenceData,
  UpcomingGoalData,
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

const goalsTabs: GoalCategoryTabData[] = [
  { id: "all", label: "Todas" },
  { id: "savings", label: "Ahorro" },
  { id: "debt", label: "Deuda" },
  { id: "investment", label: "Inversion" },
  { id: "travel", label: "Viajes" },
  { id: "education", label: "Educacion" },
  { id: "home", label: "Casa" },
  { id: "custom", label: "Personalizadas" }
];

const goalsSeed: Array<{
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  saved: number;
  target: number;
  monthlyContribution: number;
  dueDateLabel: string;
  imageTone: GoalRowData["imageTone"];
}> = [
  {
    id: "cancun",
    title: "Viaje a Cancun",
    category: "travel",
    categoryLabel: "Viajes",
    saved: 8200,
    target: 15000,
    monthlyContribution: 1500,
    dueDateLabel: "30 Nov 2024",
    imageTone: "travel"
  },
  {
    id: "laptop",
    title: "Nueva Laptop",
    category: "custom",
    categoryLabel: "Personal",
    saved: 6350,
    target: 20000,
    monthlyContribution: 2000,
    dueDateLabel: "15 Jul 2025",
    imageTone: "personal"
  },
  {
    id: "home",
    title: "Fondo para Casa",
    category: "home",
    categoryLabel: "Casa",
    saved: 7800,
    target: 25000,
    monthlyContribution: 2500,
    dueDateLabel: "01 Dic 2026",
    imageTone: "home"
  },
  {
    id: "masters",
    title: "Maestria",
    category: "education",
    categoryLabel: "Educacion",
    saved: 2500,
    target: 10000,
    monthlyContribution: 800,
    dueDateLabel: "10 Ago 2025",
    imageTone: "education"
  },
  {
    id: "emergency",
    title: "Fondo de Emergencia",
    category: "savings",
    categoryLabel: "Ahorro",
    saved: 0,
    target: 5000,
    monthlyContribution: 500,
    dueDateLabel: "Sin fecha",
    imageTone: "savings"
  }
];

const accountTabs: AccountTabData[] = [
  { id: "overview", label: "Resumen" },
  { id: "banking", label: "Cuentas bancarias" },
  { id: "cards", label: "Tarjetas" },
  { id: "cash", label: "Efectivo" },
  { id: "investments", label: "Inversiones" },
  { id: "loans", label: "Prestamos" },
  { id: "connections", label: "Conexiones" }
];

const accountConnections: AccountConnectionData[] = [
  { id: "bbva", badgeLabel: "BBVA", tone: "tone-blue" },
  { id: "santander", badgeLabel: "S", tone: "tone-red" },
  { id: "bac", badgeLabel: "BAC", tone: "tone-violet" },
  { id: "hsbc", badgeLabel: "HSBC", tone: "tone-cyan" },
  { id: "extra", badgeLabel: "+2", tone: "tone-muted" }
];

const investmentTabs: InvestmentTabData[] = [
  { id: "overview", label: "Resumen" },
  { id: "portfolio", label: "Portafolio" },
  { id: "assets", label: "Activos" },
  { id: "movements", label: "Movimientos" },
  { id: "performance", label: "Rendimiento" },
  { id: "objectives", label: "Objetivos" }
];

const alertTabs: AlertTabData[] = [
  { id: "all", label: "Todas" },
  { id: "purchases", label: "Compras" },
  { id: "budgets", label: "Presupuestos" },
  { id: "accounts", label: "Cuentas" },
  { id: "investments", label: "Inversiones" },
  { id: "reminders", label: "Recordatorios" },
  { id: "security", label: "Seguridad" }
];

const accountsSeed: Array<{
  id: string;
  name: string;
  maskedNumber: string;
  kind: AccountKind;
  typeLabel: string;
  typeTone: string;
  institution: string;
  balance: number;
  statusLabel: string;
  statusTone: AccountRowData["statusTone"];
  badgeLabel: string;
  badgeTone: string;
  availableBalance: number;
  accountTypeLabel: string;
  recentMovements: Array<{
    id: string;
    merchant: string;
    dateLabel: string;
    amount: number;
    positive: boolean;
  }>;
  infoFields: AccountInfoFieldData[];
}> = [
  {
    id: "payroll-bbva",
    name: "Cuenta de Nomina",
    maskedNumber: "•••• 1234",
    kind: "bank",
    typeLabel: "Cuenta bancaria",
    typeTone: "tone-blue",
    institution: "BBVA",
    balance: 25450.75,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "BBVA",
    badgeTone: "tone-blue",
    availableBalance: 22850.75,
    accountTypeLabel: "Cuenta corriente",
    recentMovements: [
      { id: "bbva-1", merchant: "Transferencia recibida", dateLabel: "Hoy, 9:15 AM", amount: 15000, positive: true },
      { id: "bbva-2", merchant: "Amazon.com", dateLabel: "Ayer, 8:43 PM", amount: 1299, positive: false },
      { id: "bbva-3", merchant: "Superama", dateLabel: "Ayer, 2:15 PM", amount: 850.75, positive: false },
      { id: "bbva-4", merchant: "Spotify", dateLabel: "21 May 2024", amount: 129, positive: false },
      { id: "bbva-5", merchant: "Cinepolis", dateLabel: "20 May 2024", amount: 320, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "BBVA" },
      { label: "Numero de cuenta", value: "•••• 1234" },
      { label: "CLABE", value: "012 180 0123456789 3" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 9:30 AM" }
    ]
  },
  {
    id: "savings-santander",
    name: "Cuenta de Ahorros",
    maskedNumber: "•••• 5678",
    kind: "bank",
    typeLabel: "Cuenta bancaria",
    typeTone: "tone-blue",
    institution: "Santander",
    balance: 29400,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "S",
    badgeTone: "tone-red",
    availableBalance: 29400,
    accountTypeLabel: "Cuenta de ahorro",
    recentMovements: [
      { id: "s-1", merchant: "Salario", dateLabel: "18 May 2024", amount: 1800, positive: true },
      { id: "s-2", merchant: "Freelance Project", dateLabel: "14 May 2024", amount: 350, positive: true },
      { id: "s-3", merchant: "Transferencia a Sofia", dateLabel: "16 May 2024", amount: 200, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "Santander" },
      { label: "Numero de cuenta", value: "•••• 5678" },
      { label: "CLABE", value: "014 580 9876543210 6" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 9:25 AM" }
    ]
  },
  {
    id: "banorte-card",
    name: "Tarjeta de Credito",
    maskedNumber: "•••• 4321",
    kind: "card",
    typeLabel: "Tarjeta de credito",
    typeTone: "tone-purple",
    institution: "Banorte",
    balance: -3250.5,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "B",
    badgeTone: "tone-purple",
    availableBalance: 6749.5,
    accountTypeLabel: "Credito clasico",
    recentMovements: [
      { id: "card-1", merchant: "Netflix", dateLabel: "22 May 2024", amount: 15.99, positive: false },
      { id: "card-2", merchant: "Uber", dateLabel: "22 May 2024", amount: 8.5, positive: false },
      { id: "card-3", merchant: "Apple.com/Bill", dateLabel: "20 May 2024", amount: 9.99, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "Banorte" },
      { label: "Numero de cuenta", value: "•••• 4321" },
      { label: "Limite de credito", value: "$10,000.00" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 9:10 AM" }
    ]
  },
  {
    id: "bbva-gold",
    name: "Tarjeta Oro",
    maskedNumber: "•••• 8765",
    kind: "card",
    typeLabel: "Tarjeta de credito",
    typeTone: "tone-purple",
    institution: "BBVA",
    balance: -5199.75,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "BBVA",
    badgeTone: "tone-blue",
    availableBalance: 6800.25,
    accountTypeLabel: "Tarjeta premium",
    recentMovements: [
      { id: "gold-1", merchant: "Airbnb", dateLabel: "20 May 2024", amount: 120, positive: false },
      { id: "gold-2", merchant: "Amazon.com", dateLabel: "18 May 2024", amount: 45.99, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "BBVA" },
      { label: "Numero de cuenta", value: "•••• 8765" },
      { label: "Limite de credito", value: "$12,000.00" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 8:54 AM" }
    ]
  },
  {
    id: "cash-wallet",
    name: "Efectivo",
    maskedNumber: "Caja principal",
    kind: "cash",
    typeLabel: "Efectivo",
    typeTone: "tone-green",
    institution: "Manual",
    balance: 1150,
    statusLabel: "Manual",
    statusTone: "muted",
    badgeLabel: "$",
    badgeTone: "tone-green",
    availableBalance: 1150,
    accountTypeLabel: "Disponible",
    recentMovements: [
      { id: "cash-1", merchant: "Restaurante El Faro", dateLabel: "17 May 2024", amount: 45.6, positive: false },
      { id: "cash-2", merchant: "Supermercado", dateLabel: "18 May 2024", amount: 85.4, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "Registro manual" },
      { label: "Numero de cuenta", value: "Sin numero" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 8:10 AM" }
    ]
  },
  {
    id: "cetes",
    name: "Inversion CETES",
    maskedNumber: "•••• 0001",
    kind: "investment",
    typeLabel: "Inversion",
    typeTone: "tone-violet",
    institution: "CETES",
    balance: 22500,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "C",
    badgeTone: "tone-violet",
    availableBalance: 22500,
    accountTypeLabel: "Renta fija",
    recentMovements: [
      { id: "cetes-1", merchant: "Abono de inversion", dateLabel: "19 May 2024", amount: 1200, positive: true }
    ],
    infoFields: [
      { label: "Institucion", value: "CETES" },
      { label: "Numero de cuenta", value: "•••• 0001" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 9:05 AM" }
    ]
  },
  {
    id: "gbm",
    name: "GBM+ Inversion",
    maskedNumber: "•••• 0002",
    kind: "investment",
    typeLabel: "Inversion",
    typeTone: "tone-violet",
    institution: "GBM+",
    balance: 15400.25,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "G",
    badgeTone: "tone-cyan",
    availableBalance: 15400.25,
    accountTypeLabel: "Portafolio diversificado",
    recentMovements: [
      { id: "gbm-1", merchant: "Rendimiento mensual", dateLabel: "20 May 2024", amount: 420.25, positive: true }
    ],
    infoFields: [
      { label: "Institucion", value: "GBM+" },
      { label: "Numero de cuenta", value: "•••• 0002" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 8:58 AM" }
    ]
  },
  {
    id: "personal-loan",
    name: "Prestamo Personal",
    maskedNumber: "•••• 1111",
    kind: "loan",
    typeLabel: "Prestamo",
    typeTone: "tone-gold",
    institution: "Banamex",
    balance: -45000,
    statusLabel: "Conectada",
    statusTone: "success",
    badgeLabel: "P",
    badgeTone: "tone-gold",
    availableBalance: 0,
    accountTypeLabel: "Credito personal",
    recentMovements: [
      { id: "loan-1", merchant: "Pago de prestamo", dateLabel: "15 May 2024", amount: 600, positive: false }
    ],
    infoFields: [
      { label: "Institucion", value: "Banamex" },
      { label: "Numero de cuenta", value: "•••• 1111" },
      { label: "Saldo pendiente", value: "$45,000.00" },
      { label: "Moneda", value: "USD" },
      { label: "Ultima actualizacion", value: "Hoy, 8:40 AM" }
    ]
  }
];

const investmentPortfolioPoints: InvestmentPointData[] = [
  { id: "p1", label: "24 Feb", value: 72000 },
  { id: "p2", label: "10 Mar", value: 93500 },
  { id: "p3", label: "24 Mar", value: 99500 },
  { id: "p4", label: "7 Abr", value: 90520 },
  { id: "p5", label: "21 Abr", value: 101240 },
  { id: "p6", label: "5 May", value: 109820 },
  { id: "p7", label: "19 May", value: 121340.2 },
  { id: "p8", label: "31 May", value: 125430.75 }
];

const investmentsSeed: Array<{
  id: string;
  name: string;
  symbol: string;
  typeLabel: string;
  accountLabel: string;
  accountTone: string;
  quantity: number;
  averagePrice: number;
  currentValue: number;
  returnValue: number;
  returnPercent: number;
  portfolioSharePercent: number;
  badgeLabel: string;
  badgeTone: string;
  detail: {
    statusLabel: string;
    statusTone: InvestmentPositionData["detail"]["statusTone"];
    currentPrice: number;
    updatedAtLabel: string;
    historyPoints: InvestmentPointData[];
    noteLines: string[];
  };
}> = [
  {
    id: "apple",
    name: "Apple Inc.",
    symbol: "AAPL",
    typeLabel: "Accion",
    accountLabel: "GBM+",
    accountTone: "tone-purple",
    quantity: 120,
    averagePrice: 125,
    currentValue: 18265.4,
    returnValue: 3265.4,
    returnPercent: 21.78,
    portfolioSharePercent: 14.56,
    badgeLabel: "A",
    badgeTone: "tone-apple",
    detail: {
      statusLabel: "En cartera",
      statusTone: "success",
      currentPrice: 152.21,
      updatedAtLabel: "Hoy, 9:30 AM",
      historyPoints: [
        { id: "a1", label: "Feb 24", value: 102 },
        { id: "a2", label: "Mar 24", value: 126 },
        { id: "a3", label: "Abr 24", value: 138 },
        { id: "a4", label: "May 24", value: 152 }
      ],
      noteLines: [
        "Empresa lider en tecnologia y servicios.",
        "Posicion a largo plazo."
      ]
    }
  },
  {
    id: "microsoft",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    typeLabel: "Accion",
    accountLabel: "GBM+",
    accountTone: "tone-purple",
    quantity: 80,
    averagePrice: 280.5,
    currentValue: 25124.8,
    returnValue: 1852.8,
    returnPercent: 7.95,
    portfolioSharePercent: 20.03,
    badgeLabel: "M",
    badgeTone: "tone-microsoft",
    detail: {
      statusLabel: "En cartera",
      statusTone: "success",
      currentPrice: 314.06,
      updatedAtLabel: "Hoy, 9:28 AM",
      historyPoints: [
        { id: "m1", label: "Feb 24", value: 268 },
        { id: "m2", label: "Mar 24", value: 289 },
        { id: "m3", label: "Abr 24", value: 301 },
        { id: "m4", label: "May 24", value: 314 }
      ],
      noteLines: [
        "Base fuerte en software y nube.",
        "Buen equilibrio entre crecimiento y estabilidad."
      ]
    }
  },
  {
    id: "voo",
    name: "Vanguard S&P 500",
    symbol: "VOO",
    typeLabel: "ETF",
    accountLabel: "Interactive Brokers",
    accountTone: "tone-blue",
    quantity: 50,
    averagePrice: 410.2,
    currentValue: 20510,
    returnValue: 2210,
    returnPercent: 12.07,
    portfolioSharePercent: 16.36,
    badgeLabel: "V",
    badgeTone: "tone-vanguard",
    detail: {
      statusLabel: "En cartera",
      statusTone: "success",
      currentPrice: 410.2,
      updatedAtLabel: "Hoy, 9:20 AM",
      historyPoints: [
        { id: "v1", label: "Feb 24", value: 372 },
        { id: "v2", label: "Mar 24", value: 389 },
        { id: "v3", label: "Abr 24", value: 401 },
        { id: "v4", label: "May 24", value: 410 }
      ],
      noteLines: [
        "Exposicion amplia al mercado de EE. UU.",
        "Pieza base del portafolio."
      ]
    }
  },
  {
    id: "iwda",
    name: "iShares Core MSCI World",
    symbol: "IWDA",
    typeLabel: "ETF",
    accountLabel: "Interactive Brokers",
    accountTone: "tone-blue",
    quantity: 70,
    averagePrice: 85.3,
    currentValue: 11886.7,
    returnValue: 1086.7,
    returnPercent: 10.06,
    portfolioSharePercent: 9.47,
    badgeLabel: "I",
    badgeTone: "tone-ishares",
    detail: {
      statusLabel: "En cartera",
      statusTone: "success",
      currentPrice: 169.81,
      updatedAtLabel: "Hoy, 9:18 AM",
      historyPoints: [
        { id: "i1", label: "Feb 24", value: 141 },
        { id: "i2", label: "Mar 24", value: 152 },
        { id: "i3", label: "Abr 24", value: 161 },
        { id: "i4", label: "May 24", value: 169.81 }
      ],
      noteLines: [
        "ETF global para diversificacion geografica.",
        "Mantener con rebalanceos trimestrales."
      ]
    }
  },
  {
    id: "treasury",
    name: "Tesoro USA 2027",
    symbol: "US2027",
    typeLabel: "Renta fija",
    accountLabel: "GBM+",
    accountTone: "tone-purple",
    quantity: 30,
    averagePrice: 1000,
    currentValue: 10245.3,
    returnValue: 245.3,
    returnPercent: 2.45,
    portfolioSharePercent: 8.17,
    badgeLabel: "T",
    badgeTone: "tone-treasury",
    detail: {
      statusLabel: "En cartera",
      statusTone: "success",
      currentPrice: 341.51,
      updatedAtLabel: "Hoy, 9:14 AM",
      historyPoints: [
        { id: "t1", label: "Feb 24", value: 330 },
        { id: "t2", label: "Mar 24", value: 334 },
        { id: "t3", label: "Abr 24", value: 338 },
        { id: "t4", label: "May 24", value: 341.51 }
      ],
      noteLines: [
        "Posicion defensiva de menor volatilidad.",
        "Pensada para equilibrio del portafolio."
      ]
    }
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    typeLabel: "Cripto",
    accountLabel: "Binance",
    accountTone: "tone-gold",
    quantity: 0.15,
    averagePrice: 41000,
    currentValue: 6152.95,
    returnValue: -347.05,
    returnPercent: -5.34,
    portfolioSharePercent: 4.9,
    badgeLabel: "B",
    badgeTone: "tone-bitcoin",
    detail: {
      statusLabel: "Volatil",
      statusTone: "warning",
      currentPrice: 41019.67,
      updatedAtLabel: "Hoy, 9:12 AM",
      historyPoints: [
        { id: "b1", label: "Feb 24", value: 38000 },
        { id: "b2", label: "Mar 24", value: 43200 },
        { id: "b3", label: "Abr 24", value: 40210 },
        { id: "b4", label: "May 24", value: 41019.67 }
      ],
      noteLines: [
        "Exposicion pequena por perfil de riesgo.",
        "Mantener limite acotado dentro del portafolio."
      ]
    }
  }
];

const alertRowsSeed: AlertRowData[] = [
  {
    id: "alert-purchase",
    tab: "purchases",
    icon: "gmail",
    iconTone: "tone-purple",
    title: "Compra detectada en Gmail",
    description: "Se detecto una nueva compra en Amazon por $1,299.00",
    categoryLabel: "Compras",
    categoryTone: "tone-blue",
    priority: "medium",
    priorityLabel: "Media",
    priorityTone: "warning",
    state: "new",
    stateLabel: "Nueva",
    stateTone: "violet",
    dateLabel: "Hoy, 9:32 AM",
    createdAt: "2024-05-24T09:32:00Z",
    actionLabel: "Revisar compra",
    detail: {
      fields: [
        { label: "Origen", value: "Gmail" },
        { label: "Categoria", value: "Compras" },
        { label: "Comercio", value: "Amazon.com" },
        { label: "Monto", value: "$1,299.00" },
        { label: "Fecha", value: "Hoy, 9:32 AM" }
      ],
      recommendation: "Revisa la compra detectada y confirma si deseas registrarla automaticamente."
    }
  },
  {
    id: "alert-budget",
    tab: "budgets",
    icon: "warning",
    iconTone: "tone-amber",
    title: "Entretenimiento supero el 90% del presupuesto",
    description: "Llevas gastado $1,827.50 de $2,000.00 en la categoria Entretenimiento este mes.",
    categoryLabel: "Presupuestos",
    categoryTone: "tone-blue",
    priority: "high",
    priorityLabel: "Alta",
    priorityTone: "danger",
    state: "new",
    stateLabel: "Nueva",
    stateTone: "violet",
    dateLabel: "Hoy, 8:15 AM",
    createdAt: "2024-05-24T08:15:00Z",
    actionLabel: "Ver presupuesto",
    detail: {
      fields: [
        { label: "Origen", value: "Presupuestos" },
        { label: "Categoria", value: "Entretenimiento" },
        { label: "Periodo", value: "Mayo 2024" },
        { label: "Presupuesto", value: "$2,000.00" },
        { label: "Gastado", value: "$1,827.50 (91.4%)" },
        { label: "Fecha", value: "Hoy, 8:15 AM" }
      ],
      recommendation: "Revisa tus gastos recientes y ajusta tu presupuesto si es necesario."
    }
  },
  {
    id: "alert-low-balance",
    tab: "accounts",
    icon: "accounts",
    iconTone: "tone-red",
    title: "Saldo bajo en Cuenta de Nomina",
    description: "Tu saldo actual es $1,250.75",
    categoryLabel: "Cuentas",
    categoryTone: "tone-muted",
    priority: "high",
    priorityLabel: "Alta",
    priorityTone: "danger",
    state: "viewed",
    stateLabel: "Vista",
    stateTone: "blue",
    dateLabel: "Ayer, 11:47 PM",
    createdAt: "2024-05-23T23:47:00Z",
    actionLabel: "Ver cuenta",
    detail: {
      fields: [
        { label: "Origen", value: "Cuentas" },
        { label: "Cuenta", value: "Cuenta de Nomina" },
        { label: "Saldo actual", value: "$1,250.75" },
        { label: "Umbral", value: "$1,500.00" },
        { label: "Fecha", value: "Ayer, 11:47 PM" }
      ],
      recommendation: "Verifica si necesitas transferir fondos o ajustar tus alertas de saldo minimo."
    }
  },
  {
    id: "alert-unusual",
    tab: "accounts",
    icon: "alerts",
    iconTone: "tone-amber",
    title: "Movimiento inusual detectado",
    description: "Se detecto un cargo inusual en tu tarjeta **** 4321",
    categoryLabel: "Cuentas",
    categoryTone: "tone-muted",
    priority: "high",
    priorityLabel: "Alta",
    priorityTone: "danger",
    state: "new",
    stateLabel: "Nueva",
    stateTone: "violet",
    dateLabel: "Ayer, 6:21 PM",
    createdAt: "2024-05-23T18:21:00Z",
    actionLabel: "Revisar movimiento",
    detail: {
      fields: [
        { label: "Origen", value: "Monitoreo de cuentas" },
        { label: "Cuenta", value: "Tarjeta **** 4321" },
        { label: "Movimiento", value: "$640.00" },
        { label: "Comercio", value: "Cargo no habitual" },
        { label: "Fecha", value: "Ayer, 6:21 PM" }
      ],
      recommendation: "Confirma si reconoces este movimiento y marca la alerta como resuelta si todo esta en orden."
    }
  },
  {
    id: "alert-dividends",
    tab: "investments",
    icon: "investments",
    iconTone: "tone-green",
    title: "Dividendos proximos",
    description: "Apple Inc. (AAPL) pagara dividendos el 15 Jun 2024",
    categoryLabel: "Inversiones",
    categoryTone: "tone-green",
    priority: "low",
    priorityLabel: "Baja",
    priorityTone: "success",
    state: "viewed",
    stateLabel: "Vista",
    stateTone: "blue",
    dateLabel: "21 May, 3:05 PM",
    createdAt: "2024-05-21T15:05:00Z",
    actionLabel: "Ver inversion",
    detail: {
      fields: [
        { label: "Origen", value: "Inversiones" },
        { label: "Activo", value: "Apple Inc. (AAPL)" },
        { label: "Tipo", value: "Dividendo" },
        { label: "Fecha de pago", value: "15 Jun 2024" },
        { label: "Monto estimado", value: "$148.20" }
      ],
      recommendation: "Mantente atento al calendario de dividendos y reinvierte si encaja con tu estrategia."
    }
  },
  {
    id: "alert-goal",
    tab: "reminders",
    icon: "goals",
    iconTone: "tone-blue",
    title: "Meta 'Viaje a Cancun' atrasada",
    description: "Vas 2 meses detras del plan de ahorro.",
    categoryLabel: "Metas",
    categoryTone: "tone-violet",
    priority: "medium",
    priorityLabel: "Media",
    priorityTone: "warning",
    state: "new",
    stateLabel: "Nueva",
    stateTone: "violet",
    dateLabel: "21 May, 10:10 AM",
    createdAt: "2024-05-21T10:10:00Z",
    actionLabel: "Ver meta",
    detail: {
      fields: [
        { label: "Origen", value: "Metas" },
        { label: "Meta", value: "Viaje a Cancun" },
        { label: "Ahorro planeado", value: "$1,500.00 / mes" },
        { label: "Desfase", value: "2 meses" },
        { label: "Fecha objetivo", value: "30 Nov 2024" }
      ],
      recommendation: "Revisa tu aporte mensual o mueve parte de tus ahorros para recuperar el ritmo."
    }
  },
  {
    id: "alert-card-due",
    tab: "reminders",
    icon: "calendar",
    iconTone: "tone-purple",
    title: "Pago de tarjeta por vencer",
    description: "Tu tarjeta BBVA **** 1234 vence el 25 May 2024",
    categoryLabel: "Recordatorios",
    categoryTone: "tone-muted",
    priority: "medium",
    priorityLabel: "Media",
    priorityTone: "warning",
    state: "viewed",
    stateLabel: "Vista",
    stateTone: "blue",
    dateLabel: "20 May, 9:00 AM",
    createdAt: "2024-05-20T09:00:00Z",
    actionLabel: "Ver recordatorio",
    detail: {
      fields: [
        { label: "Origen", value: "Recordatorios" },
        { label: "Cuenta", value: "BBVA **** 1234" },
        { label: "Tipo", value: "Pago de tarjeta" },
        { label: "Fecha de vencimiento", value: "25 May 2024" },
        { label: "Monto esperado", value: "$560.00" }
      ],
      recommendation: "Agenda el pago antes de la fecha de vencimiento para evitar cargos extras."
    }
  },
  {
    id: "alert-security",
    tab: "security",
    icon: "shield",
    iconTone: "tone-green",
    title: "Inicio de sesion nuevo",
    description: "Se detecto un inicio de sesion desde un nuevo dispositivo",
    categoryLabel: "Seguridad",
    categoryTone: "tone-muted",
    priority: "high",
    priorityLabel: "Alta",
    priorityTone: "danger",
    state: "new",
    stateLabel: "Nueva",
    stateTone: "violet",
    dateLabel: "20 May, 7:22 AM",
    createdAt: "2024-05-20T07:22:00Z",
    actionLabel: "Revisar actividad",
    detail: {
      fields: [
        { label: "Origen", value: "Seguridad" },
        { label: "Dispositivo", value: "Chrome en Windows" },
        { label: "Ubicacion", value: "San Salvador" },
        { label: "Estado", value: "Nuevo acceso" },
        { label: "Fecha", value: "20 May, 7:22 AM" }
      ],
      recommendation: "Revisa tu actividad reciente y cierra sesiones si no reconoces este acceso."
    }
  }
];

const alertPrioritySummary: AlertSummarySliceData[] = [
  { id: "high", label: "Alta", countLabel: "5", percentageLabel: "(22%)", color: "#e4556b", value: 5 },
  { id: "medium", label: "Media", countLabel: "12", percentageLabel: "(52%)", color: "#ffb347", value: 12 },
  { id: "low", label: "Baja", countLabel: "6", percentageLabel: "(26%)", color: "#34c97e", value: 6 }
];

const alertTypeSummary: AlertSummarySliceData[] = [
  { id: "purchases", label: "Compras", countLabel: "6", percentageLabel: "(26%)", color: "#6d48ff", value: 6 },
  { id: "budgets", label: "Presupuestos", countLabel: "5", percentageLabel: "(22%)", color: "#e4556b", value: 5 },
  { id: "accounts", label: "Cuentas", countLabel: "5", percentageLabel: "(22%)", color: "#ffb347", value: 5 },
  { id: "investments", label: "Inversiones", countLabel: "3", percentageLabel: "(13%)", color: "#34c97e", value: 3 },
  { id: "reminders", label: "Recordatorios", countLabel: "2", percentageLabel: "(9%)", color: "#7d6bff", value: 2 },
  { id: "security", label: "Seguridad", countLabel: "2", percentageLabel: "(8%)", color: "#7f8fa9", value: 2 }
];

const alertRules: AlertRuleData[] = [
  {
    id: "rule-budget",
    title: "Presupuesto entretenimiento",
    description: "Alerta cuando supere el 90%",
    icon: "budgets",
    iconTone: "tone-amber",
    enabled: true
  },
  {
    id: "rule-balance",
    title: "Saldo bajo en cuentas",
    description: "Alertar cuando el saldo sea menor a $1,500",
    icon: "accounts",
    iconTone: "tone-red",
    enabled: true
  },
  {
    id: "rule-gmail",
    title: "Compras en Gmail",
    description: "Detectar y alertar nuevas compras",
    icon: "gmail",
    iconTone: "tone-purple",
    enabled: true
  },
  {
    id: "rule-unusual",
    title: "Movimientos inusuales",
    description: "Alertar cargos fuera de lo normal",
    icon: "alerts",
    iconTone: "tone-blue",
    enabled: false
  }
];

const alertRecommendations: AlertRecommendationData[] = [
  {
    id: "recommendation-budget",
    title: "Ajusta tu presupuesto de Entretenimiento",
    description: "Has excedido el 90% en 2 de los ultimos 3 meses.",
    icon: "budgets",
    iconTone: "tone-amber"
  },
  {
    id: "recommendation-investments",
    title: "Activa alertas de inversiones",
    description: "Te recomendamos alertas de rendimiento y dividendos.",
    icon: "investments",
    iconTone: "tone-green"
  },
  {
    id: "recommendation-subscriptions",
    title: "Revisa tus suscripciones",
    description: "Puedes estar gastando de mas en servicios.",
    icon: "alerts",
    iconTone: "tone-red"
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

export function buildGoalsPageModel(): GoalsPageModel {
  const rows = goalsSeed.map((goal) => buildGoalRow(goal));
  const totalSaved = goalsSeed.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTarget = goalsSeed.reduce((sum, goal) => sum + goal.target, 0);
  const totalContribution = goalsSeed.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const averageProgress = rows.reduce((sum, row) => sum + row.progress, 0) / rows.length;

  const metrics: GoalMetricData[] = [
    {
      id: "total",
      label: "Total en metas",
      value: formatMoney(totalSaved, "USD"),
      helper: `De ${formatMoney(totalTarget, "USD")}`,
      icon: "goals",
      accent: "#a36dff",
      progress: totalSaved / totalTarget
    },
    {
      id: "progress",
      label: "Progreso promedio",
      value: `${Math.round(averageProgress * 100)}%`,
      helper: "Todas tus metas",
      icon: "investments",
      accent: "#2f6ef9"
    },
    {
      id: "saved",
      label: "Monto ahorrado",
      value: formatMoney(totalSaved, "USD"),
      helper: "Este mes",
      icon: "bag",
      accent: "#2ed39b"
    },
    {
      id: "monthly",
      label: "Aportacion mensual",
      value: formatMoney(totalContribution, "USD"),
      helper: "Total programado",
      icon: "calendar",
      accent: "#f2a93b"
    }
  ];

  const summarySlices: GoalSummarySliceData[] = [
    {
      id: "travel",
      label: "Viajes",
      amountLabel: formatMoney(8200, "USD"),
      percentageLabel: "33%",
      color: "#7b4dff",
      value: 8200
    },
    {
      id: "personal",
      label: "Personal",
      amountLabel: formatMoney(6350, "USD"),
      percentageLabel: "26%",
      color: "#2f6ef9",
      value: 6350
    },
    {
      id: "home",
      label: "Casa",
      amountLabel: formatMoney(7800, "USD"),
      percentageLabel: "31%",
      color: "#34c97e",
      value: 7800
    },
    {
      id: "education",
      label: "Educacion",
      amountLabel: formatMoney(2500, "USD"),
      percentageLabel: "10%",
      color: "#f7a53b",
      value: 2500
    },
    {
      id: "savings",
      label: "Ahorro",
      amountLabel: formatMoney(0, "USD"),
      percentageLabel: "0%",
      color: "#e05a7a",
      value: 0
    }
  ];

  const upcomingGoals: UpcomingGoalData[] = [
    {
      id: "upcoming-cancun",
      title: "Viaje a Cancun",
      subtitle: "Faltan 6 meses",
      progressLabel: "54%",
      tone: "tone-purple"
    },
    {
      id: "upcoming-home",
      title: "Fondo para Casa",
      subtitle: "Faltan 2 anos",
      progressLabel: "31%",
      tone: "tone-green"
    },
    {
      id: "upcoming-laptop",
      title: "Nueva Laptop",
      subtitle: "Falta 1 ano",
      progressLabel: "32%",
      tone: "tone-blue"
    }
  ];

  return {
    tabs: goalsTabs,
    metrics,
    rows,
    summarySlices,
    upcomingGoals,
    recommendation: {
      title: "Consejos para alcanzar tus metas",
      description:
        "Si aumentas tu aportacion mensual en $300.00, podrias alcanzar todas tus metas 2 meses antes.",
      ctaLabel: "Ver recomendaciones"
    }
  };
}

export function buildAccountsPageModel(): AccountsPageModel {
  const rows = accountsSeed.map((account) => buildAccountRow(account));
  const balancesByKind = rows.reduce<Record<AccountKind, number>>(
    (totals, row) => {
      totals[row.kind] += row.balanceValue;
      return totals;
    },
    { bank: 0, card: 0, cash: 0, investment: 0, loan: 0 }
  );

  const visibleTotal =
    balancesByKind.bank +
    balancesByKind.card +
    balancesByKind.cash +
    balancesByKind.investment;
  const bankCount = rows.filter((row) => row.kind === "bank").length;
  const cardCount = rows.filter((row) => row.kind === "card").length;
  const cashCount = rows.filter((row) => row.kind === "cash").length;
  const investmentCount = rows.filter((row) => row.kind === "investment").length;

  const metrics: AccountMetricData[] = [
    {
      id: "total",
      label: "Saldo total",
      value: formatMoney(visibleTotal, "USD"),
      helper: "Actualizado hoy, 9:30 AM",
      icon: "summary",
      accent: "#2ed39b"
    },
    {
      id: "banking",
      label: "Cuentas bancarias",
      value: formatMoney(balancesByKind.bank, "USD"),
      helper: `${bankCount} cuentas`,
      icon: "accounts",
      accent: "#2f6ef9"
    },
    {
      id: "cards",
      label: "Tarjetas de credito",
      value: formatMoney(balancesByKind.card, "USD"),
      helper: `${cardCount} tarjetas`,
      icon: "budgets",
      accent: "#ff596f"
    },
    {
      id: "cash",
      label: "Efectivo",
      value: formatMoney(balancesByKind.cash, "USD"),
      helper: `${cashCount} cuenta`,
      icon: "bag",
      accent: "#31d69d"
    },
    {
      id: "investments",
      label: "Inversiones",
      value: formatMoney(balancesByKind.investment, "USD"),
      helper: `${investmentCount} cuentas`,
      icon: "investments",
      accent: "#9b79ff"
    }
  ];

  const distributionBase = visibleTotal || 1;
  const distributionConfig: Array<{ id: AccountKind; label: string; color: string }> = [
    { id: "bank", label: "Cuentas bancarias", color: "#2f6ef9" },
    { id: "card", label: "Tarjetas de credito", color: "#d85a86" },
    { id: "cash", label: "Efectivo", color: "#31d69d" },
    { id: "investment", label: "Inversiones", color: "#8b61ff" },
    { id: "loan", label: "Prestamos", color: "#ffb347" }
  ];

  const distribution: AccountDistributionSliceData[] = distributionConfig.map((item) => {
    const value = balancesByKind[item.id];
    return {
      id: item.id,
      label: item.label,
      amountLabel: formatMoney(value, "USD"),
      percentageLabel: `${Math.round((value / distributionBase) * 100)}%`,
      color: item.color,
      value
    };
  });

  return {
    dateRangeLabel: "1 - 31 Mayo 2024",
    tabs: accountTabs,
    metrics,
    rows,
    typeOptions: [
      "Todos los tipos",
      "Cuenta bancaria",
      "Tarjeta de credito",
      "Efectivo",
      "Inversion",
      "Prestamo"
    ],
    distribution,
    connections: accountConnections
  };
}

export function buildInvestmentsPageModel(): InvestmentsPageModel {
  const totalInvested = 125430.75;
  const totalReturn = 18542.35;
  const monthReturn = 2450.8;
  const totalReturnPercent = 17.34;

  const metrics: InvestmentMetricData[] = [
    {
      id: "total",
      label: "Valor total invertido",
      value: formatMoney(totalInvested, "USD"),
      helper: "Actualizado hoy, 9:30 AM",
      icon: "summary",
      accent: "#7d4dff"
    },
    {
      id: "return",
      label: "Rendimiento total",
      value: formatMoney(totalReturn, "USD"),
      helper: "",
      trendLabel: "17.34%",
      trendPositive: true,
      icon: "investments",
      accent: "#2ed39b"
    },
    {
      id: "month",
      label: "Ganancia / Perdida del mes",
      value: formatMoney(monthReturn, "USD"),
      helper: "",
      trendLabel: "2.01%",
      trendPositive: true,
      icon: "income",
      accent: "#2f9cff"
    },
    {
      id: "percentage",
      label: "Rendimiento porcentual",
      value: `${totalReturnPercent.toFixed(2)}%`,
      helper: "Total del portafolio",
      icon: "reports",
      accent: "#f2a93b"
    },
    {
      id: "accounts",
      label: "Portafolios / cuentas",
      value: "3",
      helper: "Activas",
      icon: "accounts",
      accent: "#9a79ff"
    }
  ];

  const positions: InvestmentPositionData[] = investmentsSeed.map((investment) => {
    const quantityLabel = investment.quantity >= 1
      ? `${investment.quantity}`
      : investment.quantity.toFixed(2);
    const averagePriceLabel = formatMoney(investment.averagePrice, "USD");
    const currentPriceLabel = formatMoney(investment.detail.currentPrice, "USD");

    return {
      id: investment.id,
      name: investment.name,
      symbol: investment.symbol,
      typeLabel: investment.typeLabel,
      accountLabel: investment.accountLabel,
      accountTone: investment.accountTone,
      quantityLabel,
      averagePriceLabel,
      currentValueLabel: formatMoney(investment.currentValue, "USD"),
      returnLabel: formatSignedAmount(
        Math.abs(investment.returnValue),
        "USD",
        investment.returnValue >= 0
      ),
      returnPercentLabel: `(${investment.returnPercent.toFixed(2)}%)`,
      returnPositive: investment.returnValue >= 0,
      portfolioShareLabel: `${investment.portfolioSharePercent.toFixed(2)}%`,
      badgeLabel: investment.badgeLabel,
      badgeTone: investment.badgeTone,
      detail: {
        statusLabel: investment.detail.statusLabel,
        statusTone: investment.detail.statusTone,
        totalValueLabel: formatMoney(investment.currentValue, "USD"),
        totalReturnLabel: formatSignedAmount(
          Math.abs(investment.returnValue),
          "USD",
          investment.returnValue >= 0
        ),
        totalReturnPercentLabel: `(${investment.returnPercent.toFixed(2)}%)`,
        totalReturnPositive: investment.returnValue >= 0,
        quantityLabel,
        averagePriceLabel,
        currentPriceLabel,
        portfolioShareLabel: `${investment.portfolioSharePercent.toFixed(2)}%`,
        accountLabel: investment.accountLabel,
        updatedAtLabel: investment.detail.updatedAtLabel,
        historyPoints: investment.detail.historyPoints,
        noteLines: investment.detail.noteLines
      }
    };
  });

  const distribution: InvestmentDistributionSliceData[] = [
    {
      id: "stocks",
      label: "Acciones",
      amountLabel: formatMoney(56671.45, "USD"),
      percentageLabel: "45.2%",
      color: "#6d48ff",
      value: 56671.45
    },
    {
      id: "etfs",
      label: "ETFs",
      amountLabel: formatMoney(25210.9, "USD"),
      percentageLabel: "20.1%",
      color: "#2f6ef9",
      value: 25210.9
    },
    {
      id: "fixed",
      label: "Renta fija",
      amountLabel: formatMoney(19170.5, "USD"),
      percentageLabel: "15.3%",
      color: "#34c97e",
      value: 19170.5
    },
    {
      id: "funds",
      label: "Fondos",
      amountLabel: formatMoney(12785.2, "USD"),
      percentageLabel: "10.2%",
      color: "#ffb347",
      value: 12785.2
    },
    {
      id: "cash",
      label: "Efectivo",
      amountLabel: formatMoney(11592.7, "USD"),
      percentageLabel: "9.2%",
      color: "#7f8fa9",
      value: 11592.7
    }
  ];

  const bestPerformers: InvestmentPerformanceItemData[] = [
    { id: "best-apple", label: "Apple Inc.", symbol: "AAPL", metricLabel: "+21.78%", positive: true },
    { id: "best-iwda", label: "iShares Core MSCI World", symbol: "IWDA", metricLabel: "+10.06%", positive: true },
    { id: "best-msft", label: "Microsoft Corp.", symbol: "MSFT", metricLabel: "+7.95%", positive: true }
  ];

  const worstPerformers: InvestmentPerformanceItemData[] = [
    { id: "worst-btc", label: "Bitcoin", symbol: "BTC", metricLabel: "-5.34%", positive: false },
    { id: "worst-eth", label: "Ethereum", symbol: "ETH", metricLabel: "-3.21%", positive: false },
    { id: "worst-tsla", label: "Tesla Inc.", symbol: "TSLA", metricLabel: "-1.82%", positive: false }
  ];

  const upcomingIncome = [
    {
      id: "income-aapl",
      label: "Apple Inc.",
      symbol: "AAPL",
      dateLabel: "15 Jun 2024",
      amountLabel: formatMoney(148.2, "USD")
    },
    {
      id: "income-msft",
      label: "Microsoft Corp.",
      symbol: "MSFT",
      dateLabel: "20 Jun 2024",
      amountLabel: formatMoney(89.6, "USD")
    },
    {
      id: "income-voo",
      label: "Vanguard S&P 500",
      symbol: "VOO",
      dateLabel: "30 Jun 2024",
      amountLabel: formatMoney(62.35, "USD")
    }
  ];

  const contributions: InvestmentContributionItemData[] = [
    {
      id: "contribution-1",
      label: "Aporte a portafolio",
      dateLabel: "10 May 2024",
      amountLabel: formatSignedAmount(1500, "USD", true),
      positive: true
    },
    {
      id: "contribution-2",
      label: "Aporte a portafolio",
      dateLabel: "25 Abr 2024",
      amountLabel: formatSignedAmount(1000, "USD", true),
      positive: true
    },
    {
      id: "contribution-3",
      label: "Aporte a portafolio",
      dateLabel: "10 Abr 2024",
      amountLabel: formatSignedAmount(1200, "USD", true),
      positive: true
    }
  ];

  return {
    tabs: investmentTabs,
    accountOptions: ["Todas las cuentas", "GBM+", "Interactive Brokers", "Binance"],
    typeOptions: ["Todos los tipos", "Accion", "ETF", "Renta fija", "Cripto"],
    metrics,
    portfolioPoints: investmentPortfolioPoints,
    distribution,
    positions,
    bestPerformers,
    worstPerformers,
    upcomingIncome,
    contributions
  };
}

export function buildAlertsPageModel(): AlertsPageModel {
  const metrics: AlertMetricData[] = [
    {
      id: "active",
      label: "Total de alertas activas",
      value: "23",
      helper: "+5 desde ayer",
      icon: "alerts",
      accent: "#7d4dff"
    },
    {
      id: "critical",
      label: "Criticas",
      value: "5",
      helper: "Requieren atencion",
      icon: "warning",
      accent: "#ff5d72"
    },
    {
      id: "pending",
      label: "Pendientes",
      value: "12",
      helper: "Esperando accion",
      icon: "calendar",
      accent: "#f2a93b"
    },
    {
      id: "resolved",
      label: "Resueltas hoy",
      value: "8",
      helper: "Buen trabajo",
      icon: "shield",
      accent: "#34c97e"
    }
  ];

  return {
    tabs: alertTabs,
    metrics,
    rows: alertRowsSeed,
    priorityOptions: ["Todas las prioridades", "Alta", "Media", "Baja"],
    statusOptions: ["Todos los estados", "Nueva", "Vista", "Resuelta", "Ignorada", "Pospuesta"],
    sortOptions: ["Mas recientes", "Prioridad", "Sin resolver"],
    prioritySummary: alertPrioritySummary,
    typeSummary: alertTypeSummary,
    rules: alertRules,
    recommendations: alertRecommendations
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

function buildGoalRow(item: {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  saved: number;
  target: number;
  monthlyContribution: number;
  dueDateLabel: string;
  imageTone: GoalRowData["imageTone"];
}): GoalRowData {
  const progress = item.target === 0 ? 0 : item.saved / item.target;

  return {
    id: item.id,
    title: item.title,
    category: item.category,
    categoryLabel: item.categoryLabel,
    amountSavedLabel: formatMoney(item.saved, "USD"),
    targetLabel: formatMoney(item.target, "USD"),
    progress,
    progressLabel: `${Math.round(progress * 100)}%`,
    monthlyContributionLabel: formatMoney(item.monthlyContribution, "USD"),
    dueDateLabel: item.dueDateLabel,
    imageTone: item.imageTone
  };
}

function buildAccountRow(item: {
  id: string;
  name: string;
  maskedNumber: string;
  kind: AccountKind;
  typeLabel: string;
  typeTone: string;
  institution: string;
  balance: number;
  statusLabel: string;
  statusTone: AccountRowData["statusTone"];
  badgeLabel: string;
  badgeTone: string;
  availableBalance: number;
  accountTypeLabel: string;
  recentMovements: Array<{
    id: string;
    merchant: string;
    dateLabel: string;
    amount: number;
    positive: boolean;
  }>;
  infoFields: AccountInfoFieldData[];
}): AccountRowData {
  return {
    id: item.id,
    name: item.name,
    maskedNumber: item.maskedNumber,
    kind: item.kind,
    typeLabel: item.typeLabel,
    typeTone: item.typeTone,
    institution: item.institution,
    balanceValue: item.balance,
    balanceLabel: formatMoney(item.balance, "USD"),
    positive: item.balance >= 0,
    statusLabel: item.statusLabel,
    statusTone: item.statusTone,
    badgeLabel: item.badgeLabel,
    badgeTone: item.badgeTone,
    availableBalanceLabel: formatMoney(item.availableBalance, "USD"),
    accountTypeLabel: item.accountTypeLabel,
    recentMovements: item.recentMovements.map((movement) => ({
      id: movement.id,
      merchant: movement.merchant,
      dateLabel: movement.dateLabel,
      amountLabel: formatSignedAmount(movement.amount, "USD", movement.positive),
      positive: movement.positive
    })),
    infoFields: item.infoFields
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
