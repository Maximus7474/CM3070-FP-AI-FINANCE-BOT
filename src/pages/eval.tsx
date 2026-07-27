import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

export default function Evaluation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function handleEvaluate() {
    if (loading) return;
    setLoading(true);
    setStatus("⏳ Evaluating model and generating recommendations...");

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Evaluation Complete!\nRecommendations saved to:\n${data.json_path}`);
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error('Evaluation failed', e);
      setStatus(`❌ Evaluation failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Evaluate Model</h2>
      <p style={{ color: "#666" }}>Run the model against historical timeframes to generate recommendations.</p>

      <button
        onClick={handleEvaluate}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: 4, marginTop: 10 }}
      >
        {loading ? "Processing..." : "Generate Recommendations"}
      </button>

      {status && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: 4, whiteSpace: "pre-wrap" }}>
          {status}
        </div>
      )}
    </div>
  );
}
