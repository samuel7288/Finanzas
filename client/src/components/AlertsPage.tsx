import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  AlertRecommendationData,
  AlertRowData,
  AlertRuleData,
  AlertStateId,
  AlertSummarySliceData,
  AlertsPageModel,
  AlertTabId
} from "../types";
import { PageHeader } from "./PageHeader";

interface AlertsPageProps {
  model: AlertsPageModel;
  loading: boolean;
}

export function AlertsPage({ model, loading }: AlertsPageProps) {
  const [activeTab, setActiveTab] = useState<AlertTabId>("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState(model.priorityOptions[0]);
  const [statusFilter, setStatusFilter] = useState(model.statusOptions[0]);
  const [sortBy, setSortBy] = useState(model.sortOptions[0]);
  const [rows, setRows] = useState(model.rows);
  const [rules, setRules] = useState(model.rules);
  const [selectedId, setSelectedId] = useState(model.rows[1]?.id ?? model.rows[0]?.id ?? "");

  const visibleRows = useMemo(() => {
    const filtered = rows.filter((row) => {
      if (activeTab !== "all" && row.tab !== activeTab) return false;
      if (priorityFilter !== "Todas las prioridades" && row.priorityLabel !== priorityFilter) {
        return false;
      }
      if (statusFilter !== "Todos los estados" && row.stateLabel !== statusFilter) {
        return false;
      }

      if (!search.trim()) return true;
      const scope = `${row.title} ${row.description} ${row.categoryLabel}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });

    return filtered.sort((left, right) => compareAlerts(left, right, sortBy));
  }, [activeTab, priorityFilter, rows, search, sortBy, statusFilter]);

  useEffect(() => {
    if (!visibleRows.some((row) => row.id === selectedId)) {
      setSelectedId(visibleRows[0]?.id ?? "");
    }
  }, [selectedId, visibleRows]);

  const selectedRow =
    visibleRows.find((row) => row.id === selectedId) ??
    rows.find((row) => row.id === selectedId) ??
    visibleRows[0] ??
    rows[0];

  const recentRows = useMemo(
    () =>
      rows
        .slice()
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
        .slice(0, 4),
    [rows]
  );

  function updateSelectedState(nextState: AlertStateId) {
    if (!selectedRow) return;
    const nextMeta = getAlertStateMeta(nextState);

    setRows((current) =>
      current.map((row) =>
        row.id === selectedRow.id
          ? {
              ...row,
              state: nextState,
              stateLabel: nextMeta.label,
              stateTone: nextMeta.tone
            }
          : row
      )
    );
  }

  function toggleRule(id: string) {
    setRules((current) =>
      current.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    );
  }

  return (
    <>
      <PageHeader
        title="Alertas"
        subtitle="Monitorea lo importante y toma accion a tiempo."
        dateRangeLabel=""
        dateControl={<></>}
        showNotifications={false}
        actions={
          <div className="alerts-header-actions">
            <button className="secondary-action header-inline-button">
              <Icon name="settings" />
              Configurar alertas
            </button>
            <button className="primary-action header-inline-button">
              <Icon name="plus" />
              Nueva alerta
            </button>
          </div>
        }
      />

      <div className="alerts-page-stack">
        <div className="alerts-page-grid">
          <div className="alerts-main-column">
            <section className="alerts-metrics-grid">
              {model.metrics.map((metric) => (
                <article key={metric.id} className="surface alert-metric-card">
                  <div className="metric-top">
                    <div>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                      <span className="alerts-card-helper">{metric.helper}</span>
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

            <div className="gmail-tab-strip" role="tablist" aria-label="Categorias de alertas">
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

            <div className="alerts-toolbar">
              <label className="gmail-search">
                <Icon name="search" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar alerta..."
                />
              </label>

              <label className="gmail-toolbar-select">
                <select
                  value={priorityFilter}
                  onChange={(event) => setPriorityFilter(event.target.value)}
                >
                  {model.priorityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </label>

              <label className="gmail-toolbar-select">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {model.statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </label>

              <label className="gmail-toolbar-select">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  {model.sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </label>
            </div>

            <section className="surface alerts-table-card">
              {loading ? (
                <div className="panel-empty">Cargando alertas...</div>
              ) : visibleRows.length === 0 ? (
                <div className="panel-empty">No encontramos alertas con esos filtros.</div>
              ) : (
                <>
                  <div className="gmail-table-wrap">
                    <table className="alerts-table">
                      <thead>
                        <tr>
                          <th>Alerta</th>
                          <th>Categoria</th>
                          <th>Prioridad</th>
                          <th>Estado</th>
                          <th>Fecha</th>
                          <th>Accion sugerida</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleRows.map((row) => (
                          <tr
                            key={row.id}
                            className={row.id === selectedRow?.id ? "active" : undefined}
                            onClick={() => setSelectedId(row.id)}
                          >
                            <td>
                              <div className="alerts-alert-cell">
                                <span className={`alert-icon-badge ${row.iconTone}`}>
                                  <Icon name={row.icon as IconName} />
                                </span>
                                <div className="alerts-alert-copy">
                                  <strong>{row.title}</strong>
                                  <span>{row.description}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`category-chip ${row.categoryTone}`}>
                                {row.categoryLabel}
                              </span>
                            </td>
                            <td>
                              <span className={`status-pill ${row.priorityTone}`}>
                                {row.priorityLabel}
                              </span>
                            </td>
                            <td>
                              <span className={`alert-state-pill ${row.stateTone}`}>
                                {row.stateLabel}
                              </span>
                            </td>
                            <td>{row.dateLabel}</td>
                            <td>
                              <button
                                className="link-button alert-action-link"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {row.actionLabel}
                              </button>
                            </td>
                            <td>
                              <button
                                className="icon-button muted"
                                aria-label="Mas acciones"
                                onClick={(event) => event.stopPropagation()}
                              >
                                <Icon name="menu" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="transactions-table-footer">
                    <span>
                      Mostrando 1 a {visibleRows.length} de {model.metrics[0]?.value ?? visibleRows.length} alertas
                    </span>
                    <div className="transactions-footer-controls">
                      <div className="gmail-pagination">
                        <button className="icon-button muted">
                          <Icon name="arrowLeft" />
                        </button>
                        <button className="gmail-page-pill active">1</button>
                        <button className="gmail-page-pill">2</button>
                        <button className="gmail-page-pill">3</button>
                        <button className="icon-button muted">
                          <Icon name="arrowRight" />
                        </button>
                      </div>
                      <button className="inline-filter transactions-page-size">
                        <span>10 por pagina</span>
                        <Icon name="chevronDown" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

            <div className="alerts-bottom-grid">
              <section className="surface alerts-bottom-card">
                <div className="section-heading compact">
                  <h2>Alertas recientes</h2>
                  <button className="link-button">Ver todas</button>
                </div>
                <div className="alerts-recent-list">
                  {recentRows.map((row) => (
                    <article key={row.id} className="alerts-recent-row">
                      <span className={`alert-icon-badge compact ${row.iconTone}`}>
                        <Icon name={row.icon as IconName} />
                      </span>
                      <div className="alerts-alert-copy">
                        <strong>{row.title}</strong>
                        <span>{row.dateLabel}</span>
                      </div>
                      <span className={`alert-state-pill ${row.stateTone}`}>
                        {row.stateLabel}
                      </span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="surface alerts-bottom-card">
                <div className="section-heading compact">
                  <h2>Resumen por tipo</h2>
                </div>
                <AlertSummaryDonut
                  slices={model.typeSummary}
                  centerLabel={model.metrics[0]?.value ?? "0"}
                  centerCaption="Total"
                />
              </section>

              <section className="surface alerts-bottom-card">
                <div className="section-heading compact">
                  <h2>Reglas automaticas activas</h2>
                  <button className="link-button">Ver todas</button>
                </div>
                <div className="alerts-rules-list">
                  {rules.map((rule) => (
                    <AlertRuleRow key={rule.id} rule={rule} onToggle={() => toggleRule(rule.id)} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="alerts-side-column">
            <section className="surface alerts-side-card">
              <div className="section-heading compact">
                <h2>Resumen por prioridad</h2>
                <button className="icon-button muted" aria-label="Cerrar resumen">
                  <Icon name="close" />
                </button>
              </div>
              <AlertSummaryDonut
                slices={model.prioritySummary}
                centerLabel={model.metrics[0]?.value ?? "0"}
                centerCaption="Total"
              />
            </section>

            {selectedRow ? (
              <section className="surface alerts-side-card">
                <div className="section-heading compact">
                  <h2>Detalle de la alerta</h2>
                  <button className="icon-button muted" aria-label="Cerrar detalle">
                    <Icon name="close" />
                  </button>
                </div>

                <div className="alerts-detail-header">
                  <span className={`alert-icon-badge large ${selectedRow.iconTone}`}>
                    <Icon name={selectedRow.icon as IconName} />
                  </span>
                  <div className="alerts-detail-copy">
                    <div className="alerts-detail-title">
                      <strong>{selectedRow.title}</strong>
                      <span className={`status-pill ${selectedRow.priorityTone}`}>
                        {selectedRow.priorityLabel}
                      </span>
                    </div>
                    <p>{selectedRow.description}</p>
                  </div>
                </div>

                <div className="alerts-detail-fields">
                  {selectedRow.detail.fields.map((field) => (
                    <div key={field.label} className="alerts-detail-field">
                      <span>{field.label}</span>
                      <strong>{field.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="alerts-detail-recommendation">
                  <span>Accion recomendada</span>
                  <p>{selectedRow.detail.recommendation}</p>
                </div>

                <div className="alerts-detail-actions">
                  <button className="primary-action" onClick={() => updateSelectedState("viewed")}>
                    <Icon name="eye" />
                    Marcar como vista
                  </button>
                  <button className="success-action" onClick={() => updateSelectedState("resolved")}>
                    <Icon name="shield" />
                    Resolver alerta
                  </button>
                  <button className="secondary-action" onClick={() => updateSelectedState("snoozed")}>
                    <Icon name="calendar" />
                    Posponer 3 dias
                  </button>
                  <button className="ghost-button alerts-ignore-button" onClick={() => updateSelectedState("ignored")}>
                    <Icon name="close" />
                    Ignorar alerta
                  </button>
                </div>
              </section>
            ) : null}

            <section className="surface alerts-side-card">
              <div className="section-heading compact">
                <h2>Recomendaciones inteligentes</h2>
              </div>
              <div className="alerts-recommendations-list">
                {model.recommendations.map((item) => (
                  <AlertRecommendationCard key={item.id} item={item} />
                ))}
              </div>
              <button className="link-button">
                Ver todas las recomendaciones
                <Icon name="arrowRight" />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function AlertSummaryDonut({
  slices,
  centerLabel,
  centerCaption
}: {
  slices: AlertSummarySliceData[];
  centerLabel: string;
  centerCaption: string;
}) {
  const gradient = `conic-gradient(${buildConicGradient(slices)})`;

  return (
    <div className="alerts-summary-stack">
      <div className="report-donut" style={{ background: gradient }}>
        <div className="report-donut-hole">
          <strong>{centerLabel}</strong>
          <span>{centerCaption}</span>
        </div>
      </div>

      <div className="goal-summary-list">
        {slices.map((slice) => (
          <div key={slice.id} className="legend-row">
            <span className="legend-dot" style={{ background: slice.color }}></span>
            <span>{slice.label}</span>
            <span>{slice.countLabel}</span>
            <span>{slice.percentageLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertRuleRow({
  rule,
  onToggle
}: {
  rule: AlertRuleData;
  onToggle: () => void;
}) {
  return (
    <article className="alert-rule-row">
      <span className={`alert-icon-badge compact ${rule.iconTone}`}>
        <Icon name={rule.icon as IconName} />
      </span>
      <div className="alerts-alert-copy">
        <strong>{rule.title}</strong>
        <span>{rule.description}</span>
      </div>
      <button
        className={rule.enabled ? "toggle-switch active" : "toggle-switch"}
        onClick={onToggle}
        aria-pressed={rule.enabled}
      >
        <span></span>
      </button>
    </article>
  );
}

function AlertRecommendationCard({ item }: { item: AlertRecommendationData }) {
  return (
    <article className="alert-recommendation-card">
      <span className={`alert-icon-badge compact ${item.iconTone}`}>
        <Icon name={item.icon as IconName} />
      </span>
      <div className="alerts-alert-copy">
        <strong>{item.title}</strong>
        <span>{item.description}</span>
      </div>
    </article>
  );
}

function compareAlerts(left: AlertRowData, right: AlertRowData, sortBy: string) {
  if (sortBy === "Prioridad") {
    const rank = { high: 0, medium: 1, low: 2 };
    return (
      rank[left.priority] - rank[right.priority] ||
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
  }

  if (sortBy === "Sin resolver") {
    const unresolvedRank = (row: AlertRowData) =>
      row.state === "resolved" || row.state === "ignored" ? 1 : 0;
    return (
      unresolvedRank(left) - unresolvedRank(right) ||
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
  }

  return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}

function getAlertStateMeta(state: AlertStateId) {
  const map: Record<
    AlertStateId,
    { label: string; tone: AlertRowData["stateTone"] }
  > = {
    new: { label: "Nueva", tone: "violet" },
    viewed: { label: "Vista", tone: "blue" },
    resolved: { label: "Resuelta", tone: "green" },
    ignored: { label: "Ignorada", tone: "muted" },
    snoozed: { label: "Pospuesta", tone: "muted" }
  };

  return map[state];
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
