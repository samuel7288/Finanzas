import { CSSProperties, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  ReportAverageCategoryData,
  ReportCategoryData,
  ReportComparisonRowData,
  ReportsPageModel,
  ReportTabId,
  ReportTrendPointData
} from "../types";
import { PageHeader } from "./PageHeader";

interface ReportsPageProps {
  model: ReportsPageModel;
  loading: boolean;
}

export function ReportsPage({ model, loading }: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState<ReportTabId>("overview");
  const [accountFilter, setAccountFilter] = useState(model.accountOptions[0]);
  const [categoryFilter, setCategoryFilter] = useState(model.categoryOptions[0]);
  const [comparePrevious, setComparePrevious] = useState(true);

  const visibleCategories = useMemo(() => {
    if (categoryFilter === "Todas las categorias") return model.categories;
    return model.categories.filter((item) => item.label === categoryFilter);
  }, [categoryFilter, model.categories]);

  const visibleAverageCategories = useMemo(() => {
    if (categoryFilter === "Todas las categorias") return model.averageCategories;
    return model.averageCategories.filter((item) => item.label === categoryFilter);
  }, [categoryFilter, model.averageCategories]);

  return (
    <>
      <PageHeader
        title="Reportes"
        subtitle="Analiza tus finanzas con reportes detallados y visualizaciones inteligentes."
        dateRangeLabel={model.dateRangeLabel}
        showNotifications={false}
        actions={
          <button className="secondary-action header-inline-button">
            <Icon name="download" />
            Exportar reporte
            <Icon name="chevronDown" />
          </button>
        }
      />

      <div className="reports-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Secciones de reportes">
          {model.tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? "gmail-tab active" : "gmail-tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <section className="surface page-placeholder">
            <p>Cargando reportes...</p>
          </section>
        ) : activeTab !== "overview" ? (
          <section className="surface report-placeholder-card">
            <h2>{getReportTabLabel(activeTab)}</h2>
            <p>
              Esta vista va a reutilizar el mismo motor de reportes, pero con filtros y
              comparaciones mas especificas.
            </p>
          </section>
        ) : (
          <>
            <section className="reports-metrics-grid">
              {model.metrics.map((metric) => (
                <article key={metric.id} className="surface report-metric-card">
                  <div className="metric-top">
                    <div>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                      <span
                        className={
                          metric.deltaPositive ? "metric-delta positive" : "metric-delta negative"
                        }
                      >
                        {metric.deltaPositive ? "Up" : "Down"} {metric.delta}
                      </span>
                    </div>
                    <span
                      className="metric-icon"
                      style={{ "--metric-accent": metric.accent } as CSSProperties}
                    >
                      <Icon name={metric.icon as IconName} />
                    </span>
                  </div>
                </article>
              ))}
            </section>

            <div className="reports-toolbar">
              <label className="gmail-toolbar-select">
                <select
                  value={accountFilter}
                  onChange={(event) => setAccountFilter(event.target.value)}
                >
                  {model.accountOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </label>

              <label className="gmail-toolbar-select">
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                >
                  {model.categoryOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </label>

              <div className="reports-toolbar-toggle">
                <span>Comparar con periodo anterior</span>
                <button
                  className={comparePrevious ? "toggle-switch active" : "toggle-switch"}
                  onClick={() => setComparePrevious((current) => !current)}
                  aria-pressed={comparePrevious}
                >
                  <span></span>
                </button>
              </div>
            </div>

            <div className="reports-primary-grid">
              <section className="surface report-chart-card">
                <div className="section-heading compact">
                  <h2>Ingresos vs Gastos</h2>
                  <div className="report-chart-legend">
                    <span><i className="legend-swatch income"></i>Ingresos</span>
                    <span><i className="legend-swatch expense"></i>Gastos</span>
                    <span><i className="legend-swatch savings"></i>Ahorro</span>
                  </div>
                </div>

                <ComparisonChart rows={model.comparisonRows} showSavings={comparePrevious} />

                <div className="report-summary-strip">
                  {model.comparisonSummary.map((item) => (
                    <article key={item.id} className="report-summary-box">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <small className={item.positive ? "positive" : "negative"}>
                        {item.positive ? "Up" : "Down"} {item.delta}
                      </small>
                    </article>
                  ))}
                </div>
              </section>

              <section className="surface report-donut-card">
                <div className="section-heading compact">
                  <h2>Gastos por categoria</h2>
                </div>
                <ReportCategoryDonut categories={visibleCategories} />
                <button className="ghost-button report-detail-button">
                  Ver detalle por categoria
                  <Icon name="arrowRight" />
                </button>
              </section>
            </div>

            <div className="reports-secondary-grid">
              <section className="surface report-chart-card">
                <div className="section-heading compact">
                  <div>
                    <h2>Tendencia de gastos</h2>
                  </div>
                  <div className="report-chart-legend">
                    <span><i className="legend-swatch trend"></i>Gasto total</span>
                    <span><i className="legend-swatch moving"></i>Promedio movil (3m)</span>
                  </div>
                </div>
                <TrendChart points={model.trendPoints} showMovingAverage={comparePrevious} />
              </section>

              <section className="surface report-horizontal-card">
                <div className="section-heading compact">
                  <h2>Gasto promedio por categoria</h2>
                </div>
                <AverageCategoryBars rows={visibleAverageCategories} />
              </section>

              <section className="surface report-annual-card">
                <div className="section-heading compact">
                  <h2>Resumen anual</h2>
                </div>
                <div className="report-annual-list">
                  <div>
                    <span>Ingresos</span>
                    <strong className="positive">{model.annualSummary.incomeLabel}</strong>
                  </div>
                  <div>
                    <span>Gastos</span>
                    <strong className="negative">{model.annualSummary.expenseLabel}</strong>
                  </div>
                  <div>
                    <span>Ahorro</span>
                    <strong className="report-accent-blue">{model.annualSummary.savingsLabel}</strong>
                  </div>
                </div>

                <div className="report-savings-rate">
                  <div>
                    <span>Tasa de ahorro</span>
                    <strong>{model.annualSummary.savingsRateLabel}</strong>
                  </div>
                  <div
                    className="report-savings-ring"
                    style={{
                      background: `conic-gradient(#2f6ef9 0deg ${model.annualSummary.savingsRateProgress * 360}deg, rgba(68,81,110,0.45) ${model.annualSummary.savingsRateProgress * 360}deg 360deg)`
                    }}
                  >
                    <div></div>
                  </div>
                </div>

                <button className="ghost-button report-detail-button">
                  Ver reporte anual completo
                  <Icon name="arrowRight" />
                </button>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ComparisonChart({
  rows,
  showSavings
}: {
  rows: ReportComparisonRowData[];
  showSavings: boolean;
}) {
  const maxValue = Math.max(...rows.flatMap((row) => [row.income, row.expense, row.savings]), 1);
  const width = 760;
  const height = 280;
  const baseline = 220;
  const slot = width / rows.length;
  const barWidth = 28;
  const savingsPath = rows
    .map((row, index) => {
      const x = slot * index + slot / 2;
      const y = baseline - (row.savings / maxValue) * 150;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="report-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <g className="chart-grid">
          <line x1="18" y1="40" x2={width - 20} y2="40" />
          <line x1="18" y1="85" x2={width - 20} y2="85" />
          <line x1="18" y1="130" x2={width - 20} y2="130" />
          <line x1="18" y1="175" x2={width - 20} y2="175" />
          <line x1="18" y1={baseline} x2={width - 20} y2={baseline} />
        </g>

        {rows.map((row, index) => {
          const center = slot * index + slot / 2;
          const incomeHeight = (row.income / maxValue) * 150;
          const expenseHeight = (row.expense / maxValue) * 150;
          return (
            <g key={row.id}>
              <rect
                x={center - barWidth - 6}
                y={baseline - incomeHeight}
                width={barWidth}
                height={incomeHeight}
                rx="6"
                fill="#24c96f"
              />
              <rect
                x={center + 6}
                y={baseline - expenseHeight}
                width={barWidth}
                height={expenseHeight}
                rx="6"
                fill="#e64b75"
              />
              <text x={center} y="248" textAnchor="middle" className="budget-chart-label">
                {row.label}
              </text>
            </g>
          );
        })}

        {showSavings ? (
          <>
            <path d={savingsPath} stroke="#7d6bff" strokeWidth="3" fill="none" />
            {rows.map((row, index) => {
              const x = slot * index + slot / 2;
              const y = baseline - (row.savings / maxValue) * 150;
              return <circle key={`dot-${row.id}`} cx={x} cy={y} r="4.5" fill="#a493ff" />;
            })}
          </>
        ) : null}
      </svg>
    </div>
  );
}

function ReportCategoryDonut({ categories }: { categories: ReportCategoryData[] }) {
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  const gradient = `conic-gradient(${buildConicGradient(categories)})`;

  return (
    <div className="report-donut-layout">
      <div className="report-donut" style={{ background: gradient }}>
        <div className="report-donut-hole">
          <strong>{formatMoney(total)}</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="category-legend">
        {categories.map((item) => (
          <div key={item.id} className="legend-row">
            <span className="legend-dot" style={{ background: item.color }}></span>
            <span>{item.label}</span>
            <span>{item.amountLabel}</span>
            <span>{item.percentageLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendChart({
  points,
  showMovingAverage
}: {
  points: ReportTrendPointData[];
  showMovingAverage: boolean;
}) {
  const path = buildLinePath(points.map((point) => point.value), 640, 250, 18);
  const movingPath = buildLinePath(points.map((point) => point.movingAverage), 640, 250, 18);

  return (
    <div className="line-chart report-trend-chart">
      <svg viewBox="0 0 640 250" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trend-fill" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#7b4dff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7b4dff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          <line x1="18" y1="36" x2="620" y2="36" />
          <line x1="18" y1="90" x2="620" y2="90" />
          <line x1="18" y1="145" x2="620" y2="145" />
          <line x1="18" y1="200" x2="620" y2="200" />
        </g>
        <path d={`${path} L620 220 L18 220 Z`} fill="url(#trend-fill)" />
        <path d={path} stroke="#9c7bff" strokeWidth="3" fill="none" />
        {showMovingAverage ? (
          <path
            d={movingPath}
            stroke="#b59eff"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
            opacity="0.82"
          />
        ) : null}
      </svg>
      <div className="chart-labels">
        {points.map((point) => (
          <span key={point.id}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

function AverageCategoryBars({ rows }: { rows: ReportAverageCategoryData[] }) {
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <div className="report-average-list">
      {rows.map((row) => (
        <div key={row.id} className="report-average-row">
          <span>{row.label}</span>
          <div className="report-average-track">
            <span style={{ width: `${(row.value / max) * 100}%` }}></span>
          </div>
          <strong>{row.valueLabel}</strong>
        </div>
      ))}
    </div>
  );
}

function buildConicGradient(items: Array<{ color: string; value: number }>) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let current = 0;

  return items
    .map((item) => {
      const start = (current / total) * 360;
      current += item.value;
      const end = (current / total) * 360;
      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");
}

function buildLinePath(series: number[], width: number, height: number, padding: number) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(series.length - 1, 1);

  return series
    .map((value, index) => {
      const x = padding + index * step;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function getReportTabLabel(tab: ReportTabId) {
  const labels: Record<ReportTabId, string> = {
    overview: "Resumen general",
    expenses: "Gastos",
    income: "Ingresos",
    accounts: "Cuentas",
    comparisons: "Comparaciones",
    trends: "Tendencias"
  };

  return labels[tab];
}
