import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __finovaPrisma: PrismaClient | undefined;
}

export function hasDatabaseConfig(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDatabaseLabel(): string {
  return hasDatabaseConfig() ? "postgresql://configured (prisma)" : "data/app-data.json";
}

export function getPrismaClient(): PrismaClient {
  if (!hasDatabaseConfig()) {
    throw new Error("DATABASE_URL no esta configurada.");
  }

  if (!globalThis.__finovaPrisma) {
    globalThis.__finovaPrisma = new PrismaClient();
  }

  return globalThis.__finovaPrisma;
}
