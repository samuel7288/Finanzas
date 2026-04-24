import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  AccountDistributionSliceData,
  AccountRowData,
  AccountsPageModel,
  AccountTabId
} from "../types";
import { MerchantBadge } from "./MerchantBadge";
import { PageHeader } from "./PageHeader";

interface AccountsPageProps {
  model: AccountsPageModel;
  loading: boolean;
}

export function AccountsPage({ model, loading }: AccountsPageProps) {
  const [activeTab, setActiveTab] = useState<AccountTabId>("overview");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(model.typeOptions[0]);
  const [selectedId, setSelectedId] = useState(model.rows[0]?.id ?? "");

  const visibleRows = useMemo(() => {
    return model.rows.filter((row) => {
      if (!matchesAccountTab(row, activeTab)) return false;
      if (typeFilter !== "Todos los tipos" && row.typeLabel !== typeFilter) return false;

      if (!search.trim()) return true;
      const scope = `${row.name} ${row.maskedNumber} ${row.institution} ${row.typeLabel}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });
  }, [activeTab, model.rows, search, typeFilter]);

  useEffect(() => {
    if (!visibleRows.some((row) => row.id === selectedId)) {
      setSelectedId(visibleRows[0]?.id ?? "");
    }
  }, [selectedId, visibleRows]);

  const selectedRow =
    visibleRows.find((row) => row.id === selectedId) ??
    model.rows.find((row) => row.id === selectedId) ??
    visibleRows[0] ??
    model.rows[0];

  return (
    <>
      <PageHeader
        title="Cuentas"
        subtitle="Administra todas tus cuentas y tarjetas en un solo lugar."
        dateRangeLabel={model.dateRangeLabel}
        dateControl={<></>}
        showNotifications={false}
        actions={
          <button className="primary-action header-inline-button">
            <Icon name="plus" />
            Agregar cuenta
          </button>
        }
      />

      <div className="accounts-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Secciones de cuentas">
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
            <p>Cargando cuentas...</p>
          </section>
        ) : (
          <div className="accounts-page-grid">
            <div className="accounts-main-column">
              <section className="accounts-metrics-grid">
                {model.metrics.map((metric) => (
                  <article key={metric.id} className="surface account-metric-card">
                    <div className="metric-top">
                      <div>
                        <p>{metric.label}</p>
                        <strong>{metric.value}</strong>
                        <span className="account-metric-helper">{metric.helper}</span>
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

              <div className="accounts-content-grid">
                <section className="surface accounts-table-card">
                  <div className="section-heading compact">
                    <h2>Todas las cuentas</h2>
                  </div>

                  <div className="accounts-toolbar">
                    <label className="gmail-search">
                      <Icon name="search" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Buscar cuenta..."
                      />
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

                    <button className="ghost-button">
                      <Icon name="filter" />
                      Filtros
                    </button>
                  </div>

                  {visibleRows.length === 0 ? (
                    <div className="panel-empty">No encontramos cuentas con esos filtros.</div>
                  ) : (
                    <>
                      <div className="gmail-table-wrap">
                        <table className="accounts-table">
                          <thead>
                            <tr>
                              <th>Cuenta</th>
                              <th>Tipo</th>
                              <th>Institucion</th>
                              <th>Saldo actual</th>
                              <th>Estado</th>
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
                                  <div className="accounts-account-cell">
                                    <span className={`account-institution-badge ${row.badgeTone}`}>
                                      {row.badgeLabel}
                                    </span>
                                    <div className="accounts-account-copy">
                                      <strong>{row.name}</strong>
                                      <span>{row.maskedNumber}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className={`category-chip ${row.typeTone}`}>
                                    {row.typeLabel}
                                  </span>
                                </td>
                                <td>{row.institution}</td>
                                <td className={row.positive ? "account-balance positive" : "account-balance negative"}>
                                  {row.balanceLabel}
                                </td>
                                <td>
                                  <span className={`status-pill ${row.statusTone}`}>
                                    {row.statusLabel}
                                  </span>
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
                          Mostrando 1 a {visibleRows.length} de {visibleRows.length} cuentas
                        </span>
                      </div>
                    </>
                  )}
                </section>

                <div className="accounts-insights-column">
                  <section className="surface accounts-side-card">
                    <div className="section-heading compact">
                      <h2>Distribucion por tipo</h2>
                    </div>
                    <AccountsDistributionPanel
                      slices={model.distribution}
                      totalLabel={model.metrics[0]?.value ?? "$0.00"}
                    />
                  </section>

                  <section className="surface accounts-side-card">
                    <div className="section-heading compact">
                      <div>
                        <h2>Conexiones</h2>
                        <p className="section-helper">
                          Conecta tus cuentas para mantener saldos actualizados.
                        </p>
                      </div>
                    </div>

                    <div className="accounts-connection-list">
                      {model.connections.map((connection) => (
                        <button key={connection.id} className="accounts-connection-chip">
                          <span className={`account-institution-badge ${connection.tone}`}>
                            {connection.badgeLabel}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button className="ghost-button report-detail-button">
                      Administrar conexiones
                    </button>
                  </section>
                </div>
              </div>
            </div>

            <aside className="accounts-detail-column">
              {selectedRow ? (
                <>
                  <section className="surface accounts-detail-card">
                    <div className="section-heading compact">
                      <h2>Detalle de la cuenta</h2>
                    </div>

                    <div className="accounts-detail-header">
                      <span className={`account-institution-badge large ${selectedRow.badgeTone}`}>
                        {selectedRow.badgeLabel}
                      </span>
                      <div className="accounts-detail-copy">
                        <div className="accounts-detail-title">
                          <strong>{selectedRow.name}</strong>
                          <span className={`status-pill ${selectedRow.statusTone}`}>
                            {selectedRow.statusLabel}
                          </span>
                        </div>
                        <span>
                          {selectedRow.typeLabel} {selectedRow.maskedNumber}
                        </span>
                      </div>
                    </div>

                    <div className={selectedRow.positive ? "accounts-detail-balance positive" : "accounts-detail-balance negative"}>
                      {selectedRow.balanceLabel}
                    </div>

                    <div className="accounts-detail-meta">
                      <div>
                        <span>Saldo disponible</span>
                        <strong>{selectedRow.availableBalanceLabel}</strong>
                      </div>
                      <div>
                        <span>Tipo de cuenta</span>
                        <strong>{selectedRow.accountTypeLabel}</strong>
                      </div>
                    </div>

                    <div className="accounts-detail-actions">
                      <button className="primary-action">
                        Ver movimientos
                      </button>
                      <button className="secondary-action">
                        <Icon name="edit" />
                        Editar cuenta
                      </button>
                    </div>
                  </section>

                  <section className="surface accounts-detail-card">
                    <div className="section-heading compact">
                      <h2>Movimientos recientes</h2>
                      <button className="link-button">Ver todos</button>
                    </div>

                    <div className="recent-list">
                      {selectedRow.recentMovements.map((movement) => (
                        <article key={movement.id} className="recent-row">
                          <MerchantBadge merchant={movement.merchant} compact />
                          <div className="recent-copy">
                            <strong>{movement.merchant}</strong>
                            <span>{movement.dateLabel}</span>
                          </div>
                          <strong
                            className={
                              movement.positive
                                ? "recent-amount positive"
                                : "recent-amount negative"
                            }
                          >
                            {movement.amountLabel}
                          </strong>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="surface accounts-detail-card">
                    <div className="section-heading compact">
                      <h2>Informacion de la cuenta</h2>
                    </div>

                    <div className="accounts-info-list">
                      {selectedRow.infoFields.map((field) => (
                        <div key={field.label} className="accounts-info-row">
                          <span>{field.label}</span>
                          <strong>{field.value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <section className="surface page-placeholder">
                  <p>Selecciona una cuenta para ver su detalle.</p>
                </section>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function AccountsDistributionPanel({
  slices,
  totalLabel
}: {
  slices: AccountDistributionSliceData[];
  totalLabel: string;
}) {
  const gradient = `conic-gradient(${buildConicGradient(slices)})`;

  return (
    <div className="accounts-distribution-stack">
      <div className="report-donut" style={{ background: gradient }}>
        <div className="report-donut-hole">
          <strong>{totalLabel}</strong>
          <span>Total</span>
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
    </div>
  );
}

function buildConicGradient(items: Array<{ color: string; value: number }>) {
  const normalizedTotal =
    items.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;
  let current = 0;

  return items
    .map((item) => {
      const normalizedValue = Math.max(item.value, 0);
      const start = (current / normalizedTotal) * 360;
      current += normalizedValue;
      const end = (current / normalizedTotal) * 360;
      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");
}

function matchesAccountTab(row: AccountRowData, tab: AccountTabId) {
  if (tab === "overview") return true;
  if (tab === "banking") return row.kind === "bank";
  if (tab === "cards") return row.kind === "card";
  if (tab === "cash") return row.kind === "cash";
  if (tab === "investments") return row.kind === "investment";
  if (tab === "loans") return row.kind === "loan";
  return row.statusTone === "success";
}
