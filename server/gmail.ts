import crypto from "node:crypto";
import { google, gmail_v1 } from "googleapis";
import { parsePurchaseEmail } from "./parser.js";
import { GoogleProfile, readData, Transaction, updateData } from "./storage.js";

const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
const GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
  GMAIL_SCOPE
];

export interface GmailStatus {
  configured: boolean;
  connected: boolean;
  email?: string;
  name?: string;
  picture?: string;
  lastSyncAt?: string;
  dataFile: string;
}

export interface SyncResult {
  scanned: number;
  imported: number;
  skipped: number;
  lastSyncAt: string;
}

export function hasGmailConfig(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REDIRECT_URI
  );
}

export async function getGmailStatus(dataFile: string): Promise<GmailStatus> {
  const data = await readData();

  return {
    configured: hasGmailConfig(),
    connected: Boolean(data.gmailTokens && data.googleProfile),
    email: data.googleProfile?.email,
    name: data.googleProfile?.name,
    picture: data.googleProfile?.picture,
    lastSyncAt: data.lastSyncAt,
    dataFile
  };
}

export function getGmailAuthUrl(): string {
  const client = createOAuthClient();

  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_SCOPES
  });
}

export async function saveGmailCode(code: string): Promise<void> {
  const client = createOAuthClient();
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  const profile = await getGoogleProfile(client);

  await updateData((data) => {
    data.gmailTokens = tokens as Record<string, unknown>;
    data.googleProfile = profile;
  });
}

export async function syncGmailPurchases(): Promise<SyncResult> {
  const data = await readData();

  if (!data.gmailTokens) {
    throw new Error("Gmail no esta conectado.");
  }

  const client = createOAuthClient();
  client.setCredentials(data.gmailTokens);
  client.on("tokens", (tokens) => {
    void updateData((current) => {
      current.gmailTokens = {
        ...(current.gmailTokens ?? {}),
        ...tokens
      };
    });
  });

  const gmail = google.gmail({ version: "v1", auth: client });
  const query =
    process.env.GMAIL_SEARCH_QUERY?.trim() ||
    "newer_than:45d (compra OR purchase OR cargo OR consumo OR transaccion OR pago OR tarjeta OR card)";
  const maxResults = Number(process.env.GMAIL_MAX_RESULTS ?? 25);
  const list = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: query
  });

  const messages = list.data.messages ?? [];
  let imported = 0;
  let skipped = 0;

  for (const item of messages) {
    if (!item.id) continue;

    const exists = data.transactions.some((transaction) => transaction.sourceMessageId === item.id);
    if (exists) {
      skipped += 1;
      continue;
    }

    const message = await gmail.users.messages.get({
      userId: "me",
      id: item.id,
      format: "full"
    });
    const email = normalizeMessage(message.data);
    const parsed = parsePurchaseEmail(email);

    if (!parsed) {
      skipped += 1;
      continue;
    }

    const now = new Date().toISOString();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      source: "gmail",
      sourceMessageId: item.id,
      emailSubject: email.subject,
      emailFrom: email.from,
      amount: parsed.amount,
      currency: parsed.currency,
      merchant: parsed.merchant,
      purchasedAt: parsed.purchasedAt,
      category: parsed.category,
      status: "pending",
      confidence: parsed.confidence,
      rawText: `${email.subject}\n${email.snippet ?? ""}\n${email.body}`.slice(0, 2500),
      createdAt: now,
      updatedAt: now
    };

    data.transactions.push(transaction);
    imported += 1;
  }

  const finishedAt = new Date().toISOString();
  data.lastSyncAt = finishedAt;
  data.syncLog.unshift({
    id: crypto.randomUUID(),
    provider: "gmail",
    startedAt: finishedAt,
    finishedAt,
    scanned: messages.length,
    imported,
    skipped
  });
  data.syncLog = data.syncLog.slice(0, 20);

  await updateData((current) => {
    current.gmailTokens = data.gmailTokens;
    current.transactions = data.transactions;
    current.syncLog = data.syncLog;
    current.lastSyncAt = data.lastSyncAt;
  });

  return {
    scanned: messages.length,
    imported,
    skipped,
    lastSyncAt: finishedAt
  };
}

function createOAuthClient() {
  if (!hasGmailConfig()) {
    throw new Error("Faltan GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET o GOOGLE_REDIRECT_URI.");
  }

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

async function getGoogleProfile(
  client: InstanceType<typeof google.auth.OAuth2>
): Promise<GoogleProfile> {
  const oauth2 = google.oauth2({ version: "v2", auth: client });
  const gmail = google.gmail({ version: "v1", auth: client });
  const [userInfo, gmailProfile] = await Promise.all([
    oauth2.userinfo.get(),
    gmail.users.getProfile({ userId: "me" })
  ]);

  const email =
    userInfo.data.email ??
    gmailProfile.data.emailAddress ??
    "";

  const name =
    userInfo.data.name ??
    deriveNameFromEmail(email);

  return {
    provider: "google",
    email,
    name,
    picture: userInfo.data.picture ?? undefined,
    connectedAt: new Date().toISOString()
  };
}

function normalizeMessage(message: gmail_v1.Schema$Message) {
  const headers = message.payload?.headers ?? [];
  const subject = getHeader(headers, "subject");
  const from = getHeader(headers, "from");
  const date = getHeader(headers, "date");
  const body = extractBody(message.payload);

  return {
    subject,
    from,
    date,
    internalDate: message.internalDate ?? undefined,
    body,
    snippet: message.snippet ?? undefined
  };
}

function getHeader(headers: gmail_v1.Schema$MessagePartHeader[], name: string): string {
  return headers.find((header) => header.name?.toLowerCase() === name)?.value ?? "";
}

function extractBody(part?: gmail_v1.Schema$MessagePart): string {
  if (!part) return "";

  const current = decodeBody(part.body?.data ?? "");
  const children = part.parts?.map((child) => extractBody(child)).join("\n") ?? "";
  const text = `${current}\n${children}`;

  return stripHtml(text).replace(/\s+/g, " ").trim();
}

function decodeBody(value: string): string {
  if (!value) return "";

  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function deriveNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "Usuario";

  return localPart
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}
