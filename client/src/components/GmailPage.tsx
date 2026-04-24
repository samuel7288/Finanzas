import { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons";
import {
  GmailPageModel,
  GmailRowData,
  GmailTabId
} from "../types";
import { MerchantBadge } from "./MerchantBadge";
import { PageHeader } from "./PageHeader";

interface GmailPageProps {
  model: GmailPageModel;
  loading: boolean;
  onApprove: (id: string) => void;
  onIgnore: (id: string) => void;
  onApproveMany: (ids: string[]) => void;
  onCategoryChange: (id: string, category: string) => void;
}

export function GmailPage({
  model,
  loading,
  onApprove,
  onIgnore,
  onApproveMany,
  onCategoryChange
}: GmailPageProps) {
  const [activeTab, setActiveTab] = useState<GmailTabId>("pending");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas las categorias");
  const [accountFilter, setAccountFilter] = useState("Todas las cuentas");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [accountOverrides, setAccountOverrides] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [ruleChoices, setRuleChoices] = useState<Record<string, boolean>>({});

  const visibleRows = useMemo(() => {
    return model.rows.filter((row) => {
      if (!matchesTab(row, activeTab)) return false;
      if (categoryFilter !== "Todas las categorias" && row.category !== categoryFilter) {
        return false;
      }
      if (accountFilter !== "Todas las cuentas" && row.accountLabel !== accountFilter) {
        return false;
      }
      if (!search.trim()) return true;

      const scope = `${row.merchant} ${row.subtitle} ${row.emailFrom}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });
  }, [activeTab, accountFilter, categoryFilter, model.rows, search]);

  const selectedRow = useMemo(
    () => visibleRows.find((row) => row.id === selectedId) ?? visibleRows[0] ?? null,
    [selectedId, visibleRows]
  );

  useEffect(() => {
    if (visibleRows.length === 0) {
      setSelectedId(null);
      setSelectedIds([]);
      return;
    }

    if (!selectedId || !visibleRows.some((row) => row.id === selectedId)) {
      setSelectedId(visibleRows[0].id);
    }

    setSelectedIds((current) => current.filter((id) => visibleRows.some((row) => row.id === id)));
  }, [selectedId, visibleRows]);

  const activeCount = model.tabs.find((tab) => tab.id === activeTab)?.count ?? 0;
  const canBulkReview = visibleRows.some((row) => row.status === "pending");

  return (
    <>
      <PageHeader
        title="Compras detectadas en Gmail"
        subtitle="Revisa y confirma las compras detectadas en tus correos. Decide que registrar, categorizar o ignorar."
        dateRangeLabel={model.dateRangeLabel}
        leadingIcon="gmail"
      />

      <div className="gmail-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Estados de compras">
          {model.tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? "gmail-tab active" : "gmail-tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="gmail-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="gmail-toolbar">
          <label className="gmail-search">
            <Icon name="search" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por comercio, producto o correo..."
            />
          </label>

          <button className="gmail-filter-button">
            <Icon name="filter" />
            <span>Filtros</span>
          </button>

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
        </div>

        <div className="gmail-highlight surface">
          <div className="gmail-highlight-copy">
            <span className="gmail-highlight-icon">
              <Icon name="summary" />
            </span>
            <div>
              <strong>Hemos encontrado {model.pendingCount} compras nuevas en tus correos</strong>
              <p>Revisa los detalles y confirma las que deseas registrar.</p>
            </div>
          </div>

          <button
            className="primary-action"
            onClick={() =>
              onApproveMany(visibleRows.filter((row) => row.status === "pending").map((row) => row.id))
            }
            disabled={!canBulkReview}
          >
            Marcar todas como revisadas
          </button>
        </div>

        <div className="gmail-page-grid">
          <section className="surface gmail-table-surface">
            {loading ? (
              <div className="panel-empty">Cargando compras...</div>
            ) : visibleRows.length === 0 ? (
              <div className="panel-empty">
                <p>No hay compras en esta vista.</p>
              </div>
            ) : (
              <>
                <div className="gmail-table-wrap">
                  <table className="gmail-table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={selectedIds.length > 0 && selectedIds.length === visibleRows.length}
                            onChange={(event) =>
                              setSelectedIds(event.target.checked ? visibleRows.map((row) => row.id) : [])
                            }
                          />
                        </th>
                        <th>Comercio</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Categoria sugerida</th>
                        <th>Cuenta sugerida</th>
                        <th>Confianza</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.map((row) => (
                        <tr
                          key={row.id}
                          className={selectedRow?.id === row.id ? "selected" : ""}
                          onClick={() => setSelectedId(row.id)}
                        >
                          <td onClick={(event) => event.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(row.id)}
                              onChange={(event) =>
                                setSelectedIds((current) =>
                                  event.target.checked
                                    ? [...current, row.id]
                                    : current.filter((id) => id !== row.id)
                                )
                              }
                            />
                          </td>
                          <td>
                            <div className="gmail-merchant-cell">
                              <MerchantBadge merchant={row.merchant} compact />
                              <div className="gmail-merchant-copy">
                                <strong>{row.merchant}</strong>
                                <span>{row.subtitle}</span>
                              </div>
                            </div>
                          </td>
                          <td>{row.dateLabel}</td>
                          <td className="gmail-amount-cell">{row.amountLabel}</td>
                          <td>
                            <span className={`category-chip ${row.categoryTone}`}>
                              {row.category}
                            </span>
                          </td>
                          <td>{row.accountLabel}</td>
                          <td>
                            <span className={`confidence-chip ${row.confidenceTone}`}>
                              {row.confidencePercent}%
                            </span>
                          </td>
                          <td onClick={(event) => event.stopPropagation()}>
                            {row.isAutomatic ? (
                              <button className="success-action" onClick={() => onApprove(row.id)}>
                                Automatico
                              </button>
                            ) : row.status === "ignored" ? (
                              <button className="ghost-button gmail-row-button" onClick={() => setSelectedId(row.id)}>
                                Ver
                              </button>
                            ) : (
                              <button className="primary-action" onClick={() => setSelectedId(row.id)}>
                                Revisar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="gmail-table-footer">
                  <span>Mostrando {visibleRows.length} de {activeCount} compras</span>
                  <div className="gmail-pagination">
                    <button className="icon-button muted">
                      <Icon name="arrowLeft" />
                    </button>
                    <button className="gmail-page-pill active">1</button>
                    <button className="icon-button muted">
                      <Icon name="arrowRight" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>

          <aside className="surface gmail-detail-surface">
            {selectedRow ? (
              <GmailDetailPanel
                row={selectedRow}
                accountOptions={model.accountOptions.filter(
                  (option) => option !== "Todas las cuentas"
                )}
                categoryOptions={model.categoryOptions.filter(
                  (option) => option !== "Todas las categorias"
                )}
                selectedAccount={accountOverrides[selectedRow.id] ?? selectedRow.accountLabel}
                note={notes[selectedRow.id] ?? ""}
                createRule={ruleChoices[selectedRow.id] ?? selectedRow.isAutomatic}
                onAccountChange={(value) =>
                  setAccountOverrides((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onCategoryChange={(value) => onCategoryChange(selectedRow.id, value)}
                onNoteChange={(value) =>
                  setNotes((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onCreateRuleChange={(value) =>
                  setRuleChoices((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onApprove={() => onApprove(selectedRow.id)}
                onIgnore={() => onIgnore(selectedRow.id)}
              />
            ) : (
              <div className="panel-empty side-empty">Selecciona una compra para verla aqui</div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function GmailDetailPanel({
  row,
  accountOptions,
  categoryOptions,
  selectedAccount,
  note,
  createRule,
  onAccountChange,
  onCategoryChange,
  onNoteChange,
  onCreateRuleChange,
  onApprove,
  onIgnore
}: {
  row: GmailRowData;
  accountOptions: string[];
  categoryOptions: string[];
  selectedAccount: string;
  note: string;
  createRule: boolean;
  onAccountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onCreateRuleChange: (value: boolean) => void;
  onApprove: () => void;
  onIgnore: () => void;
}) {
  return (
    <div className="gmail-detail-stack">
      <div className="gmail-detail-header">
        <h2>Detalle de la compra</h2>
        <button className="icon-button muted" aria-label="Cerrar">
          <Icon name="close" />
        </button>
      </div>

      <div className="gmail-detail-merchant">
        <MerchantBadge merchant={row.merchant} />
        <div className="gmail-detail-merchant-copy">
          <strong>{row.merchant}</strong>
          <span>{row.subtitle}</span>
          <small>{row.detail.datetimeLabel}</small>
        </div>
        <span className="detail-status-pill">{row.statusLabel}</span>
      </div>

      <div className="gmail-detail-total">{row.detail.totalLabel}</div>

      <section className="detail-card">
        <h3>Informacion detectada</h3>
        <dl className="detail-fields">
          {row.detail.fields.map((field) => (
            <div key={field.label} className="detail-field-row">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>

        <div className="detail-products">
          <div className="detail-products-title">
            <span>Productos ({row.detail.products.length})</span>
          </div>
          {row.detail.products.map((product) => (
            <div key={product.id} className="detail-product-row">
              <span>{product.name}</span>
              <strong>{product.amountLabel}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-card">
        <h3>Clasificacion</h3>

        <label className="detail-form-row">
          <span>Categoria</span>
          <div className="gmail-toolbar-select detail-select">
            <select
              value={row.category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Icon name="chevronDown" />
          </div>
        </label>

        <label className="detail-form-row">
          <span>Cuenta</span>
          <div className="gmail-toolbar-select detail-select">
            <select
              value={selectedAccount}
              onChange={(event) => onAccountChange(event.target.value)}
            >
              {accountOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Icon name="chevronDown" />
          </div>
        </label>

        <label className="detail-form-row">
          <span>Notas (opcional)</span>
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Anadir una nota..."
          />
        </label>

        <label className="detail-rule-toggle">
          <input
            type="checkbox"
            checked={createRule}
            onChange={(event) => onCreateRuleChange(event.target.checked)}
          />
          <div>
            <strong>Crear regla para futuras compras en {row.merchant}</strong>
            <span>Las proximas compras de este comercio se registraran automaticamente.</span>
          </div>
        </label>
      </section>

      <div className="detail-actions">
        <button className="danger-action" onClick={onIgnore}>
          Ignorar
        </button>
        <button className="primary-action" onClick={onApprove}>
          Registrar compra
        </button>
      </div>
    </div>
  );
}

function matchesTab(row: GmailRowData, tab: GmailTabId) {
  if (tab === "pending") return row.status === "pending";
  if (tab === "registered") return row.status === "approved";
  if (tab === "ignored") return row.status === "ignored";
  return row.isAutomatic || row.createRuleSuggested;
}
