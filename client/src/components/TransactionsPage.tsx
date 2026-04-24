import { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons";
import {
  TransactionChipId,
  TransactionRowData,
  TransactionsPageModel,
  TransactionsTabId
} from "../types";
import { MerchantBadge } from "./MerchantBadge";
import { PageHeader } from "./PageHeader";

interface TransactionsPageProps {
  model: TransactionsPageModel;
  loading: boolean;
  onApprove: (id: string) => void;
  onIgnore: (id: string) => void;
  onCategoryChange: (id: string, category: string) => void;
}

export function TransactionsPage({
  model,
  loading,
  onApprove,
  onIgnore,
  onCategoryChange
}: TransactionsPageProps) {
  const [activeTab, setActiveTab] = useState<TransactionsTabId>("all");
  const [activeChip, setActiveChip] = useState<TransactionChipId>("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas las categorias");
  const [accountFilter, setAccountFilter] = useState("Todas las cuentas");
  const [paymentFilter, setPaymentFilter] = useState("Todos los metodos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [accountOverrides, setAccountOverrides] = useState<Record<string, string>>({});
  const [paymentOverrides, setPaymentOverrides] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});

  const visibleRows = useMemo(() => {
    return model.rows.filter((row) => {
      if (!matchesTransactionTab(row, activeTab)) return false;
      if (!matchesTransactionChip(row, activeChip)) return false;
      if (categoryFilter !== "Todas las categorias" && row.category !== categoryFilter) {
        return false;
      }
      if (accountFilter !== "Todas las cuentas" && row.accountLabel !== accountFilter) {
        return false;
      }
      if (paymentFilter !== "Todos los metodos" && row.paymentMethodLabel !== paymentFilter) {
        return false;
      }
      if (!search.trim()) return true;

      const scope = `${row.merchant} ${row.subtitle} ${row.accountLabel}`.toLowerCase();
      return scope.includes(search.trim().toLowerCase());
    });
  }, [accountFilter, activeChip, activeTab, categoryFilter, model.rows, paymentFilter, search]);

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

  const activeCount = model.chips.find((chip) => chip.id === activeChip)?.count ?? model.rows.length;

  return (
    <>
      <PageHeader
        title="Transacciones"
        subtitle="Consulta, filtra y gestiona todos tus movimientos."
        dateRangeLabel={model.dateRangeLabel}
        showNotifications={false}
        actions={
          <>
            <button className="secondary-action header-inline-button">
              <Icon name="download" />
              Exportar
            </button>
            <button className="primary-action header-inline-button">
              <Icon name="plus" />
              Nueva transaccion
            </button>
          </>
        }
      />

      <div className="transactions-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Tipos de transaccion">
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

        <div className="transactions-toolbar">
          <label className="gmail-search">
            <Icon name="search" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar transacciones..."
            />
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
              value={paymentFilter}
              onChange={(event) => setPaymentFilter(event.target.value)}
            >
              {model.paymentMethodOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Icon name="chevronDown" />
          </label>

          <button className="gmail-filter-button">
            <Icon name="filter" />
            <span>Filtros</span>
          </button>
        </div>

        <div className="transaction-chip-strip" role="tablist" aria-label="Estados de transaccion">
          {model.chips.map((chip) => (
            <button
              key={chip.id}
              className={
                chip.id === activeChip
                  ? `transaction-filter-chip active tone-${chip.tone}`
                  : `transaction-filter-chip tone-${chip.tone}`
              }
              onClick={() => setActiveChip(chip.id)}
            >
              <span>{chip.label}</span>
              <span className="transaction-filter-count">{chip.count}</span>
            </button>
          ))}
        </div>

        <div className="transactions-page-grid">
          <section className="surface transactions-table-surface">
            {loading ? (
              <div className="panel-empty">Cargando transacciones...</div>
            ) : visibleRows.length === 0 ? (
              <div className="panel-empty">
                <p>No hay transacciones en esta vista.</p>
              </div>
            ) : (
              <>
                <div className="gmail-table-wrap">
                  <table className="transactions-table">
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
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Cuenta</th>
                        <th>Metodo</th>
                        <th>Monto</th>
                        <th>Estado</th>
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
                          <td className="transactions-date-cell">{row.dateLabel}</td>
                          <td>
                            <div className="gmail-merchant-cell">
                              <MerchantBadge merchant={row.merchant} compact />
                              <div className="gmail-merchant-copy">
                                <strong>{row.merchant}</strong>
                                <span>{row.subtitle}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`category-chip ${row.categoryTone}`}>
                              {row.category}
                            </span>
                          </td>
                          <td>{row.accountLabel}</td>
                          <td>{row.paymentMethodLabel}</td>
                          <td className={row.positive ? "amount-positive" : "amount-negative"}>
                            {row.amountLabel}
                          </td>
                          <td>
                            <span className={`status-pill ${row.statusTone}`}>
                              {row.statusLabel}
                            </span>
                          </td>
                          <td onClick={(event) => event.stopPropagation()}>
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
                  <span>Mostrando 1 a {visibleRows.length} de {activeCount} transacciones</span>

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
                      <span>25 por pagina</span>
                      <Icon name="chevronDown" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>

          <aside className="surface gmail-detail-surface">
            {selectedRow ? (
              <TransactionDetailPanel
                row={selectedRow}
                categoryOptions={model.categoryOptions.filter(
                  (option) => option !== "Todas las categorias"
                )}
                accountOptions={model.accountOptions.filter(
                  (option) => option !== "Todas las cuentas"
                )}
                paymentMethodOptions={model.paymentMethodOptions.filter(
                  (option) => option !== "Todos los metodos"
                )}
                selectedAccount={accountOverrides[selectedRow.id] ?? selectedRow.accountLabel}
                selectedPaymentMethod={
                  paymentOverrides[selectedRow.id] ?? selectedRow.paymentMethodLabel
                }
                note={notes[selectedRow.id] ?? ""}
                isEditing={editingRows[selectedRow.id] ?? false}
                onAccountChange={(value) =>
                  setAccountOverrides((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onPaymentMethodChange={(value) =>
                  setPaymentOverrides((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onNoteChange={(value) =>
                  setNotes((current) => ({ ...current, [selectedRow.id]: value }))
                }
                onToggleEditing={() =>
                  setEditingRows((current) => ({
                    ...current,
                    [selectedRow.id]: !(current[selectedRow.id] ?? false)
                  }))
                }
                onCategoryChange={(value) => onCategoryChange(selectedRow.id, value)}
                onApprove={() => onApprove(selectedRow.id)}
                onIgnore={() => onIgnore(selectedRow.id)}
              />
            ) : (
              <div className="panel-empty side-empty">
                Selecciona una transaccion para verla aqui
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function TransactionDetailPanel({
  row,
  categoryOptions,
  accountOptions,
  paymentMethodOptions,
  selectedAccount,
  selectedPaymentMethod,
  note,
  isEditing,
  onAccountChange,
  onPaymentMethodChange,
  onNoteChange,
  onToggleEditing,
  onCategoryChange,
  onApprove,
  onIgnore
}: {
  row: TransactionRowData;
  categoryOptions: string[];
  accountOptions: string[];
  paymentMethodOptions: string[];
  selectedAccount: string;
  selectedPaymentMethod: string;
  note: string;
  isEditing: boolean;
  onAccountChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onToggleEditing: () => void;
  onCategoryChange: (value: string) => void;
  onApprove: () => void;
  onIgnore: () => void;
}) {
  return (
    <div className="gmail-detail-stack">
      <div className="gmail-detail-header">
        <h2>Detalle de la transaccion</h2>
        <button className="icon-button muted" aria-label="Cerrar">
          <Icon name="close" />
        </button>
      </div>

      <div className="gmail-detail-merchant">
        <MerchantBadge merchant={row.merchant} />
        <div className="gmail-detail-merchant-copy">
          <strong>{row.merchant}</strong>
          <span>{row.subtitle}</span>
          <small>{row.dateLabel}</small>
        </div>
        {row.sourceLabel ? (
          <span className="source-pill">{row.sourceLabel}</span>
        ) : (
          <span className={`status-pill ${row.statusTone}`}>{row.statusLabel}</span>
        )}
      </div>

      <div className={row.positive ? "transaction-detail-total positive" : "gmail-detail-total"}>
        {row.detail.totalLabel}
      </div>

      <section className="detail-card">
        <h3>Informacion</h3>
        <dl className="detail-fields">
          <div className="detail-field-row">
            <dt>Categoria</dt>
            <dd>
              {isEditing ? (
                <div className="gmail-toolbar-select detail-select">
                  <select value={row.category} onChange={(event) => onCategoryChange(event.target.value)}>
                    {categoryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" />
                </div>
              ) : (
                <span className={`category-chip ${row.categoryTone}`}>{row.category}</span>
              )}
            </dd>
          </div>

          <div className="detail-field-row">
            <dt>Cuenta</dt>
            <dd>
              {isEditing ? (
                <div className="gmail-toolbar-select detail-select">
                  <select value={selectedAccount} onChange={(event) => onAccountChange(event.target.value)}>
                    {accountOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" />
                </div>
              ) : (
                row.detail.accountLabel
              )}
            </dd>
          </div>

          <div className="detail-field-row">
            <dt>Metodo de pago</dt>
            <dd>
              {isEditing ? (
                <div className="gmail-toolbar-select detail-select">
                  <select
                    value={selectedPaymentMethod}
                    onChange={(event) => onPaymentMethodChange(event.target.value)}
                  >
                    {paymentMethodOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" />
                </div>
              ) : (
                row.detail.paymentMethodLabel
              )}
            </dd>
          </div>

          <div className="detail-field-row">
            <dt>Estado</dt>
            <dd>
              <span className={`status-pill ${row.detail.statusTone}`}>{row.detail.statusLabel}</span>
            </dd>
          </div>

          {row.detail.confidenceLabel ? (
            <div className="detail-field-row">
              <dt>Confianza de deteccion</dt>
              <dd>
                <span className="confidence-chip high">{row.detail.confidenceLabel}</span>
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="detail-card">
        <h3>Comercio</h3>
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
          <div className="detail-product-row detail-product-total">
            <span>Total</span>
            <strong>{row.detail.totalLabel}</strong>
          </div>
        </div>
      </section>

      <section className="detail-card">
        <label className="detail-form-row">
          <span>Notas (opcional)</span>
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Anadir una nota..."
          />
        </label>
      </section>

      <div className="transactions-detail-actions">
        <button className="primary-action" onClick={onApprove}>
          {row.status === "pending" ? "Registrar transaccion" : "Guardar cambios"}
        </button>
        <button className="secondary-action detail-secondary-button" onClick={onToggleEditing}>
          <Icon name="edit" />
          {isEditing ? "Cerrar edicion" : "Editar informacion"}
        </button>
        <button className="danger-action" onClick={onIgnore}>
          Ignorar
        </button>
      </div>
    </div>
  );
}

function matchesTransactionTab(row: TransactionRowData, tab: TransactionsTabId) {
  if (tab === "all") return true;
  return row.kind === tab;
}

function matchesTransactionChip(row: TransactionRowData, chip: TransactionChipId) {
  if (chip === "all") return true;
  if (chip === "gmail") return row.source === "gmail";
  return row.status === chip;
}
