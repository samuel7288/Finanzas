export function MerchantBadge({
  merchant,
  compact
}: {
  merchant: string;
  compact?: boolean;
}) {
  const label = getMerchantLabel(merchant);
  const className = `merchant-badge ${getMerchantTone(merchant)}${compact ? " compact" : ""}`;

  return <div className={className}>{label}</div>;
}

function getMerchantLabel(merchant: string) {
  const label = merchant.toLowerCase();

  if (label.includes("amazon")) return "a";
  if (label.includes("uber")) return "Ub";
  if (label.includes("netflix")) return "N";
  if (label.includes("starbucks")) return "S";
  if (label.includes("airbnb")) return "A";
  if (label.includes("walmart")) return "W";
  if (label.includes("spotify")) return "Sp";
  if (label.includes("apple")) return "A";
  if (label.includes("luz")) return "L";
  if (label.includes("salario")) return "$";
  return merchant.slice(0, 2).toUpperCase();
}

function getMerchantTone(merchant: string) {
  const label = merchant.toLowerCase();

  if (label.includes("amazon")) return " brand-amazon";
  if (label.includes("uber")) return " brand-uber";
  if (label.includes("netflix")) return " brand-netflix";
  if (label.includes("starbucks")) return " brand-starbucks";
  if (label.includes("airbnb")) return " brand-airbnb";
  if (label.includes("walmart")) return " brand-walmart";
  if (label.includes("spotify")) return " brand-spotify";
  if (label.includes("apple")) return " brand-apple";
  if (label.includes("salario")) return " brand-income";
  if (label.includes("farmacia")) return " brand-health";
  if (label.includes("luz")) return " brand-power";
  return " brand-default";
}
