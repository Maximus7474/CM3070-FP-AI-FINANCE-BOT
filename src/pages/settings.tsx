import { Button } from "@/components/ui/button";
import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  async function handleTrain() {
    if (loading) return;
    setLoading(true);
    setStatus({
      type: "info",
      message: "Initiating model training... This may take a few minutes.",
    });

    try {
      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: `Training Complete!\nModel: ${data.model_name}\nTickers: ${data.valid_tickers?.join(", ")}`,
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Training failed", e);
      setStatus({
        type: "error",
        message: `Training failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Trigger a new PPO model training iteration.
        </p>
      </div>

      <div>
        <Button
          onClick={handleTrain}
          disabled={loading}
          className="text-sm font-medium transition-colors bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loading ? "Training..." : "Train Model"}
        </Button>
      </div>

      {status && (
        <div
          className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
            status.type === "info"
              ? "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
              : status.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
