export interface ParsedPurchase {
  amount: number;
  currency: string;
  merchant: string;
  purchasedAt: string;
  category: string;
  confidence: number;
}

export interface EmailForParsing {
  subject: string;
  from: string;
  date?: string;
  internalDate?: string;
  body: string;
  snippet?: string;
}

const categoryRules: Array<{ category: string; pattern: RegExp }> = [
  { category: "Supermercado", pattern: /super|market|mercado|walmart|pricesmart|selectos|despensa/i },
  { category: "Restaurante", pattern: /restaurant|restaurante|cafe|coffee|pizza|burger|kfc|mcdonald|wendy/i },
  { category: "Transporte", pattern: /uber|lyft|gas|shell|texaco|puma|esso|parking|parqueo/i },
  { category: "Servicios", pattern: /claro|tigo|energia|electric|water|internet|netflix|spotify|apple/i },
  { category: "Salud", pattern: /farmacia|pharmacy|hospital|clinic|medic/i },
  { category: "Compras", pattern: /amazon|ebay|store|tienda|mall|shop/i }
];

const purchaseWords = /(compra|purchase|cargo|charge|consumo|transacci[oó]n|pago|paid|tarjeta|card|aprobad[ao]|autorizad[ao])/i;

const amountPatterns = [
  /(?:monto|amount|valor|total|compra|purchase|cargo|charge|consumo|pago)[^\d$LQ₡]{0,35}(USD|US\$|\$|L|Q|₡)?\s*([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})|[0-9]+(?:[.,][0-9]{2})?)/i,
  /(USD|US\$|\$|L|Q|₡)\s*([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})|[0-9]+(?:[.,][0-9]{2})?)/i
];

const merchantPatterns = [
  /(?:comercio|establecimiento|merchant|tienda|store)\s*[:\-]\s*([A-Z0-9][A-Z0-9 .,&'/-]{2,70})/i,
  /(?:en|at)\s+([A-Z0-9][A-Z0-9 .,&'/-]{2,70})(?:\s+(?:por|for|el|on|con|with)|[.,;]|$)/i
];

export function parsePurchaseEmail(email: EmailForParsing): ParsedPurchase | null {
  const text = normalizeText(`${email.subject}\n${email.snippet ?? ""}\n${email.body}`);
  const amountResult = findAmount(text);

  if (!amountResult || !purchaseWords.test(text)) {
    return null;
  }

  const merchant = findMerchant(text, email.from);
  const purchasedAt = parseDate(email.date, email.internalDate);
  const category = guessCategory(merchant, text);

  let confidence = 0.55;
  if (merchant !== "Comercio sin identificar") confidence += 0.18;
  if (email.date || email.internalDate) confidence += 0.1;
  if (/(aprobad[ao]|autorizad[ao]|confirmad[ao]|successful|approved)/i.test(text)) confidence += 0.1;
  if (/tarjeta|card|visa|mastercard|amex/i.test(text)) confidence += 0.07;

  return {
    amount: amountResult.amount,
    currency: amountResult.currency,
    merchant,
    purchasedAt,
    category,
    confidence: Math.min(Number(confidence.toFixed(2)), 0.98)
  };
}

function findAmount(text: string): { amount: number; currency: string } | null {
  for (const pattern of amountPatterns) {
    const match = text.match(pattern);

    if (!match) continue;

    const currencyToken = (match[1] ?? "$").toUpperCase();
    const rawAmount = match[2];
    const amount = parseNumber(rawAmount);

    if (Number.isFinite(amount) && amount > 0) {
      return {
        amount,
        currency: normalizeCurrency(currencyToken)
      };
    }
  }

  return null;
}

function parseNumber(value: string): number {
  const clean = value.replace(/\s/g, "");
  const lastDot = clean.lastIndexOf(".");
  const lastComma = clean.lastIndexOf(",");
  const decimalSeparator = lastDot > lastComma ? "." : ",";

  if (lastDot === -1 && lastComma === -1) {
    return Number(clean);
  }

  const decimalIndex = Math.max(lastDot, lastComma);
  const decimals = clean.slice(decimalIndex + 1);

  if (decimals.length !== 2) {
    return Number(clean.replace(/[.,]/g, ""));
  }

  const integerPart = clean.slice(0, decimalIndex).replace(/[.,]/g, "");
  return Number(`${integerPart}.${clean.slice(decimalIndex + 1)}`);
}

function normalizeCurrency(token: string): string {
  if (token === "L") return "HNL";
  if (token === "Q") return "GTQ";
  if (token === "₡") return "CRC";
  return "USD";
}

function findMerchant(text: string, from: string): string {
  for (const pattern of merchantPatterns) {
    const match = text.match(pattern);
    const candidate = cleanMerchant(match?.[1] ?? "");

    if (candidate) return candidate;
  }

  const senderName = from.split("<")[0]?.trim().replace(/^"|"$/g, "");
  return senderName || "Comercio sin identificar";
}

function cleanMerchant(value: string): string {
  const merchant = value
    .replace(/\s+/g, " ")
    .replace(/\b(?:por|for|el|on|con|with|monto|amount|valor|total)\b.*$/i, "")
    .replace(/[.,;:]+$/g, "")
    .trim();

  if (merchant.length < 3) return "";
  return merchant.slice(0, 80);
}

function parseDate(headerDate?: string, internalDate?: string): string {
  if (headerDate) {
    const parsed = new Date(headerDate);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  if (internalDate) {
    const parsed = new Date(Number(internalDate));
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  return new Date().toISOString();
}

function guessCategory(merchant: string, text: string): string {
  const scope = `${merchant}\n${text}`;
  return categoryRules.find((rule) => rule.pattern.test(scope))?.category ?? "Sin categoria";
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
