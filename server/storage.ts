import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const defaultData = (): AppData => ({
  transactions: [],
  syncLog: []
});

let writeQueue = Promise.resolve();

export async function readData(): Promise<AppData> {
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

export async function writeData(data: AppData): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  const tmpPath = `${dataPath}.tmp`;
  const payload = JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2);

  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(tmpPath, `${payload}\n`, "utf8");
    await fs.rename(tmpPath, dataPath);
  });

  await writeQueue;
}

export async function updateData<T>(mutator: (data: AppData) => T | Promise<T>): Promise<T> {
  const data = await readData();
  const result = await mutator(data);
  await writeData(data);
  return result;
}

export function getDataPath(): string {
  return dataPath;
}
