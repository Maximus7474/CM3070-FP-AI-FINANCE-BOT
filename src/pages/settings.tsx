import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function handleTrain() {
    if (loading) return;
    setLoading(true);
    setStatus("⏳ Initiating model training... This may take a few minutes.");

    try {
      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Training Complete!\nModel: ${data.model_name}\nTickers: ${data.valid_tickers?.join(", ")}`);
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error('Training failed', e);
      setStatus(`❌ Training failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>System Settings</h2>
      <p style={{ color: "#666" }}>Trigger a new PPO model training iteration.</p>

      <button
        onClick={handleTrain}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: 4, marginTop: 10 }}
      >
        {loading ? "Training..." : "Train Model"}
      </button>

      {status && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: 4, whiteSpace: "pre-wrap" }}>
          {status}
        </div>
      )}
    </div>
  );
}
