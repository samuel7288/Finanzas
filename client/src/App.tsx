import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { GmailPage } from "./components/GmailPage";
import { LoginScreen } from "./components/LoginScreen";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { SummaryPage } from "./components/SummaryPage";
import { TransactionsPage } from "./components/TransactionsPage";
import {
  buildAppShellModel,
  buildGmailPageModel,
  buildSummaryModel,
  buildTransactionsPageModel,
  createPreviewTransactions
} from "./dashboardData";
import { AppRouteId, GmailStatus, Transaction } from "./types";

const demoSessionKey = "finova-demo-session";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<AppRouteId>("summary");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [previewTransactions, setPreviewTransactions] = useState<Transaction[]>(
    () => createPreviewTransactions()
  );
  const [gmailStatus, setGmailStatus] = useState<GmailStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void bootstrap();
  }, []);

  const usePreviewMode = !loading && transactions.length === 0 && !gmailStatus?.connected;
  const displayTransactions = usePreviewMode ? previewTransactions : transactions;
  const shellModel = useMemo(
    () => buildAppShellModel(gmailStatus, currentRoute, usePreviewMode),
    [currentRoute, gmailStatus, usePreviewMode]
  );
  const summaryModel = useMemo(
    () => buildSummaryModel(displayTransactions, gmailStatus),
    [displayTransactions, gmailStatus]
  );
  const gmailPageModel = useMemo(
    () => buildGmailPageModel(displayTransactions),
    [displayTransactions]
  );
  const transactionsPageModel = useMemo(
    () => buildTransactionsPageModel(displayTransactions),
    [displayTransactions]
  );

  async function loadDashboard() {
    setError("");

    try {
      const [statusResponse, transactionsResponse] = await Promise.all([
        fetch("/api/gmail/status"),
        fetch("/api/transactions")
      ]);

      const statusPayload = await statusResponse.json();
      const transactionsPayload = await transactionsResponse.json();

      setGmailStatus(statusPayload);
      setIsAuthenticated(Boolean(statusPayload.connected));
      setTransactions(transactionsPayload.transactions ?? []);
    } catch {
      setError("No se pudo cargar el resumen.");
    }
  }

  async function bootstrap() {
    setLoading(true);

    try {
      const statusResponse = await fetch("/api/gmail/status");
      const statusPayload = await statusResponse.json();
      const demoSession = localStorage.getItem(demoSessionKey) === "active";

      setGmailStatus(statusPayload);
      setIsAuthenticated(Boolean(statusPayload.connected || demoSession));

      const search = new URLSearchParams(window.location.search);
      const gmailParam = search.get("gmail");
      const message = search.get("message");

      if (gmailParam === "error") {
        setError(message ?? "No se pudo conectar tu cuenta de Google.");
      }

      if (statusPayload.connected) {
        const transactionsResponse = await fetch("/api/transactions");
        const transactionsPayload = await transactionsResponse.json();
        setTransactions(transactionsPayload.transactions ?? []);
      }

      if (gmailParam) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch {
      setError("No se pudo iniciar la aplicacion.");
    } finally {
      setAuthResolved(true);
      setLoading(false);
    }
  }

  async function connectGmail() {
    setError("");

    try {
      const response = await fetch("/api/gmail/auth-url");
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo abrir Gmail.");
      }

      window.location.href = payload.url;
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "No se pudo abrir Gmail."
      );
    }
  }

  function enterDemoMode() {
    localStorage.setItem(demoSessionKey, "active");
    setIsAuthenticated(true);
    setError("");
    setCurrentRoute("summary");
  }

  async function syncGmail() {
    setSyncing(true);
    setError("");

    try {
      const response = await fetch("/api/gmail/sync", { method: "POST" });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo sincronizar Gmail.");
      }

      await loadDashboard();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo sincronizar Gmail."
      );
    } finally {
      setSyncing(false);
    }
  }

  async function updateTransaction(
    id: string,
    updates: Partial<Pick<Transaction, "status" | "category">>
  ) {
    if (id.startsWith("preview-")) {
      setPreviewTransactions((current) =>
        current.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                ...updates,
                updatedAt: new Date().toISOString()
              }
            : transaction
        )
      );
      return;
    }

    const response = await fetch(`/api/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      setError("No se pudo actualizar la transaccion.");
      return;
    }

    const payload = await response.json();
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id ? payload.transaction : transaction
      )
    );
  }

  async function handleApproveDetected(id: string) {
    await updateTransaction(id, { status: "approved" });
  }

  async function handleIgnoreDetected(id: string) {
    await updateTransaction(id, { status: "ignored" });
  }

  async function handleCategoryChange(id: string, category: string) {
    await updateTransaction(id, { category });
  }

  async function handleApproveMany(ids: string[]) {
    for (const id of ids) {
      await updateTransaction(id, { status: "approved" });
    }
  }

  if (!authResolved) {
    return (
      <main className="login-page">
        <section className="login-card loading-card">Cargando...</section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={connectGmail}
        onEnterDemo={enterDemoMode}
        googleConfigured={Boolean(gmailStatus?.configured)}
        error={error}
      />
    );
  }

  return (
    <AppLayout
      shell={shellModel}
      currentRoute={currentRoute}
      gmailStatus={gmailStatus}
      syncing={syncing}
      onNavigate={setCurrentRoute}
      onConnectGmail={connectGmail}
      onSyncGmail={syncGmail}
    >
      {error ? <div className="dashboard-alert">{error}</div> : null}
      {currentRoute === "summary" ? (
        <SummaryPage
          model={summaryModel}
          loading={loading}
          onSyncGmail={syncGmail}
          onApproveDetected={handleApproveDetected}
          onIgnoreDetected={handleIgnoreDetected}
          onCategoryChange={handleCategoryChange}
          onOpenGmailPage={() => setCurrentRoute("gmail")}
        />
      ) : currentRoute === "gmail" ? (
        <GmailPage
          model={gmailPageModel}
          loading={loading}
          onApprove={handleApproveDetected}
          onIgnore={handleIgnoreDetected}
          onApproveMany={handleApproveMany}
          onCategoryChange={handleCategoryChange}
        />
      ) : currentRoute === "transactions" ? (
        <TransactionsPage
          model={transactionsPageModel}
          loading={loading}
          onApprove={handleApproveDetected}
          onIgnore={handleIgnoreDetected}
          onCategoryChange={handleCategoryChange}
        />
      ) : (
        <PlaceholderPage route={currentRoute} />
      )}
    </AppLayout>
  );
}

export default App;
