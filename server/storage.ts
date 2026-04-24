import { Prisma, SyncProvider, TransactionSource as PrismaTransactionSource, TransactionStatus as PrismaTransactionStatus } from "@prisma/client";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDatabaseLabel, getPrismaClient, hasDatabaseConfig } from "./database.js";

export type TransactionStatus = "pending" | "approved" | "ignored";
export type TransactionSource = "gmail" | "manual";

export interface Transaction {
  id: string;
  source: TransactionSource;
  sourceMessageId?: string;
  emailSubject?: string;
  emailFrom?: string;
  amount: number;
  currency: string;
  merchant: string;
  purchasedAt: string;
  category: string;
  status: TransactionStatus;
  confidence: number;
  rawText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SyncLogEntry {
  id: string;
  provider: "gmail";
  startedAt: string;
  finishedAt: string;
  scanned: number;
  imported: number;
  skipped: number;
}

export interface GoogleProfile {
  provider: "google";
  email: string;
  name: string;
  picture?: string;
  connectedAt: string;
}

export interface AppData {
  gmailTokens?: Record<string, unknown>;
  googleProfile?: GoogleProfile;
  transactions: Transaction[];
  syncLog: SyncLogEntry[];
  lastSyncAt?: string;
  updatedAt?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dataPath = path.join(dataDir, "app-data.json");
const defaultLocalEmail = process.env.APP_DEFAULT_EMAIL?.trim() || "local@finova.app";

const defaultData = (): AppData => ({
  transactions: [],
  syncLog: []
});

let writeQueue = Promise.resolve();

export async function readData(): Promise<AppData> {
  if (hasDatabaseConfig()) {
    return readDataFromDatabase();
  }

  return readDataFromFile();
}

export async function writeData(data: AppData): Promise<void> {
  if (hasDatabaseConfig()) {
    await writeDataToDatabase(data);
    return;
  }

  await writeDataToFile(data);
}

export async function updateData<T>(mutator: (data: AppData) => T | Promise<T>): Promise<T> {
  const data = await readData();
  const result = await mutator(data);
  await writeData(data);
  return result;
}

export function getDataPath(): string {
  return hasDatabaseConfig() ? getDatabaseLabel() : dataPath;
}

async function readDataFromFile(): Promise<AppData> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw) as AppData;

    return {
      ...defaultData(),
      ...parsed,
      transactions: parsed.transactions ?? [],
      syncLog: parsed.syncLog ?? []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultData();
    }

    throw error;
  }
}

async function writeDataToFile(data: AppData): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  const tmpPath = `${dataPath}.tmp`;
  const payload = JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2);

  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(tmpPath, `${payload}\n`, "utf8");
    await fs.rename(tmpPath, dataPath);
  });

  await writeQueue;
}

async function readDataFromDatabase(): Promise<AppData> {
  const prisma = getPrismaClient();
  const connection = await prisma.googleConnection.findFirst({
    orderBy: { connectedAt: "desc" },
    include: {
      user: {
        include: {
          transactions: {
            orderBy: { purchasedAt: "desc" }
          },
          syncLogs: {
            orderBy: { startedAt: "desc" }
          }
        }
      }
    }
  });

  if (connection) {
    return {
      gmailTokens: toUnknownRecord(connection.tokens),
      googleProfile: {
        provider: "google",
        email: connection.email,
        name: connection.name,
        picture: connection.picture ?? undefined,
        connectedAt: connection.connectedAt.toISOString()
      },
      transactions: connection.user.transactions.map(mapTransactionRecord),
      syncLog: connection.user.syncLogs.map(mapSyncLogRecord),
      lastSyncAt: connection.lastSyncAt?.toISOString(),
      updatedAt: connection.user.updatedAt.toISOString()
    };
  }

  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: "desc" },
    include: {
      googleConnection: true,
      transactions: {
        orderBy: { purchasedAt: "desc" }
      },
      syncLogs: {
        orderBy: { startedAt: "desc" }
      }
    }
  });

  if (!user) {
    return defaultData();
  }

  return {
    gmailTokens: user.googleConnection?.tokens ? toUnknownRecord(user.googleConnection.tokens) : undefined,
    googleProfile: user.googleConnection
      ? {
          provider: "google",
          email: user.googleConnection.email,
          name: user.googleConnection.name,
          picture: user.googleConnection.picture ?? undefined,
          connectedAt: user.googleConnection.connectedAt.toISOString()
        }
      : undefined,
    transactions: user.transactions.map(mapTransactionRecord),
    syncLog: user.syncLogs.map(mapSyncLogRecord),
    lastSyncAt: user.googleConnection?.lastSyncAt?.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };
}

