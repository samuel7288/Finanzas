import { ReactNode } from "react";
import { Icon, IconName } from "../icons";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  dateRangeLabel: string;
  leadingIcon?: IconName;
  actions?: ReactNode;
  showNotifications?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  dateRangeLabel,
  leadingIcon,
  actions,
  showNotifications = true
}: PageHeaderProps) {
  return (
    <header className="dashboard-topbar">
      <div className="page-header-copy">
        <div className="page-header-title-row">
          {leadingIcon ? (
            <span className="page-title-icon">
              <Icon name={leadingIcon} />
            </span>
          ) : null}
          <h1>{title}</h1>
        </div>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button className="date-button">
          <span>{dateRangeLabel}</span>
          <Icon name="calendar" />
        </button>

        {actions}

        {showNotifications ? (
          <button className="icon-button" title="Alertas" aria-label="Alertas">
            <Icon name="bell" />
            <span className="notification-badge">3</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}
