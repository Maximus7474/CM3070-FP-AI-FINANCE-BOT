import { Button } from "@/components/ui/button";
import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Evaluation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  async function handleEvaluate() {
    if (loading) return;
    setLoading(true);
    setStatus({
      type: "info",
      message: "Evaluating model and generating recommendations...",
    });

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: `Evaluation Complete!\nRecommendations saved to:\n${data.json_path}`,
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Evaluation failed", e);
      setStatus({
        type: "error",
        message: `Evaluation failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Evaluate Model
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Run the model against historical timeframes to generate recommendations.
        </p>
      </div>

      <div>
        <Button
          onClick={handleEvaluate}
          disabled={loading}
          className="transition-colors bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loading ? "Processing..." : "Generate Recommendations"}
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
