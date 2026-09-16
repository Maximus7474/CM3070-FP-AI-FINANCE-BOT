import { generateId } from "../utils";
import { getDb } from "./client";
import type { TrainedModel } from "@/types";

export const modelsRepo = {
  async list(): Promise<TrainedModel[]> {
    const db = await getDb();
    return db.select<TrainedModel[]>(
      "SELECT * FROM trained_models ORDER BY created_at DESC"
    );
  },

  async create(data: Omit<TrainedModel, "id" | "created_at">): Promise<TrainedModel> {
    const db = await getDb();
    const model: TrainedModel = {
      id: generateId(),
      ...data,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO trained_models (id, model_name, tickers, start_date, end_date, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [model.id, model.model_name, model.tickers, model.start_date, model.end_date, model.created_at]
    );
    return model;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM trained_models WHERE id = ?", [id]);
  },

  async existsByName(modelName: string): Promise<boolean> {
    const db = await getDb();
    const results = await db.select<TrainedModel[]>(
      "SELECT id FROM trained_models WHERE LOWER(model_name) = LOWER(?) LIMIT 1",
      [modelName.trim()]
    );
    return results.length > 0;
  },
};
