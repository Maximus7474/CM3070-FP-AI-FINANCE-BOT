import { getDb } from "./client";
import type { AppSetting } from "@/types";

export const SETTINGS_KEYS = {
  llmProvider: "llm_provider",
  llmModel: "llm_model",
} as const;

export const settingsRepo = {
  async get(key: string): Promise<string | null> {
    const db = await getDb();
    const rows = await db.select<(AppSetting & { value: string | null })[]>(
      "SELECT key, value, updated_at FROM app_settings WHERE key = ?",
      [key]
    );
    return rows.length > 0 ? rows[0].value : null;
  },

  async set(key: string, value: string): Promise<void> {
    const db = await getDb();
    await db.execute(
      `INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      [key, value, Date.now()]
    );
  },
};
