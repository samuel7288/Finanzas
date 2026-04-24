import { ReactNode } from "react";
import { BrandLogo, Icon, IconName } from "../icons";
import { AppRouteId, AppShellModel, GmailStatus } from "../types";

interface AppLayoutProps {
  shell: AppShellModel;
  currentRoute: AppRouteId;
  gmailStatus: GmailStatus | null;
  syncing: boolean;
  onNavigate: (route: AppRouteId) => void;
  onConnectGmail: () => void;
  onSyncGmail: () => void;
  children: ReactNode;
}

export function AppLayout({
  shell,
  currentRoute,
  gmailStatus,
  syncing,
  onNavigate,
  onConnectGmail,
  onSyncGmail,
  children
}: AppLayoutProps) {
  return (
    <main className="dashboard-app">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <BrandLogo />
            <span>Finova</span>
          </div>

          <nav className="sidebar-nav" aria-label="Principal">
            {shell.navItems.map((item) => (
              <button
                key={item.id}
                className={item.id === currentRoute ? "nav-item active" : "nav-item"}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon as IconName} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <section className="sidebar-card">
            <p className="sidebar-card-label">Conectado</p>
            <div className="gmail-connection">
              <div className="gmail-badge">
                <Icon name="gmail" />
              </div>
              <div>
                <strong>{shell.connectedLabel}</strong>
                <p>{shell.connectedHelper}</p>
                <span className={`connection-state ${shell.connectionState}`}>
                  {shell.connectionState === "active"
                    ? "Activo"
                    : shell.connectionState === "ready"
                      ? "Listo"
                      : "Configurar"}
                </span>
              </div>
            </div>
            <button
              className="secondary-action"
              onClick={gmailStatus?.connected ? onSyncGmail : onConnectGmail}
            >
              <Icon name={gmailStatus?.connected ? "sync" : "gmail"} />
              {gmailStatus?.connected ? (syncing ? "Sincronizando" : "Sincronizar") : "Conectar"}
            </button>
          </section>

          <section className="sidebar-card premium-card">
            <div className="premium-head">
              <Icon name="crown" />
              <strong>Finova Premium</strong>
            </div>
            <p>Obten analisis avanzados y reportes detallados.</p>
            <button className="primary-action">Mejorar plan</button>
          </section>

          <div className="profile-card">
            <div className="profile-avatar">{getInitials(shell.profile.name)}</div>
            <div className="profile-copy">
              <strong>{shell.profile.name}</strong>
              <span>{shell.profile.email}</span>
            </div>
            <Icon name="arrowRight" />
          </div>
        </aside>

        <section className="dashboard-content">{children}</section>
      </div>
    </main>
  );
}

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "F";
  const second = parts[1]?.charAt(0) ?? "N";
  return `${first}${second}`.toUpperCase();
}
