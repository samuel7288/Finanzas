import { useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "../icons";
import {
  NotificationPreferenceData,
  ServiceConnectionData,
  SettingsPageModel,
  SettingsTabId,
  ThemeOptionData
} from "../types";
import { PageHeader } from "./PageHeader";

interface SettingsPageProps {
  model: SettingsPageModel;
  loading: boolean;
  onConnectGmail: () => void;
  onSyncGmail: () => void;
}

export function SettingsPage({
  model,
  loading,
  onConnectGmail,
  onSyncGmail
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");
  const [profileForm, setProfileForm] = useState(model.profile);
  const [preferencesForm, setPreferencesForm] = useState(model.preferences);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [notifications, setNotifications] = useState(model.notifications);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setProfileForm(model.profile);
    setPreferencesForm(model.preferences);
    setNotifications(model.notifications);
  }, [model]);

  const isDirty = useMemo(() => {
    return (
      JSON.stringify(profileForm) !== JSON.stringify(model.profile) ||
      JSON.stringify(preferencesForm) !== JSON.stringify(model.preferences)
    );
  }, [model.preferences, model.profile, preferencesForm, profileForm]);

  function saveProfile() {
    setSaveMessage("Cambios guardados en esta vista.");
    window.setTimeout(() => setSaveMessage(""), 2200);
  }

  return (
    <>
      <PageHeader
        title="Configuracion"
        subtitle="Administra tu cuenta, integra servicios y personaliza tu experiencia."
        dateRangeLabel={model.dateRangeLabel}
        showNotifications={false}
        actions={
          <button className="secondary-action header-inline-button">
            <Icon name="help" />
            Ayuda
          </button>
        }
      />

      <div className="settings-page-stack">
        <div className="gmail-tab-strip" role="tablist" aria-label="Secciones de configuracion">
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

        {saveMessage ? <div className="dashboard-alert settings-alert">{saveMessage}</div> : null}

        <div className="settings-page-grid">
          <div className="settings-main-column">
            {loading ? (
              <section className="surface page-placeholder">
                <p>Cargando configuracion...</p>
              </section>
            ) : (
              renderMainContent({
                activeTab,
                model,
                profileForm,
                preferencesForm,
                selectedTheme,
                notifications,
                isDirty,
                onSave: saveProfile,
                onProfileChange: (field, value) =>
                  setProfileForm((current) => ({ ...current, [field]: value })),
                onPreferenceChange: (field, value) =>
                  setPreferencesForm((current) => ({ ...current, [field]: value })),
                onThemeChange: setSelectedTheme,
                onNotificationToggle: (id) =>
                  setNotifications((current) =>
                    current.map((item) =>
                      item.id === id ? { ...item, enabled: !item.enabled } : item
                    )
                  ),
                onConnectGmail,
                onSyncGmail
              })
            )}
          </div>

          <aside className="settings-side-column">
            <section className="surface settings-side-card">
              <div className="section-heading compact">
                <div>
                  <h2>Cuentas vinculadas</h2>
                  <p className="section-helper">Gestiona tus cuentas bancarias y tarjetas.</p>
                </div>
                <button className="ghost-button settings-inline-button">
                  <Icon name="plus" />
                  Agregar cuenta
                </button>
              </div>

              <div className="settings-list">
                {model.linkedAccounts.map((account) => (
                  <article key={account.id} className="settings-list-row">
                    <div className={`settings-mini-badge ${account.tone}`}>
                      {account.institution.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="settings-list-copy">
                      <strong>{account.institution}</strong>
                      <span>{account.subtitle}</span>
                    </div>
                    <span className="status-pill success">{account.statusLabel}</span>
                    <button className="icon-button muted">
                      <Icon name="arrowRight" />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="surface settings-side-card">
              <div className="section-heading compact">
                <div>
                  <h2>Conexiones</h2>
                  <p className="section-helper">Servicios conectados con Finova.</p>
                </div>
              </div>

              <div className="settings-list">
                {model.services.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    onConnectGmail={onConnectGmail}
                    onSyncGmail={onSyncGmail}
                  />
                ))}
              </div>

              <button className="ghost-button settings-footer-link">
                <Icon name="plus" />
                Conectar otro servicio
              </button>
            </section>

            <section className="surface settings-side-card">
              <div className="section-heading compact">
                <div>
                  <h2>Notificaciones</h2>
                  <p className="section-helper">Elige como y cuando quieres recibir notificaciones.</p>
                </div>
              </div>

              <div className="settings-list">
                {notifications.map((item) => (
                  <NotificationRow
                    key={item.id}
                    item={item}
                    onToggle={() =>
                      setNotifications((current) =>
                        current.map((entry) =>
                          entry.id === item.id ? { ...entry, enabled: !entry.enabled } : entry
                        )
                      )
                    }
                  />
                ))}
              </div>

              <button className="ghost-button settings-footer-link">
                Ver todas las notificaciones
                <Icon name="arrowRight" />
              </button>
            </section>

            <section className="surface settings-side-card">
              <div className="section-heading compact">
                <div>
                  <h2>Seguridad</h2>
                  <p className="section-helper">Opciones para mantener tu cuenta segura.</p>
                </div>
              </div>

              <div className="settings-list">
                {model.securityItems.map((item) => (
                  <article key={item.id} className="settings-list-row simple">
                    <span className="settings-row-icon">
                      <Icon name={item.icon as IconName} />
                    </span>
                    <div className="settings-list-copy">
                      <strong>{item.title}</strong>
                      <span>{item.subtitle ?? "Ajusta esta opcion cuando lo necesites."}</span>
                    </div>
                    {item.statusLabel ? (
                      <span className={item.id === "sessions" ? "status-pill muted" : "status-pill success"}>
                        {item.statusLabel}
                      </span>
                    ) : null}
                    <button className="icon-button muted">
                      <Icon name="arrowRight" />
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function renderMainContent({
  activeTab,
  model,
  profileForm,
  preferencesForm,
  selectedTheme,
  notifications,
  isDirty,
  onSave,
  onProfileChange,
  onPreferenceChange,
  onThemeChange,
  onNotificationToggle,
  onConnectGmail,
  onSyncGmail
}: {
  activeTab: SettingsTabId;
  model: SettingsPageModel;
  profileForm: SettingsPageModel["profile"];
  preferencesForm: SettingsPageModel["preferences"];
  selectedTheme: string;
  notifications: NotificationPreferenceData[];
  isDirty: boolean;
  onSave: () => void;
  onProfileChange: (
    field: keyof SettingsPageModel["profile"],
    value: string
  ) => void;
  onPreferenceChange: (
    field: keyof SettingsPageModel["preferences"],
    value: string
  ) => void;
  onThemeChange: (value: string) => void;
  onNotificationToggle: (id: string) => void;
  onConnectGmail: () => void;
  onSyncGmail: () => void;
}) {
  if (activeTab === "accounts") {
    return (
      <section className="surface settings-main-card">
        <div className="section-heading compact">
          <div>
            <h2>Administrar cuentas</h2>
            <p className="section-helper">Revisa tus cuentas conectadas y define cuales usar por defecto.</p>
          </div>
          <button className="primary-action">
            <Icon name="plus" />
            Agregar cuenta
          </button>
        </div>
        <div className="settings-wide-list">
          {model.linkedAccounts.map((account) => (
            <article key={account.id} className="settings-wide-row">
              <div className={`settings-mini-badge ${account.tone}`}>
                {account.institution.slice(0, 2).toUpperCase()}
              </div>
              <div className="settings-wide-copy">
                <strong>{account.institution}</strong>
                <span>{account.subtitle}</span>
              </div>
              <button className="inline-filter">
                <span>Principal</span>
                <Icon name="chevronDown" />
              </button>
              <button className="ghost-button">Editar</button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "connections") {
    return (
      <section className="surface settings-main-card">
        <div className="section-heading compact">
          <div>
            <h2>Servicios conectados</h2>
            <p className="section-helper">Controla los accesos que Finova usa para leer y sincronizar datos.</p>
          </div>
        </div>
        <div className="settings-service-panel">
          {model.services.map((service) => (
            <ServicePanel
              key={service.id}
              service={service}
              onConnectGmail={onConnectGmail}
              onSyncGmail={onSyncGmail}
            />
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "notifications") {
    return (
      <section className="surface settings-main-card">
        <div className="section-heading compact">
          <div>
            <h2>Preferencias de notificacion</h2>
            <p className="section-helper">Activa solo las alertas que realmente te ayuden.</p>
          </div>
        </div>
        <div className="settings-wide-list">
          {notifications.map((item) => (
            <NotificationRow key={item.id} item={item} onToggle={() => onNotificationToggle(item.id)} />
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "security") {
    return (
      <section className="surface settings-main-card">
        <div className="section-heading compact">
          <div>
            <h2>Seguridad</h2>
            <p className="section-helper">Define como quieres proteger tu cuenta y tus sesiones.</p>
          </div>
        </div>
        <div className="settings-wide-list">
          {model.securityItems.map((item) => (
            <article key={item.id} className="settings-security-row">
              <span className="settings-row-icon">
                <Icon name={item.icon as IconName} />
              </span>
              <div className="settings-wide-copy">
                <strong>{item.title}</strong>
                <span>{item.subtitle ?? "Disponible en una siguiente iteracion."}</span>
              </div>
              {item.statusLabel ? (
                <span className={item.id === "sessions" ? "status-pill muted" : "status-pill success"}>
                  {item.statusLabel}
                </span>
              ) : null}
              <button className="ghost-button">Gestionar</button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "preferences") {
    return (
      <PreferencesCard
        model={model}
        preferencesForm={preferencesForm}
        selectedTheme={selectedTheme}
        onPreferenceChange={onPreferenceChange}
        onThemeChange={onThemeChange}
      />
    );
  }

  return (
    <>
      <section className="surface settings-main-card">
        <div className="section-heading compact">
          <h2>Informacion personal</h2>
        </div>

        <div className="settings-profile-grid">
          <div className="settings-avatar-column">
            <div className="settings-avatar-wrap">
              <UserAvatar name={profileForm.name} picture={profileForm.picture} />
              <button className="settings-avatar-button">
                <Icon name="camera" />
              </button>
            </div>
          </div>

          <label className="settings-field">
            <span>Nombre completo</span>
            <input
              value={profileForm.name}
              onChange={(event) => onProfileChange("name", event.target.value)}
            />
          </label>

          <label className="settings-field">
            <span>Correo electronico</span>
            <input
              value={profileForm.email}
              onChange={(event) => onProfileChange("email", event.target.value)}
            />
          </label>

          <label className="settings-field">
            <span>Telefono (opcional)</span>
            <input
              value={profileForm.phone}
              onChange={(event) => onProfileChange("phone", event.target.value)}
            />
          </label>

          <label className="settings-field">
            <span>Zona horaria</span>
            <div className="gmail-toolbar-select">
              <select
                value={profileForm.timezone}
                onChange={(event) => onProfileChange("timezone", event.target.value)}
              >
                {model.timezoneOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="chevronDown" />
            </div>
          </label>

          <label className="settings-field">
            <span>Moneda</span>
            <div className="gmail-toolbar-select">
              <select
                value={profileForm.currency}
                onChange={(event) => onProfileChange("currency", event.target.value)}
              >
                {model.currencyOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="chevronDown" />
            </div>
          </label>

          <label className="settings-field">
            <span>Idioma</span>
            <div className="gmail-toolbar-select">
              <select
                value={profileForm.language}
                onChange={(event) => onProfileChange("language", event.target.value)}
              >
                {model.languageOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="chevronDown" />
            </div>
          </label>
        </div>

        <div className="settings-main-actions">
          <button className="primary-action" onClick={onSave} disabled={!isDirty}>
            Guardar cambios
          </button>
        </div>
      </section>

      <PreferencesCard
        model={model}
        preferencesForm={preferencesForm}
        selectedTheme={selectedTheme}
        onPreferenceChange={onPreferenceChange}
        onThemeChange={onThemeChange}
      />
    </>
  );
}

function PreferencesCard({
  model,
  preferencesForm,
  selectedTheme,
  onPreferenceChange,
  onThemeChange
}: {
  model: SettingsPageModel;
  preferencesForm: SettingsPageModel["preferences"];
  selectedTheme: string;
  onPreferenceChange: (
    field: keyof SettingsPageModel["preferences"],
    value: string
  ) => void;
  onThemeChange: (value: string) => void;
}) {
  return (
    <section className="surface settings-main-card">
      <div className="section-heading compact">
        <h2>Preferencias de la aplicacion</h2>
      </div>

      <div className="settings-preferences-grid">
        <PreferenceBox
          title="Moneda predeterminada"
          description="Selecciona la moneda que se usara por defecto en la aplicacion."
          value={preferencesForm.defaultCurrency}
          options={model.defaultCurrencyOptions}
          onChange={(value) => onPreferenceChange("defaultCurrency", value)}
        />
        <PreferenceBox
          title="Formato de fecha"
          description="Elige el formato de fecha que prefieras."
          value={preferencesForm.dateFormat}
          options={model.dateFormatOptions}
          onChange={(value) => onPreferenceChange("dateFormat", value)}
        />
        <PreferenceBox
          title="Formato de hora"
          description="Elige el formato de hora que prefieras."
          value={preferencesForm.timeFormat}
          options={model.timeFormatOptions}
          onChange={(value) => onPreferenceChange("timeFormat", value)}
        />
      </div>

      <div className="settings-theme-section">
        <div>
          <h3>Tema de la aplicacion</h3>
          <p>Personaliza la apariencia de Finova como mas te guste.</p>
        </div>

        <div className="settings-theme-grid">
          {model.themeOptions.map((option) => (
            <button
              key={option.id}
              className={option.id === selectedTheme ? "theme-card active" : "theme-card"}
              onClick={() => onThemeChange(option.id)}
            >
              <ThemePreview tone={option.id as ThemeOptionData["id"]} />
              <div className="theme-card-footer">
                <span className={option.id === selectedTheme ? "theme-radio active" : "theme-radio"}></span>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreferenceBox({
  title,
  description,
  value,
  options,
  onChange
}: {
  title: string;
  description: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <article className="settings-preference-card">
      <strong>{title}</strong>
      <p>{description}</p>
      <div className="gmail-toolbar-select">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <Icon name="chevronDown" />
      </div>
    </article>
  );
}

function ThemePreview({ tone }: { tone: string }) {
  return (
    <div className={`theme-preview theme-${tone}`}>
      <div className="theme-preview-sidebar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="theme-preview-main">
        <div className="theme-preview-row large"></div>
        <div className="theme-preview-row"></div>
        <div className="theme-preview-chart">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

function UserAvatar({ name, picture }: { name: string; picture?: string }) {
  if (picture) {
    return <img className="settings-avatar" src={picture} alt={name} />;
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return <div className="settings-avatar fallback">{initials || "FA"}</div>;
}

function ServiceRow({
  service,
  onConnectGmail,
  onSyncGmail
}: {
  service: ServiceConnectionData;
  onConnectGmail: () => void;
  onSyncGmail: () => void;
}) {
  return (
    <article className="settings-list-row">
      <div className="settings-mini-badge tone-red">G</div>
      <div className="settings-list-copy">
        <strong>{service.name}</strong>
        <span>{service.email}</span>
      </div>
      <button
        className={service.connected ? "status-pill success interactive" : "status-pill warning interactive"}
        onClick={service.connected ? onSyncGmail : onConnectGmail}
      >
        {service.connected ? "Conectado" : "Conectar"}
      </button>
      <button className="icon-button muted">
        <Icon name="menu" />
      </button>
    </article>
  );
}

function ServicePanel({
  service,
  onConnectGmail,
  onSyncGmail
}: {
  service: ServiceConnectionData;
  onConnectGmail: () => void;
  onSyncGmail: () => void;
}) {
  return (
    <article className="settings-service-card">
      <div className="settings-service-head">
        <div className="settings-mini-badge tone-red">G</div>
        <div>
          <strong>{service.name}</strong>
          <p>{service.email}</p>
        </div>
      </div>
      <p className="settings-service-copy">
        {service.connected
          ? "Tu cuenta esta lista para sincronizar compras detectadas."
          : "Conecta Gmail para empezar a importar movimientos automaticamente."}
      </p>
      <div className="settings-service-actions">
        <button className="secondary-action" onClick={service.connected ? onSyncGmail : onConnectGmail}>
          <Icon name={service.connected ? "sync" : "gmail"} />
          {service.connected ? "Sincronizar ahora" : "Conectar Gmail"}
        </button>
        <button className="ghost-button">Administrar permisos</button>
      </div>
    </article>
  );
}

function NotificationRow({
  item,
  onToggle
}: {
  item: NotificationPreferenceData;
  onToggle: () => void;
}) {
  return (
    <article className="settings-list-row simple notification">
      <span className="settings-row-icon">
        <Icon name={item.icon as IconName} />
      </span>
      <div className="settings-list-copy">
        <strong>{item.title}</strong>
        <span>{item.description}</span>
      </div>
      <button
        className={item.enabled ? "toggle-switch active" : "toggle-switch"}
        onClick={onToggle}
        aria-pressed={item.enabled}
      >
        <span></span>
      </button>
    </article>
  );
}
