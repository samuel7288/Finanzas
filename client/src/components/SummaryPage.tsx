import { CSSProperties } from "react";
import { categories } from "../dashboardData";
import { Icon, IconName } from "../icons";
import { SummaryPageModel } from "../types";
import { MerchantBadge } from "./MerchantBadge";
import { PageHeader } from "./PageHeader";

interface SummaryPageProps {
  model: SummaryPageModel;
  loading: boolean;
  onSyncGmail: () => void;
  onApproveDetected: (id: string) => void;
  onIgnoreDetected: (id: string) => void;
  onCategoryChange: (id: string, category: string) => void;
  onOpenGmailPage: () => void;
}

export function SummaryPage({
  model,
  loading,
  onSyncGmail,
  onApproveDetected,
  onIgnoreDetected,
  onCategoryChange,
  onOpenGmailPage
}: SummaryPageProps) {
  const totalCategoryValue = model.categories.reduce((sum, item) => sum + item.value, 0);
  const donutGradient = `conic-gradient(${buildConicGradient(model.categories)})`;

  return (
    <>
      <PageHeader
        title={`Hola, ${model.userName}!`}
        subtitle={model.subtitle}
        dateRangeLabel={model.dateRangeLabel}
      />

      <div className="dashboard-columns">
        <div className="dashboard-primary">
          <section className="surface panel-spacious">
            <div className="section-heading">
              <div>
                <div className="section-title-row">
                  <span className="section-icon">
                    <Icon name="gmail" />
                  </span>
                  <h2>Compras detectadas en Gmail</h2>
                  <span className="section-pill">
                    {model.reviewItems.length} pendientes por revisar
                  </span>
                </div>
                <p className="section-helper">
                  Hemos encontrado estas compras en tus correos. Revisa y confirma
                  para registrarlas automaticamente.
                </p>
              </div>

              <button className="ghost-button" onClick={onOpenGmailPage}>
                Ver todas
              </button>
            </div>

            {loading ? (
              <div className="panel-empty">Cargando datos...</div>
            ) : model.reviewItems.length === 0 ? (
              <div className="panel-empty">
                <p>No hay compras pendientes por revisar.</p>
                <button className="primary-action" onClick={onSyncGmail}>
                  <Icon name="sync" />
                  Sincronizar Gmail
                </button>
              </div>
            ) : (
              <div className="review-list">
                {model.reviewItems.map((item) => (
                  <article key={item.id} className="review-row">
                    <MerchantBadge merchant={item.merchant} />

                    <div className="review-main">
                      <strong>{item.merchant}</strong>
                      <span>{item.subtitle}</span>
                    </div>

                    <span className="review-time">{item.timeLabel}</span>
                    <span className="review-amount">{item.amountLabel}</span>

                    <label className="review-select">
                      <span className="sr-only">Categoria</span>
                      <select
                        value={item.category}
                        onChange={(event) =>
                          onCategoryChange(item.id, event.target.value)
                        }
                      >
                        {categories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                      <Icon name="chevronDown" />
                    </label>

                    <button
                      className={
                        item.actionTone === "success"
                          ? "success-action"
                          : "primary-action"
                      }
                      onClick={() => onApproveDetected(item.id)}
                    >
                      {item.actionLabel}
                    </button>

                    <button
                      className="icon-button muted"
                      title="Ignorar"
                      aria-label="Ignorar"
                      onClick={() => onIgnoreDetected(item.id)}
                    >
                      <Icon name="menu" />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="metrics-grid">
            {model.metrics.map((metric) => (
              <article key={metric.id} className="surface metric-card">
                <div className="metric-top">
                  <div>
                    <p>{metric.label}</p>
                    <strong>{metric.value}</strong>
                  </div>
                  <span
                    className="metric-icon"
                    style={{ "--metric-accent": metric.accent } as CSSProperties}
                  >
                    <Icon name={metric.icon as IconName} />
                  </span>
                </div>

                <span
                  className={
                    metric.deltaPositive
                      ? "metric-delta positive"
                      : "metric-delta negative"
                  }
                >
                  {metric.deltaPositive ? "Up" : "Down"} {metric.delta}
                </span>

                <Sparkline accent={metric.accent} series={metric.series} />
              </article>
            ))}
          </section>

          <section className="analytics-grid">
            <article className="surface chart-panel">
              <div className="section-heading compact">
                <h2>Gastos por categoria</h2>
                <button className="inline-filter">
                  <span>Este mes</span>
                  <Icon name="chevronDown" />
                </button>
              </div>

              <div className="category-content">
                <div className="donut-chart" style={{ background: donutGradient }}>
                  <div className="donut-hole">
                    <strong>{formatMoney(totalCategoryValue, "USD")}</strong>
                    <span>Total</span>
                  </div>
                </div>

                <div className="category-legend">
                  {model.categories.map((item) => (
                    <div key={item.id} className="legend-row">
                      <span
                        className="legend-dot"
                        style={{ background: item.color }}
                      ></span>
                      <span>{item.label}</span>
                      <span>{item.amountLabel}</span>
                      <span>{item.percentageLabel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="surface chart-panel">
              <div className="section-heading compact">
                <h2>Evolucion de saldo</h2>
                <button className="inline-filter">
                  <span>Este mes</span>
                  <Icon name="chevronDown" />
                </button>
              </div>

              <LineChart series={model.balanceSeries} accent="#7d4dff" />
            </article>
          </section>

          <section className="surface goals-panel">
            <div className="section-heading compact">
              <h2>Metas financieras</h2>
              <button className="link-button">Ver todas</button>
            </div>

            <div className="goals-grid">
              {model.goals.map((goal) =>
                goal.isAddCard ? (
                  <button key={goal.id} className="goal-card add-goal">
                    <span className="add-goal-icon">+</span>
                    <span>Nueva meta</span>
                  </button>
                ) : (
                  <article key={goal.id} className="goal-card">
                    <div className="goal-icon" style={{ color: goal.color }}>
                      <Icon name={goal.icon as IconName} />
                    </div>
                    <div className="goal-copy">
                      <strong>{goal.title}</strong>
                      <span>{goal.amountLabel}</span>
                    </div>
                    <span className="goal-progress-value">
                      {Math.round(goal.progress * 100)}%
                    </span>
                    <div className="goal-progress-bar">
                      <span
                        style={{ width: `${goal.progress * 100}%`, background: goal.color }}
                      ></span>
                    </div>
                    <p>{goal.timeLabel}</p>
                  </article>
                )
              )}
            </div>
          </section>
        </div>

        <aside className="dashboard-secondary">
          <section className="surface side-panel">
            <div className="section-heading compact">
              <h2>Transacciones recientes</h2>
              <button className="link-button">Ver todas</button>
            </div>

            {model.recentTransactions.length === 0 ? (
              <div className="panel-empty side-empty">Sin transacciones recientes</div>
            ) : (
              <div className="recent-list">
                {model.recentTransactions.map((item) => (
                  <article key={item.id} className="recent-row">
                    <MerchantBadge merchant={item.merchant} compact />
                    <div className="recent-copy">
                      <strong>{item.merchant}</strong>
                      <span>
                        {item.dateLabel} - {item.category}
                      </span>
                    </div>
                    <span
                      className={
                        item.positive
                          ? "recent-amount positive"
                          : "recent-amount negative"
                      }
                    >
                      {item.amountLabel}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="surface side-panel">
            <div className="section-heading compact">
              <h2>Presupuesto mensual</h2>
              <button className="link-button">Ver todos</button>
            </div>

            <div className="budget-list">
              {model.budgets.map((item) => (
                <article key={item.id} className="budget-row">
                  <div className="budget-copy">
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                  <div className="budget-progress">
                    <div className="budget-track">
                      <span
                        style={{ width: `${item.progress * 100}%`, background: item.color }}
                      ></span>
                    </div>
                    <strong>{Math.round(item.progress * 100)}%</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="surface side-panel">
            <div className="section-heading compact">
              <h2>Insights inteligentes</h2>
              <button className="link-button">Ver todos</button>
            </div>

            <div className="insights-list">
              {model.insights.map((item) => (
                <article
                  key={item.id}
                  className={item.tone === "green" ? "insight-card green" : "insight-card"}
                >
                  <div className="insight-icon">
                    <Icon name={item.icon as IconName} />
                  </div>
                  <div className="insight-copy">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span>{item.accentValue}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function Sparkline({ series, accent }: { series: number[]; accent: string }) {
  const path = buildLinePath(series, 260, 56, 6);
  const gradientId = `spark-${accent.replace("#", "")}`;

  return (
    <svg className="sparkline" viewBox="0 0 260 56" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <path d={`${path} L254 54 L6 54 Z`} fill={`url(#${gradientId})`} />
      <path d={path} stroke={accent} strokeWidth="2.4" fill="none" />
    </svg>
  );
}

function LineChart({ series, accent }: { series: number[]; accent: string }) {
  const path = buildLinePath(series, 640, 280, 20);

  return (
    <div className="line-chart">
      <svg viewBox="0 0 640 280" preserveAspectRatio="none">
        <defs>
          <linearGradient id="balance-fill" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          <line x1="20" y1="40" x2="620" y2="40" />
          <line x1="20" y1="110" x2="620" y2="110" />
          <line x1="20" y1="180" x2="620" y2="180" />
          <line x1="20" y1="250" x2="620" y2="250" />
        </g>
        <path d={`${path} L620 250 L20 250 Z`} fill="url(#balance-fill)" />
        <path d={path} stroke={accent} strokeWidth="3" fill="none" />
      </svg>

      <div className="chart-labels">
        <span>1 May</span>
        <span>8 May</span>
        <span>15 May</span>
        <span>22 May</span>
        <span>31 May</span>
      </div>
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

function buildLinePath(
  series: number[],
  width: number,
  height: number,
  padding: number
) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(series.length - 1, 1);

  return series
    .map((value, index) => {
      const x = padding + index * step;
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}
