import { SVGProps } from "react";

export const iconPaths = {
  home: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z",
  transactions: "M7 7h11 M7 17h11 M14 4l4 3-4 3 M10 14l-4 3 4 3",
  budgets: "M6 4h9l3 3v13H6z M15 4v4h4 M9 12h6 M9 16h6",
  goals: "M12 3v18 M3 12h18 M6 6l12 12 M18 6 6 18",
  reports: "M6 19V9 M12 19V5 M18 19v-7",
  accounts: "M3 7h18v10H3z M3 11h18 M7 15h3",
  investments: "M4 18h16 M6 15l4-4 3 3 5-6",
  alerts: "M12 4a4 4 0 0 0-4 4v2.5L6 14v1h12v-1l-2-3.5V8a4 4 0 0 0-4-4z M10 18a2 2 0 0 0 4 0",
  settings: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z M4 12h2.2 M17.8 12H20 M12 4v2.2 M12 17.8V20 M6.2 6.2l1.5 1.5 M16.3 16.3l1.5 1.5 M17.8 6.2l-1.5 1.5 M7.7 16.3l-1.5 1.5",
  gmail: "M4 7.5 12 13l8-5.5V18H4z M4 8l8 5.5L20 8",
  crown: "M4 18h16l-1.5-8-4.5 3-2-5-2 5-4.5-3z",
  arrowRight: "M5 12h14 M13 6l6 6-6 6",
  calendar: "M7 3v3 M17 3v3 M4 9h16 M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  bell: "M12 4a4 4 0 0 0-4 4v2.8L6.2 14V15h11.6v-1l-1.8-3.2V8a4 4 0 0 0-4-4z M10 18a2 2 0 0 0 4 0",
  menu: "M5 12h.01 M12 12h.01 M19 12h.01 M12 5h.01 M12 19h.01",
  summary: "M4 6h16v12H4z M7 10h5 M7 14h10",
  income: "M12 19V5 M6 11l6-6 6 6",
  expense: "M12 5v14 M18 13l-6 6-6-6",
  savings: "M4 15c1.5-2.5 3.5-4 6-4s4.5 1.5 6 4 M12 5v10",
  sync: "M17 2v5h-5 M7 22v-5h5 M19 11a7 7 0 0 0-12-4l-2 2 M5 13a7 7 0 0 0 12 4l2-2",
  chevronDown: "M6 9l6 6 6-6",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-3.5-3.5",
  filter: "M4 6h16 M7 12h10 M10 18h4",
  close: "M6 6l12 12 M18 6L6 18",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  eyeOff: "M3 3l18 18 M10.6 10.6a3 3 0 0 0 4.2 4.2 M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17.4 17.4 0 0 1-3.3 4.4 M6.6 6.7C3.6 8.4 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.3 4-.8"
} as const;

export type IconName = keyof typeof iconPaths;

export function Icon({
  name,
  className,
  ...rest
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      {...rest}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

export function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <span></span>
      <span></span>
    </span>
  );
}
