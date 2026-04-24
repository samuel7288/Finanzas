import { AppRouteId } from "../types";
import { PageHeader } from "./PageHeader";

export function PlaceholderPage({ route }: { route: AppRouteId }) {
  return (
    <>
      <PageHeader
        title={getRouteLabel(route)}
        subtitle="Esta pantalla la vamos a construir en la siguiente etapa del flujo."
        dateRangeLabel="1 - 31 Mayo 2024"
      />

      <section className="surface page-placeholder">
        <h2>{getRouteLabel(route)}</h2>
        <p>
          Ya dejamos la navegacion preparada para que esta vista se conecte sin
          romper el resto de la app.
        </p>
      </section>
    </>
  );
}

function getRouteLabel(route: AppRouteId) {
  const labels: Record<AppRouteId, string> = {
    summary: "Resumen",
    gmail: "Compras Gmail",
    transactions: "Transacciones",
    budgets: "Presupuestos",
    goals: "Metas",
    reports: "Reportes",
    accounts: "Cuentas",
    investments: "Inversiones",
    alerts: "Alertas",
    settings: "Configuracion"
  };

  return labels[route];
}
