import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const API_BASE_URL = "http://127.0.0.1:8721";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  async function send() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });
      const data = await res.json();

      addMessage({
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Chat request failed:", e);
      addMessage({
        role: "system",
        content: "Error: Failed to connect to the chat endpoint.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleTrain() {
    if (loading) return;
    setLoading(true);

    addMessage({
      role: "system",
      content: "⏳ Initiating model training... This may take a few minutes.",
      timestamp: new Date().toISOString(),
    });

    try {
      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (res.ok) {
        addMessage({
          role: "system",
          content: `✅ Training Complete!\nModel: ${data.model_name}\nTickers: ${data.valid_tickers.join(", ")}`,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error('Training failed', e);
      addMessage({
        role: "system",
        content: `❌ Training failed: ${e.message}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleEvaluate() {
    if (loading) return;
    setLoading(true);

    addMessage({
      role: "system",
      content: "⏳ Evaluating model and generating recommendations...",
      timestamp: new Date().toISOString(),
    });

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (res.ok) {
        addMessage({
          role: "system",
          content: `✅ Evaluation Complete!\nRecommendations saved to:\n${data.json_path}\n\nYou can now ask the assistant to explain the recommendations!`,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error('Evaluation failed', e);
      addMessage({
        role: "system",
        content: `❌ Evaluation failed: ${e.message}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    setMessages([]);
  }

  const getMessageStyles = (role: string) => {
    switch (role) {
      case "user":
        return { bg: "#0070f3", color: "#fff", align: "right" };
      case "system":
        return { bg: "#fff3cd", color: "#856404", align: "center", border: "1px solid #ffeeba" };
      default: // assistant
        return { bg: "#f0f0f0", color: "#000", align: "left" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "95vh", padding: 20, boxSizing: "border-box", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 10, paddingBottom: 15, borderBottom: "1px solid #ddd", marginBottom: 15 }}>
        <button
          onClick={handleTrain}
          disabled={loading}
          style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: 4 }}
        >
          1. Train Model
        </button>
        <button
          onClick={handleEvaluate}
          disabled={loading}
          style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: 4 }}
        >
          2. Generate Recommendations
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginBottom: 12, paddingRight: 10 }}>
        {messages.length === 0 && (
          <p style={{ color: "#888", textAlign: "center", marginTop: 40 }}>
            System ready. Train a model, generate recommendations, or ask a question.
          </p>
        )}

        {messages.map((msg, i) => {
          const styles = getMessageStyles(msg.role);
          return (
            <div key={i} style={{ marginBottom: 12, textAlign: styles.align as any }}>
              <span
                style={{
                  display: "inline-block",
                  background: styles.bg,
                  color: styles.color,
                  border: msg.role === "system" ? styles.border : "none",
                  padding: "8px 12px",
                  borderRadius: 8,
                  maxWidth: msg.role === "system" ? "90%" : "75%",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  fontSize: msg.role === "system" ? "0.9em" : "1em"
                }}
              >
                {msg.content}
              </span>
              <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
        {loading && <p style={{ color: "#888", fontStyle: "italic" }}>Working...</p>}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask for an explanation of the recommendations... (Enter to send)"
          rows={3}
          style={{ flex: 1, padding: 8, resize: "none", borderRadius: 4, border: "1px solid #ccc" }}
          disabled={loading}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{ padding: "10px 20px", cursor: (loading || !input.trim()) ? "not-allowed" : "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 4, flex: 1 }}
          >
            Send
          </button>
          <button
            onClick={clearHistory}
            style={{ fontSize: 12, color: "#888", background: "none", border: "1px solid #ccc", padding: "4px", borderRadius: 4, cursor: "pointer" }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
