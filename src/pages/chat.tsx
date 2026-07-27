import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const API_BASE_URL = "http://127.0.0.1:8721";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  async function send() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim(), timestamp: new Date().toISOString() };
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
      addMessage({ role: "assistant", content: data.reply, timestamp: new Date().toISOString() });
    } catch (e) {
      console.error("Chat request failed:", e);
      addMessage({ role: "system", content: "Error: Failed to connect to the chat endpoint.", timestamp: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  }

  const getMessageStyles = (role: string) => {
    switch (role) {
      case "user": return { bg: "#0070f3", color: "#fff", align: "right" };
      case "system": return { bg: "#fff3cd", color: "#856404", align: "center", border: "1px solid #ffeeba" };
      default: return { bg: "#f0f0f0", color: "#000", align: "left" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 20, boxSizing: "border-box" }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 12, paddingRight: 10 }}>
        {messages.length === 0 && <p style={{ color: "#888", textAlign: "center", marginTop: 40 }}>Start a conversation with the LLM.</p>}
        {messages.map((msg, i) => {
          const styles = getMessageStyles(msg.role);
          return (
            <div key={i} style={{ marginBottom: 12, textAlign: styles.align as any }}>
              <span style={{ display: "inline-block", background: styles.bg, color: styles.color, border: msg.role === "system" ? styles.border : "none", padding: "8px 12px", borderRadius: 8, maxWidth: msg.role === "system" ? "90%" : "75%", whiteSpace: "pre-wrap", textAlign: "left" }}>
                {msg.content}
              </span>
              <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
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
          placeholder="Type your message..."
          rows={3}
          style={{ flex: 1, padding: 8, resize: "none", borderRadius: 4, border: "1px solid #ccc" }}
          disabled={loading}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "10px 20px", cursor: (loading || !input.trim()) ? "not-allowed" : "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 4, flex: 1 }}>Send</button>
          <button onClick={() => setMessages([])} style={{ fontSize: 12, color: "#888", background: "none", border: "1px solid #ccc", padding: "4px", borderRadius: 4, cursor: "pointer" }}>Clear</button>
        </div>
      </div>
    </div>
  );
}
