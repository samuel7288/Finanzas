import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { getGmailAuthUrl, getGmailStatus, saveGmailCode, syncGmailPurchases } from "./gmail.js";
import { getDataPath, readData, Transaction, updateData } from "./storage.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "dist");

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/gmail/status", async (_req, res) => {
  res.json(await getGmailStatus(getDataPath()));
});

app.get("/api/gmail/auth-url", (_req, res) => {
  try {
    res.json({ url: getGmailAuthUrl() });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

app.get("/api/gmail/oauth2callback", async (req, res) => {
  const code = String(req.query.code ?? "");

  if (!code) {
    res.redirect(`${frontendUrl}/?gmail=missing-code`);
    return;
  }

  try {
    await saveGmailCode(code);
    res.redirect(`${frontendUrl}/?gmail=connected`);
  } catch (error) {
    const message = encodeURIComponent(getErrorMessage(error));
    res.redirect(`${frontendUrl}/?gmail=error&message=${message}`);
  }
});

app.post("/api/gmail/sync", async (_req, res) => {
  try {
    res.json(await syncGmailPurchases());
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

app.get("/api/transactions", async (_req, res) => {
  const data = await readData();
  const transactions = [...data.transactions].sort(
    (left, right) => new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime()
  );

  res.json({ transactions });
});

app.post("/api/transactions", async (req, res) => {
  const body = req.body as Partial<Transaction>;
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0 || !body.merchant) {
    res.status(400).json({ error: "Ingresa comercio y monto validos." });
    return;
  }

  const now = new Date().toISOString();
  const transaction: Transaction = {
    id: cryptoRandomId(),
    source: "manual",
    amount,
    currency: String(body.currency ?? "USD").slice(0, 3).toUpperCase(),
    merchant: String(body.merchant).slice(0, 80),
    purchasedAt: body.purchasedAt ? new Date(body.purchasedAt).toISOString() : now,
    category: String(body.category ?? "Sin categoria"),
    status: "approved",
    confidence: 1,
    createdAt: now,
    updatedAt: now
  };

  await updateData((data) => {
    data.transactions.push(transaction);
  });

  res.status(201).json({ transaction });
});

app.patch("/api/transactions/:id", async (req, res) => {
  const allowedStatus = new Set(["pending", "approved", "ignored"]);
  const id = req.params.id;
  const updates = req.body as Partial<Transaction>;
  let updated: Transaction | undefined;

  await updateData((data) => {
    const transaction = data.transactions.find((item) => item.id === id);
    if (!transaction) return;

    if (updates.status && allowedStatus.has(updates.status)) transaction.status = updates.status;
    if (updates.category) transaction.category = String(updates.category).slice(0, 50);
    if (updates.merchant) transaction.merchant = String(updates.merchant).slice(0, 80);
    if (updates.purchasedAt) transaction.purchasedAt = new Date(updates.purchasedAt).toISOString();
    if (updates.amount && Number.isFinite(Number(updates.amount))) transaction.amount = Number(updates.amount);

    transaction.updatedAt = new Date().toISOString();
    updated = transaction;
  });

  if (!updated) {
    res.status(404).json({ error: "Transaccion no encontrada." });
    return;
  }

  res.json({ transaction: updated });
});

app.delete("/api/transactions/:id", async (req, res) => {
  let removed = false;

  await updateData((data) => {
    const previousLength = data.transactions.length;
    data.transactions = data.transactions.filter((transaction) => transaction.id !== req.params.id);
    removed = data.transactions.length !== previousLength;
  });

  res.status(removed ? 204 : 404).send();
});

app.use(express.static(distDir));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Finanzas API escuchando en http://localhost:${port}`);
});

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Error inesperado.";
}

function cryptoRandomId(): string {
  return crypto.randomUUID();
}
