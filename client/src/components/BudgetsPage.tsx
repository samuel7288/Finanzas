import { CSSProperties, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  BudgetAdviceData,
  BudgetAlertData,
  BudgetDailyRowData,
  BudgetRowData,
  BudgetsPageModel,
  BudgetViewTabId
} from "../types";
import { PageHeader } from "./PageHeader";

interface BudgetsPageProps {
  model: BudgetsPageModel;
  loading: boolean;
}

export function BudgetsPage({ model, loading }: BudgetsPageProps) {
  const [activeTab, setActiveTab] = useState<BudgetViewTabId>("general");
  const [search, setSearch] = useState("");
  const [accountFilter, setAccountFilter] = useState("Todas las cuentas");

  const visibleRows = useMemo(() => {
    if (activeTab === "daily") {
      if (!search.trim()) return model.dailyRows;
      return model.dailyRows.filter((row) =>
        row.dateLabel.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    return model.rows.filter((row) => {
      if (!search.trim()) return true;
      const scope = `${row.category} ${row.subtitle}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });
  }, [activeTab, model.dailyRows, model.rows, search]);

  return (
    <>
      <PageHeader
        title="Presupuestos"
        subtitle="Define limites de gasto por categoria y controla tu dinero cada mes."
        dateRangeLabel={model.monthLabel}
        showNotifications={false}
        dateControl={
          <div className="month-control">
            <button className="icon-button muted" aria-label="Mes anterior">
              <Icon name="arrowLeft" />
            </button>
            <button className="month-label-button">{model.monthLabel}</button>
            <button className="icon-button muted" aria-label="Mes siguiente">
              <Icon name="arrowRight" />
            </button>
            <button className="icon-button muted" aria-label="Calendario">
              <Icon name="calendar" />
            </button>
          </div>
        }
        actions={
          <button className="primary-action header-inline-button">
            <Icon name="plus" />
            Nuevo presupuesto
          </button>
        }
      />

      <div className="budgets-page-stack">
        <div className="budgets-layout">
          <div className="budgets-main-column">
            <section className="budgets-metrics-grid">
              {model.metrics.map((metric) => (
                <article key={metric.id} className="surface budget-metric-card">
                  <div className="metric-top">
                    <div>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                      <span className="budget-metric-helper">{metric.helper}</span>
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

            <div className="gmail-tab-strip budgets-view-tabs" role="tablist" aria-label="Vista de presupuestos">
              {model.viewTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={tab.id === activeTab ? "gmail-tab active" : "gmail-tab"}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="budgets-toolbar">
              <label className="gmail-search">
                <Icon name="search" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={activeTab === "general" ? "Buscar categoria..." : "Buscar dia..."}
                />
              </label>

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

              <button className="ghost-button budgets-edit-button">
                <Icon name="edit" />
                Editar presupuestos
              </button>
            </div>

            <section className="surface budgets-table-surface">
              {loading ? (
                <div className="panel-empty">Cargando presupuestos...</div>
              ) : activeTab === "general" ? (
                <BudgetCategoryTable rows={visibleRows as BudgetRowData[]} />
              ) : (
                <BudgetDailyTable rows={visibleRows as BudgetDailyRowData[]} />
              )}
            </section>

            <section className="surface budget-chart-card">
              <div className="section-heading compact">
                <div>
                  <h2>Gasto vs Presupuesto</h2>
                  <p className="section-helper">Resumen comparativo de tu progreso mensual</p>
                </div>
                <div className="budget-chart-legend">
                  <span><i className="legend-swatch budget"></i>Presupuesto</span>
                  <span><i className="legend-swatch spent"></i>Gastado</span>
                </div>
              </div>

              <div className="budget-chart-layout">
                <BudgetComparisonChart rows={model.chartRows} />
                <BudgetMiniSummary summary={model.summary} />
              </div>
            </section>
          </div>

          <aside className="budgets-side-column">
            <section className="surface budget-side-card">
              <div className="section-heading compact">
                <h2>Resumen del mes</h2>
              </div>
              <BudgetSummaryCard summary={model.summary} />
            </section>

            <section className="surface budget-side-card">
              <div className="section-heading compact">
                <h2>Alertas de presupuesto</h2>
                <button className="link-button">Ver todas</button>
              </div>
              <div className="budget-side-list">
                {model.alerts.map((alert) => (
                  <BudgetSideRow key={alert.id} item={alert} />
                ))}
              </div>
            </section>

            <section className="surface budget-side-card">
              <div className="section-heading compact">
                <h2>Consejos para ti</h2>
              </div>
              <div className="budget-advice-list">
                {model.advice.map((advice) => (
                  <BudgetAdviceCard key={advice.id} advice={advice} />
                ))}
              </div>
            </section>

            <section className="surface budget-side-card">
              <div className="section-heading compact">
                <h2>Acciones rapidas</h2>
              </div>
              <div className="budget-side-list">
                {model.quickActions.map((action) => (
                  <button key={action.id} className="budget-quick-action">
                    <span className="settings-row-icon">
                      <Icon name={action.icon as IconName} />
                    </span>
                    <span>{action.label}</span>
                    <Icon name="arrowRight" />
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function BudgetCategoryTable({ rows }: { rows: BudgetRowData[] }) {
  return rows.length === 0 ? (
    <div className="panel-empty">No encontramos categorias en esta vista.</div>
  ) : (
    <>
      <div className="gmail-table-wrap">
        <table className="budgets-table">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Presupuesto</th>
              <th>Gastado</th>
              <th>Restante</th>
              <th>Progreso</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="budget-category-cell">
                    <span className={`budget-category-badge ${row.tone}`}>
                      <Icon name={row.icon as IconName} />
                    </span>
                    <div className="budget-category-copy">
                      <strong>{row.category}</strong>
                      <span>{row.subtitle}</span>
                    </div>
                  </div>
                </td>
                <td>{row.budgetLabel}</td>
                <td className="amount-negative">-{row.spentLabel}</td>
                <td className={row.remainingPositive ? "budget-remaining-positive" : "amount-negative"}>
                  {row.remainingPositive ? row.remainingLabel : `-${row.remainingLabel}`}
                </td>
                <td>
                  <div className="budget-progress-inline">
                    <div className="budget-track">
                      <span
                        className={`budget-progress-fill ${row.statusTone}`}
                        style={{ width: `${Math.min(row.progress, 1) * 100}%` }}
                      ></span>
                    </div>
                    <strong>{Math.round(row.progress * 100)}%</strong>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${row.statusTone === "danger" ? "warning" : row.statusTone}`}>
                    {row.statusLabel}
                  </span>
                </td>
                <td>
                  <button className="icon-button muted" aria-label="Mas acciones">
                    <Icon name="menu" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transactions-table-footer">
        <span>Mostrando 1 a {rows.length} de {rows.length} categorias</span>
        <div className="transactions-footer-controls">
          <div className="gmail-pagination">
            <button className="icon-button muted">
              <Icon name="arrowLeft" />
            </button>
            <button className="gmail-page-pill active">1</button>
            <button className="icon-button muted">
              <Icon name="arrowRight" />
            </button>
          </div>
          <button className="inline-filter transactions-page-size">
            <span>25 por pagina</span>
            <Icon name="chevronDown" />
          </button>
        </div>
      </div>
    </>
  );
}

function BudgetDailyTable({ rows }: { rows: BudgetDailyRowData[] }) {
  return rows.length === 0 ? (
    <div className="panel-empty">No encontramos dias en esta vista.</div>
  ) : (
    <>
      <div className="gmail-table-wrap">
        <table className="budgets-table daily">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Gastado</th>
              <th>Objetivo diario</th>
              <th>Progreso</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.dateLabel}</td>
                <td className="amount-negative">-{row.spentLabel}</td>
                <td>{row.targetLabel}</td>
                <td>
                  <div className="budget-progress-inline">
                    <div className="budget-track">
                      <span
                        className={`budget-progress-fill ${row.statusTone}`}
                        style={{ width: `${Math.min(row.progress, 1) * 100}%` }}
                      ></span>
                    </div>
                    <strong>{Math.round(row.progress * 100)}%</strong>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${row.statusTone === "danger" ? "warning" : row.statusTone}`}>
                    {row.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="transactions-table-footer">
        <span>Mostrando {rows.length} dias del periodo</span>
      </div>
    </>
  );
}

function BudgetSummaryCard({ summary }: { summary: BudgetsPageModel["summary"] }) {
  const donutStyle = {
    background: `conic-gradient(#6f49ff 0deg ${summary.spentProgress * 360}deg, rgba(68, 81, 110, 0.65) ${summary.spentProgress * 360}deg 360deg)`
  } as CSSProperties;

  return (
    <div className="budget-summary-stack">
      <div className="budget-summary-top">
        <div className="budget-summary-donut" style={donutStyle}>
          <div className="budget-summary-hole">
            <strong>{Math.round(summary.spentProgress * 100)}%</strong>
            <span>Gastado</span>
          </div>
        </div>

        <div className="budget-summary-legend">
          <div>
            <i className="legend-swatch spent"></i>
            <span>Gastado</span>
            <strong>{summary.spentLabel}</strong>
          </div>
          <div>
            <i className="legend-swatch muted"></i>
            <span>Restante</span>
            <strong>{summary.remainingLabel}</strong>
          </div>
        </div>
      </div>

      <div className="budget-summary-footer">
        <div>
          <span>Presupuesto total</span>
          <strong>{summary.totalLabel}</strong>
        </div>
        <div>
          <span>Dias restantes</span>
          <strong>{summary.daysRemainingLabel}</strong>
        </div>
      </div>
    </div>
  );
}

function BudgetSideRow({ item }: { item: BudgetAlertData }) {
  return (
    <article className="budget-side-row">
      <span className={`budget-side-icon ${item.tone}`}>
        <Icon name={item.icon as IconName} />
      </span>
      <div className="budget-side-copy">
        <strong>{item.title}</strong>
        <span>{item.description}</span>
      </div>
      <Icon name="arrowRight" />
    </article>
  );
}

function BudgetAdviceCard({ advice }: { advice: BudgetAdviceData }) {
  return (
    <article className={`budget-advice-card ${advice.tone}`}>
      <span className="budget-side-icon">
        <Icon name={advice.icon as IconName} />
      </span>
      <div className="budget-side-copy">
        <strong>{advice.title}</strong>
        <span>{advice.description}</span>
      </div>
    </article>
  );
}

function BudgetComparisonChart({ rows }: { rows: BudgetsPageModel["chartRows"] }) {
  const maxValue = Math.max(...rows.flatMap((row) => [row.budget, row.spent]), 1);
  const chartHeight = 220;
  const chartWidth = 720;
  const baseline = 190;
  const slot = chartWidth / rows.length;
  const barWidth = Math.min(26, slot * 0.24);

  return (
    <div className="budget-chart-wrap">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
        <g className="chart-grid">
          <line x1="16" y1="30" x2={chartWidth - 12} y2="30" />
          <line x1="16" y1="70" x2={chartWidth - 12} y2="70" />
          <line x1="16" y1="110" x2={chartWidth - 12} y2="110" />
          <line x1="16" y1="150" x2={chartWidth - 12} y2="150" />
          <line x1="16" y1={baseline} x2={chartWidth - 12} y2={baseline} />
        </g>

        {rows.map((row, index) => {
          const center = slot * index + slot / 2;
          const budgetHeight = (row.budget / maxValue) * 130;
          const spentHeight = (row.spent / maxValue) * 130;

          return (
            <g key={row.id}>
              <rect
                x={center - barWidth - 4}
                y={baseline - budgetHeight}
                width={barWidth}
                height={budgetHeight}
                rx="6"
                fill="#7b4dff"
              />
              <rect
                x={center + 4}
                y={baseline - spentHeight}
                width={barWidth}
                height={spentHeight}
                rx="6"
                fill="#2f6ef9"
              />
              <text
                x={center}
                y="212"
                textAnchor="middle"
                className="budget-chart-label"
              >
                {row.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BudgetMiniSummary({ summary }: { summary: BudgetsPageModel["summary"] }) {
  const donutStyle = {
    background: `conic-gradient(#6f49ff 0deg ${summary.spentProgress * 360}deg, rgba(68, 81, 110, 0.45) ${summary.spentProgress * 360}deg 360deg)`
  } as CSSProperties;

  return (
    <div className="budget-mini-summary">
      <div className="budget-mini-donut" style={donutStyle}>
        <div className="budget-mini-hole">
          <strong>{Math.round(summary.spentProgress * 100)}%</strong>
          <span>Gastado</span>
        </div>
      </div>
      <p>
        {summary.spentLabel} de {summary.totalLabel}
      </p>
    </div>
  );
}