async function writeDataToDatabase(data: AppData): Promise<void> {
  const prisma = getPrismaClient();

  await prisma.$transaction(async (tx) => {
    const user = await resolveOrCreatePrimaryUser(tx, data);

    await tx.transaction.deleteMany({ where: { userId: user.id } });
    if (data.transactions.length > 0) {
      await tx.transaction.createMany({
        data: data.transactions.map((transaction) => ({
          id: transaction.id,
          userId: user.id,
          source: transaction.source as PrismaTransactionSource,
          sourceMessageId: transaction.sourceMessageId,
          emailSubject: transaction.emailSubject,
          emailFrom: transaction.emailFrom,
          amount: toDecimal(transaction.amount),
          currency: transaction.currency,
          merchant: transaction.merchant,
          purchasedAt: new Date(transaction.purchasedAt),
          category: transaction.category,
          status: transaction.status as PrismaTransactionStatus,
          confidence: transaction.confidence,
          rawText: transaction.rawText,
          createdAt: new Date(transaction.createdAt),
          updatedAt: new Date(transaction.updatedAt)
        }))
      });
    }

    await tx.syncLog.deleteMany({ where: { userId: user.id } });
    if (data.syncLog.length > 0) {
      await tx.syncLog.createMany({
        data: data.syncLog.map((entry) => ({
          id: entry.id,
          userId: user.id,
          provider: entry.provider as SyncProvider,
          startedAt: new Date(entry.startedAt),
          finishedAt: new Date(entry.finishedAt),
          scanned: entry.scanned,
          imported: entry.imported,
          skipped: entry.skipped
        }))
      });
    }

    if (data.googleProfile || data.gmailTokens) {
      await tx.googleConnection.upsert({
        where: { userId: user.id },
        update: {
          email: data.googleProfile?.email ?? user.email,
          name: data.googleProfile?.name ?? user.name,
          picture: data.googleProfile?.picture ?? user.picture,
          tokens: toJsonValue(data.gmailTokens ?? {}),
          connectedAt: data.googleProfile?.connectedAt
            ? new Date(data.googleProfile.connectedAt)
            : new Date(),
          lastSyncAt: data.lastSyncAt ? new Date(data.lastSyncAt) : null
        },
        create: {
          userId: user.id,
          email: data.googleProfile?.email ?? user.email,
          name: data.googleProfile?.name ?? user.name,
          picture: data.googleProfile?.picture,
          tokens: toJsonValue(data.gmailTokens ?? {}),
          connectedAt: data.googleProfile?.connectedAt
            ? new Date(data.googleProfile.connectedAt)
            : new Date(),
          lastSyncAt: data.lastSyncAt ? new Date(data.lastSyncAt) : null
        }
      });
    }
  });
}

async function resolveOrCreatePrimaryUser(
  tx: Prisma.TransactionClient,
  data: AppData
) {
  if (data.googleProfile) {
    return tx.user.upsert({
      where: { email: data.googleProfile.email },
      update: {
        name: data.googleProfile.name,
        picture: data.googleProfile.picture ?? undefined
      },
      create: {
        email: data.googleProfile.email,
        name: data.googleProfile.name,
        picture: data.googleProfile.picture ?? undefined
      }
    });
  }

  const existing = await tx.user.findFirst({
    orderBy: { updatedAt: "desc" }
  });

  if (existing) {
    return existing;
  }

  return tx.user.create({
    data: {
      email: defaultLocalEmail,
      name: "Usuario Finova"
    }
  });
}

function mapTransactionRecord(record: {
  id: string;
  source: PrismaTransactionSource;
  sourceMessageId: string | null;
  emailSubject: string | null;
  emailFrom: string | null;
  amount: Prisma.Decimal;
  currency: string;
  merchant: string;
  purchasedAt: Date;
  category: string;
  status: PrismaTransactionStatus;
  confidence: number;
  rawText: string | null;
  createdAt: Date;
  updatedAt: Date;
}): Transaction {
  return {
    id: record.id,
    source: record.source,
    sourceMessageId: record.sourceMessageId ?? undefined,
    emailSubject: record.emailSubject ?? undefined,
    emailFrom: record.emailFrom ?? undefined,
    amount: record.amount.toNumber(),
    currency: record.currency,
    merchant: record.merchant,
    purchasedAt: record.purchasedAt.toISOString(),
    category: record.category,
    status: record.status,
    confidence: record.confidence,
    rawText: record.rawText ?? undefined,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString()
  };
}

function mapSyncLogRecord(record: {
  id: string;
  provider: SyncProvider;
  startedAt: Date;
  finishedAt: Date;
  scanned: number;
  imported: number;
  skipped: number;
}): SyncLogEntry {
  return {
    id: record.id,
    provider: record.provider,
    startedAt: record.startedAt.toISOString(),
    finishedAt: record.finishedAt.toISOString(),
    scanned: record.scanned,
    imported: record.imported,
    skipped: record.skipped
  };
}

function toDecimal(value: number) {
  return new Prisma.Decimal(value);
}

function toJsonValue(value: Record<string, unknown>): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function toUnknownRecord(value: Prisma.JsonValue): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}
