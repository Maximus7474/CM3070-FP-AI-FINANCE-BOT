import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8721/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });
      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      const withReply = [...updated, assistantMessage];
      setMessages(withReply);
    } catch (e) {
      console.error("Chat request failed:", e);
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    setMessages([]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "95vh", padding: 20, boxSizing: "border-box" }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
        {messages.length === 0 && (
          <p style={{ color: "#888" }}>No messages yet. Ask something to get started.</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.role === "user" ? "#0070f3" : "#f0f0f0",
                color: msg.role === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: 8,
                maxWidth: "75%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </span>
            <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {loading && <p style={{ color: "#888" }}>Thinking...</p>}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask a financial question... (Enter to send, Shift+Enter for newline)"
          rows={3}
          style={{ flex: 1, padding: 8, resize: "none" }}
          disabled={loading}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={send} disabled={loading || !input.trim()}>Send</button>
          <button onClick={clearHistory} style={{ fontSize: 12, color: "#888" }}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;