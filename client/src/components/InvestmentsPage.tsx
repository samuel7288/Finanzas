import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  InvestmentDistributionSliceData,
  InvestmentPerformanceItemData,
  InvestmentPointData,
  InvestmentPositionData,
  InvestmentsPageModel,
  InvestmentTabId
} from "../types";
import { PageHeader } from "./PageHeader";

interface InvestmentsPageProps {
  model: InvestmentsPageModel;
  loading: boolean;
}

const portfolioRangeOptions = ["1D", "1S", "1M", "3M", "6M", "1A", "Todo"];
const detailRangeOptions = ["1M", "3M", "6M", "1A", "Todo"];

export function InvestmentsPage({ model, loading }: InvestmentsPageProps) {
  const [activeTab, setActiveTab] = useState<InvestmentTabId>("overview");
  const [accountFilter, setAccountFilter] = useState(model.accountOptions[0]);
  const [tableAccountFilter, setTableAccountFilter] = useState(model.accountOptions[0]);
  const [typeFilter, setTypeFilter] = useState(model.typeOptions[0]);
  const [search, setSearch] = useState("");
  const [portfolioRange, setPortfolioRange] = useState("3M");
  const [detailRange, setDetailRange] = useState("3M");
  const [selectedId, setSelectedId] = useState(model.positions[0]?.id ?? "");

  const visiblePositions = useMemo(() => {
    return model.positions.filter((position) => {
      if (tableAccountFilter !== "Todas las cuentas" && position.accountLabel !== tableAccountFilter) {
        return false;
      }

      if (typeFilter !== "Todos los tipos" && position.typeLabel !== typeFilter) {
        return false;
      }

      if (!search.trim()) return true;
      const scope = `${position.name} ${position.symbol} ${position.accountLabel}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });
  }, [model.positions, search, tableAccountFilter, typeFilter]);

  useEffect(() => {
    if (!visiblePositions.some((position) => position.id === selectedId)) {
      setSelectedId(visiblePositions[0]?.id ?? "");
    }
  }, [selectedId, visiblePositions]);

  const selectedPosition =
    visiblePositions.find((position) => position.id === selectedId) ??
    model.positions.find((position) => position.id === selectedId) ??
    visiblePositions[0] ??
    model.positions[0];

  const portfolioSeries = useMemo(
    () => sliceSeriesByRange(model.portfolioPoints, portfolioRange),
    [model.portfolioPoints, portfolioRange]
  );

  const detailSeries = useMemo(
    () =>
      selectedPosition
        ? sliceSeriesByRange(selectedPosition.detail.historyPoints, detailRange)
        : [],
    [detailRange, selectedPosition]
  );

  return (
    <>
      <PageHeader
        title="Inversiones"
        subtitle="Monitorea el rendimiento de tus inversiones en tiempo real."
        dateRangeLabel=""
        dateControl={<></>}
        showNotifications={false}
        actions={
          <div className="investments-header-actions">
            <label className="gmail-toolbar-select investments-header-select">
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

            <button className="primary-action header-inline-button">
              <Icon name="plus" />
              Nueva inversion
            </button>
          </div>
        }
      />

      <div className="investments-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Secciones de inversiones">
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
            <p>Cargando inversiones...</p>
          </section>
        ) : activeTab !== "overview" ? (
          <section className="surface report-placeholder-card">
            <h2>{getInvestmentTabLabel(activeTab)}</h2>
            <p>
              Esta vista ya queda preparada para reutilizar el portafolio, los activos y el
              historial cuando conectemos datos reales.
            </p>
          </section>
        ) : (
          <div className="investments-page-grid">
            <div className="investments-main-column">
              <section className="investments-metrics-grid">
                {model.metrics.map((metric) => (
                  <article key={metric.id} className="surface investment-metric-card">
                    <div className="metric-top">
                      <div>
                        <p>{metric.label}</p>
                        <strong>{metric.value}</strong>
                        <span className="investment-metric-helper">{metric.helper}</span>
                        {metric.trendLabel ? (
                          <span
                            className={
                              metric.trendPositive
                                ? "metric-delta positive"
                                : "metric-delta negative"
                            }
                          >
                            {metric.trendPositive ? "Up" : "Down"} {metric.trendLabel}
                          </span>
                        ) : null}
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

              <div className="investments-top-grid">
                <section className="surface investments-chart-card">
                  <div className="section-heading compact">
                    <h2>Evolucion del portafolio</h2>
                    <div className="investments-range-strip" role="tablist" aria-label="Periodo del portafolio">
                      {portfolioRangeOptions.map((range) => (
                        <button
                          key={range}
                          className={range === portfolioRange ? "gmail-page-pill active" : "gmail-page-pill"}
                          onClick={() => setPortfolioRange(range)}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <PortfolioLineChart points={portfolioSeries} />
                </section>

                <section className="surface investments-distribution-card">
                  <div className="section-heading compact">
                    <h2>Distribucion por tipo de activo</h2>
                  </div>

                  <InvestmentDistributionPanel
                    slices={model.distribution}
                    totalLabel={model.metrics[0]?.value ?? "$0.00"}
                  />

                  <button className="ghost-button report-detail-button">
                    Ver distribucion por cuenta
                    <Icon name="arrowRight" />
                  </button>
                </section>
              </div>

              <section className="surface investments-positions-card">
                <div className="section-heading compact">
                  <h2>Mis posiciones</h2>
                </div>

                <div className="investments-toolbar">
                  <label className="gmail-search">
                    <Icon name="search" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Buscar activo o ticker..."
                    />
                  </label>

                  <label className="gmail-toolbar-select">
                    <select
                      value={tableAccountFilter}
                      onChange={(event) => setTableAccountFilter(event.target.value)}
                    >
                      {model.accountOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <Icon name="chevronDown" />
                  </label>

                  <label className="gmail-toolbar-select">
                    <select
                      value={typeFilter}
                      onChange={(event) => setTypeFilter(event.target.value)}
                    >
                      {model.typeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <Icon name="chevronDown" />
                  </label>

                  <button className="icon-button muted" aria-label="Filtrar posiciones">
                    <Icon name="filter" />
                  </button>
                </div>

                {visiblePositions.length === 0 ? (
                  <div className="panel-empty">No encontramos activos con esos filtros.</div>
                ) : (
                  <>
                    <div className="gmail-table-wrap">
                      <table className="investments-table">
                        <thead>
                          <tr>
                            <th>Activo</th>
                            <th>Tipo</th>
                            <th>Cuenta</th>
                            <th>Cantidad</th>
                            <th>Precio prom.</th>
                            <th>Valor actual</th>
                            <th>Rendimiento</th>
                            <th>% Portafolio</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {visiblePositions.map((position) => (
                            <tr
                              key={position.id}
                              className={position.id === selectedPosition?.id ? "active" : undefined}
                              onClick={() => setSelectedId(position.id)}
                            >
                              <td>
                                <div className="investments-asset-cell">
                                  <span className={`investment-asset-badge ${position.badgeTone}`}>
                                    {position.badgeLabel}
                                  </span>
                                  <div className="investments-asset-copy">
                                    <strong>{position.name}</strong>
                                    <span>{position.symbol}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{position.typeLabel}</td>
                              <td>
                                <span className={`category-chip ${position.accountTone}`}>
                                  {position.accountLabel}
                                </span>
                              </td>
                              <td>{position.quantityLabel}</td>
                              <td>{position.averagePriceLabel}</td>
                              <td>{position.currentValueLabel}</td>
                              <td>
                                <div className="investment-return-stack">
                                  <strong
                                    className={
                                      position.returnPositive
                                        ? "recent-amount positive"
                                        : "recent-amount negative"
                                    }
                                  >
                                    {position.returnLabel}
                                  </strong>
                                  <span>{position.returnPercentLabel}</span>
                                </div>
                              </td>
                              <td>{position.portfolioShareLabel}</td>
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
                      <button className="link-button">
                        Ver todas las posiciones ({model.positions.length})
                        <Icon name="arrowRight" />
                      </button>
                    </div>
                  </>
                )}
              </section>

              <div className="investments-bottom-grid">
                <InvestmentPerformanceCard
                  title="Mejores rendimientos"
                  items={model.bestPerformers}
                />
                <InvestmentPerformanceCard
                  title="Peores rendimientos"
                  items={model.worstPerformers}
                />
                <section className="surface investments-mini-card">
                  <div className="section-heading compact">
                    <h2>Proximos dividendos / intereses</h2>
                  </div>
                  <div className="investments-mini-list">
                    {model.upcomingIncome.map((item) => (
                      <article key={item.id} className="investments-income-row">
                        <div className="investments-income-copy">
                          <strong>
                            {item.label} ({item.symbol})
                          </strong>
                          <span>{item.dateLabel}</span>
                        </div>
                        <strong>{item.amountLabel}</strong>
                      </article>
                    ))}
                  </div>
                  <button className="link-button">
                    Ver calendario completo
                    <Icon name="arrowRight" />
                  </button>
                </section>

                <section className="surface investments-mini-card">
                  <div className="section-heading compact">
                    <h2>Aportes recientes</h2>
                  </div>
                  <div className="investments-mini-list">
                    {model.contributions.map((item) => (
                      <article key={item.id} className="investments-income-row">
                        <div className="investments-income-copy">
                          <strong>{item.label}</strong>
                          <span>{item.dateLabel}</span>
                        </div>
                        <strong className={item.positive ? "recent-amount positive" : "recent-amount negative"}>
                          {item.amountLabel}
                        </strong>
                      </article>
                    ))}
                  </div>
                  <button className="link-button">
                    Ver todos los aportes
                    <Icon name="arrowRight" />
                  </button>
                </section>
              </div>
            </div>

            <aside className="investments-detail-column">
              {selectedPosition ? (
                <section className="surface investments-detail-card">
                  <div className="section-heading compact">
                    <h2>Detalle del activo</h2>
                    <button className="icon-button muted" aria-label="Cerrar detalle">
                      <Icon name="close" />
                    </button>
                  </div>

                  <div className="investments-detail-head">
                    <span className={`investment-asset-badge large ${selectedPosition.badgeTone}`}>
                      {selectedPosition.badgeLabel}
                    </span>
                    <div className="investments-detail-copy">
                      <div className="investments-detail-title">
                        <strong>{selectedPosition.name}</strong>
                        <span className={`status-pill ${selectedPosition.detail.statusTone}`}>
                          {selectedPosition.detail.statusLabel}
                        </span>
                      </div>
                      <span>
                        {selectedPosition.symbol} • {selectedPosition.typeLabel}
                      </span>
                    </div>
                  </div>

                  <div className="investments-detail-metrics">
                    <div>
                      <span>Valor actual</span>
                      <strong>{selectedPosition.detail.totalValueLabel}</strong>
                    </div>
                    <div className="investment-return-stack">
                      <span>Rendimiento total</span>
                      <strong
                        className={
                          selectedPosition.detail.totalReturnPositive
                            ? "recent-amount positive"
                            : "recent-amount negative"
                        }
                      >
                        {selectedPosition.detail.totalReturnLabel}
                      </strong>
                      <small>{selectedPosition.detail.totalReturnPercentLabel}</small>
                    </div>
                  </div>

                  <div className="investments-detail-grid">
                    <div>
                      <span>Cantidad</span>
                      <strong>{selectedPosition.detail.quantityLabel}</strong>
                    </div>
                    <div>
                      <span>Precio promedio</span>
                      <strong>{selectedPosition.detail.averagePriceLabel}</strong>
                    </div>
                    <div>
                      <span>Precio actual</span>
                      <strong>{selectedPosition.detail.currentPriceLabel}</strong>
                    </div>
                    <div>
                      <span>% del portafolio</span>
                      <strong>{selectedPosition.detail.portfolioShareLabel}</strong>
                    </div>
                    <div>
                      <span>Cuenta</span>
                      <strong>{selectedPosition.detail.accountLabel}</strong>
                    </div>
                    <div>
                      <span>Ultima actualizacion</span>
                      <strong>{selectedPosition.detail.updatedAtLabel}</strong>
                    </div>
                  </div>

                  <div className="investments-detail-section">
                    <div className="section-heading compact">
                      <h2>Rendimiento historico</h2>
                      <div className="investments-range-strip" role="tablist" aria-label="Periodo del activo">
                        {detailRangeOptions.map((range) => (
                          <button
                            key={range}
                            className={range === detailRange ? "gmail-page-pill active" : "gmail-page-pill"}
                            onClick={() => setDetailRange(range)}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                    <AssetHistoryChart points={detailSeries} />
                  </div>

                  <div className="investments-detail-section">
                    <div className="section-heading compact">
                      <h2>Notas / Estrategia</h2>
                    </div>
                    <div className="investments-notes">
                      {selectedPosition.detail.noteLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="investments-detail-actions">
                      <button className="secondary-action">
                        <Icon name="edit" />
                        Editar
                      </button>
                      <button className="primary-action">Ver movimientos del activo</button>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="surface page-placeholder">
                  <p>Selecciona un activo para ver su detalle.</p>
                </section>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function PortfolioLineChart({ points }: { points: InvestmentPointData[] }) {
  const path = buildLinePath(points, 760, 280, 22);

  return (
    <div className="line-chart investments-line-chart">
      <svg viewBox="0 0 760 280" preserveAspectRatio="none">
        <defs>
          <linearGradient id="investment-fill" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#7b4dff" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#7b4dff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          <line x1="22" y1="42" x2="738" y2="42" />
          <line x1="22" y1="92" x2="738" y2="92" />
          <line x1="22" y1="142" x2="738" y2="142" />
          <line x1="22" y1="192" x2="738" y2="192" />
          <line x1="22" y1="242" x2="738" y2="242" />
        </g>
        <path d={`${path} L738 242 L22 242 Z`} fill="url(#investment-fill)" />
        <path d={path} stroke="#8a67ff" strokeWidth="3" fill="none" />
      </svg>
      <div className="chart-labels">
        {points.map((point) => (
          <span key={point.id}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

function AssetHistoryChart({ points }: { points: InvestmentPointData[] }) {
  const path = buildLinePath(points, 320, 180, 16);

  return (
    <div className="line-chart investments-detail-chart">
      <svg viewBox="0 0 320 180" preserveAspectRatio="none">
        <g className="chart-grid">
          <line x1="16" y1="28" x2="304" y2="28" />
          <line x1="16" y1="68" x2="304" y2="68" />
          <line x1="16" y1="108" x2="304" y2="108" />
          <line x1="16" y1="148" x2="304" y2="148" />
        </g>
        <path d={path} stroke="#2fd39b" strokeWidth="2.6" fill="none" />
      </svg>
      <div className="chart-labels">
        {points.map((point) => (
          <span key={point.id}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

function InvestmentDistributionPanel({
  slices,
  totalLabel
}: {
  slices: InvestmentDistributionSliceData[];
  totalLabel: string;
}) {
  const gradient = `conic-gradient(${buildConicGradient(slices)})`;

  return (
    <div className="report-donut-layout">
      <div className="report-donut" style={{ background: gradient }}>
        <div className="report-donut-hole">
          <strong>{totalLabel}</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="category-legend">
        {slices.map((slice) => (
          <div key={slice.id} className="legend-row">
            <span className="legend-dot" style={{ background: slice.color }}></span>
            <span>{slice.label}</span>
            <span>{slice.percentageLabel}</span>
            <span>{slice.amountLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestmentPerformanceCard({
  title,
  items
}: {
  title: string;
  items: InvestmentPerformanceItemData[];
}) {
  return (
    <section className="surface investments-mini-card">
      <div className="section-heading compact">
        <h2>{title}</h2>
      </div>
      <div className="investments-mini-list">
        {items.map((item, index) => (
          <article key={item.id} className="investments-performance-row">
            <span>{index + 1}</span>
            <div className="investments-income-copy">
              <strong>{item.label}</strong>
              <span>{item.symbol}</span>
            </div>
            <strong className={item.positive ? "recent-amount positive" : "recent-amount negative"}>
              {item.metricLabel}
            </strong>
          </article>
        ))}
      </div>
      <button className="link-button">
        Ver todos
        <Icon name="arrowRight" />
      </button>
    </section>
  );
}

function sliceSeriesByRange(points: InvestmentPointData[], range: string) {
  const map: Record<string, number> = {
    "1D": 4,
    "1S": 5,
    "1M": 6,
    "3M": 8,
    "6M": 10,
    "1A": 12,
    Todo: points.length
  };

  const size = map[range] ?? points.length;
  return points.slice(Math.max(points.length - size, 0));
}

function buildLinePath(
  points: InvestmentPointData[],
  width: number,
  height: number,
  padding: number
) {
  const values = points.map((point) => point.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(points.length - 1, 1);

  return points
    .map((point, index) => {
      const x = padding + index * step;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
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

function getInvestmentTabLabel(tab: InvestmentTabId) {
  const labels: Record<InvestmentTabId, string> = {
    overview: "Resumen",
    portfolio: "Portafolio",
    assets: "Activos",
    movements: "Movimientos",
    performance: "Rendimiento",
    objectives: "Objetivos"
  };

  return labels[tab];
}
