import { CSSProperties, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  GoalRowData,
  GoalSummarySliceData,
  GoalsPageModel,
  GoalCategoryTabId
} from "../types";
import { PageHeader } from "./PageHeader";

interface GoalsPageProps {
  model: GoalsPageModel;
  loading: boolean;
}

export function GoalsPage({ model, loading }: GoalsPageProps) {
  const [activeTab, setActiveTab] = useState<GoalCategoryTabId>("all");

  const visibleRows = useMemo(() => {
    if (activeTab === "all") return model.rows;
    return model.rows.filter((row) => row.category === activeTab);
  }, [activeTab, model.rows]);

  return (
    <>
      <PageHeader
        title="Metas"
        subtitle="Alcanza tus objetivos financieros y haz crecer tu patrimonio."
        dateRangeLabel="1 - 31 Mayo 2024"
        showNotifications={false}
        actions={
          <button className="primary-action header-inline-button">
            <Icon name="plus" />
            Nueva meta
          </button>
        }
      />

      <div className="goals-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Categorias de metas">
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
            <p>Cargando metas...</p>
          </section>
        ) : (
          <div className="goals-layout">
            <div className="goals-main-column">
              <section className="goals-metrics-grid">
                {model.metrics.map((metric) => (
                  <article key={metric.id} className="surface goal-metric-card">
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
                    {metric.progress !== undefined ? (
                      <div className="goal-metric-progress">
                        <div className="budget-track">
                          <span
                            className="budget-progress-fill success"
                            style={{ width: `${metric.progress * 100}%` }}
                          ></span>
                        </div>
                      </div>
                    ) : null}
                  </article>
                ))}
              </section>

              <section className="surface goals-list-card">
                <div className="section-heading compact">
                  <h2>Tus metas</h2>
                  <div className="goals-toolbar">
                    <button className="inline-filter goals-inline-filter">
                      <span>Ordenar por: Proximas</span>
                      <Icon name="chevronDown" />
                    </button>
                    <button className="ghost-button goals-filter-button">
                      <Icon name="filter" />
                      Filtros
                    </button>
                  </div>
                </div>

                <div className="goals-list">
                  {visibleRows.map((goal) => (
                    <GoalRow key={goal.id} row={goal} />
                  ))}
                </div>

                <div className="transactions-table-footer">
                  <span>
                    Mostrando 1 a {visibleRows.length} de {visibleRows.length} metas
                  </span>
                </div>
              </section>
            </div>

            <aside className="goals-side-column">
              <section className="surface goals-side-card">
                <div className="section-heading compact">
                  <h2>Resumen de metas</h2>
                </div>
                <GoalSummaryPanel slices={model.summarySlices} />
              </section>

              <section className="surface goals-side-card">
                <div className="section-heading compact">
                  <h2>Proximas metas a alcanzar</h2>
                </div>
                <div className="goals-side-list">
                  {model.upcomingGoals.map((goal) => (
                    <article key={goal.id} className="goals-side-row">
                      <span className={`budget-side-icon ${goal.tone}`}>
                        <Icon name={mapGoalToneToIcon(goal.tone)} />
                      </span>
                      <div className="budget-side-copy">
                        <strong>{goal.title}</strong>
                        <span>{goal.subtitle}</span>
                      </div>
                      <strong className="goal-progress-accent">{goal.progressLabel}</strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="surface goals-side-card">
                <div className="section-heading compact">
                  <h2>{model.recommendation.title}</h2>
                </div>
                <div className="goals-recommendation">
                  <span className="budget-side-icon warning">
                    <Icon name="alerts" />
                  </span>
                  <p>{model.recommendation.description}</p>
                  <button className="ghost-button report-detail-button">
                    {model.recommendation.ctaLabel}
                  </button>
                </div>
              </section>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function GoalRow({ row }: { row: GoalRowData }) {
  return (
    <article className="goal-list-row">
      <div className={`goal-image goal-${row.imageTone}`}></div>

      <div className="goal-list-copy">
        <strong>{row.title}</strong>
        <span>{row.categoryLabel}</span>
      </div>

      <div className="goal-list-amount">
        <strong>{row.amountSavedLabel}</strong>
        <span>de {row.targetLabel}</span>
        <div className="budget-track">
          <span
            className="budget-progress-fill success"
            style={{ width: `${row.progress * 100}%` }}
          ></span>
        </div>
      </div>

      <div className="goal-list-progress">
        <strong>{row.progressLabel}</strong>
        <span>Completado</span>
      </div>

      <div className="goal-list-meta">
        <div>
          <span>Aportacion mensual</span>
          <strong>{row.monthlyContributionLabel}</strong>
        </div>
        <div>
          <span>Fecha objetivo</span>
          <strong>{row.dueDateLabel}</strong>
        </div>
      </div>

      <button className="icon-button muted" aria-label="Mas acciones">
        <Icon name="menu" />
      </button>
    </article>
  );
}

function GoalSummaryPanel({ slices }: { slices: GoalSummarySliceData[] }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const gradient = `conic-gradient(${buildConicGradient(slices)})`;

  return (
    <div className="goal-summary-stack">
      <div className="report-donut" style={{ background: gradient }}>
        <div className="report-donut-hole">
          <strong>{formatMoney(total)}</strong>
          <span>Total ahorrado</span>
        </div>
      </div>

      <div className="goal-summary-list">
        {slices.map((slice) => (
          <div key={slice.id} className="legend-row">
            <span className="legend-dot" style={{ background: slice.color }}></span>
            <span>{slice.label}</span>
            <span>{slice.amountLabel}</span>
            <span>{slice.percentageLabel}</span>
          </div>
        ))}
      </div>

      <div className="goal-summary-footer">
        <span>Aportacion mensual total</span>
        <strong>$5,200.00</strong>
      </div>
    </div>
  );
}

function buildConicGradient(items: Array<{ color: string; value: number }>) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
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

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function mapGoalToneToIcon(tone: string): IconName {
  if (tone === "tone-green") return "home";
  if (tone === "tone-blue") return "accounts";
  return "investments";
}
