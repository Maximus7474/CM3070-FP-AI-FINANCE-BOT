import { Button } from "@/components/ui/button";
 import { useConversation } from "@/hooks/use-conversation";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8721";

export default function Chat() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const { messages, loading: historyLoading, appendMessage } = useConversation(searchParams.get("channel") ?? "general");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    await appendMessage("user", text);

    try {
      const history = messages.slice(-10).map(({ role, content }) => ({ role, content }));
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      await appendMessage("assistant", data.reply);
    } catch (e) {
      console.error("Chat request failed:", e);
      await appendMessage("system", "Error: Failed to connect to the chat endpoint.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col h-full box-border w-full">
      <div className="flex-1 overflow-y-auto mb-3 pr-2 space-y-3">
        {historyLoading && (
          <div className="text-center text-muted-foreground mt-10 text-sm">Loading history...</div>
        )}
        {!historyLoading && messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-10 text-sm">
            Start a conversation with the LLM.
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : msg.role === "system" ? "items-center" : "items-start"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] md:max-w-[75%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : msg.role === "system"
                  ? "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1 px-1">
              {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}

        {sending && <div className="text-sm text-muted-foreground italic animate-pulse">Working...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 items-end border-t pt-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Type your message..."
          rows={3}
          disabled={sending}
          className="flex-1 p-2.5 text-sm rounded-md border border-input bg-background resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex flex-col gap-1.5 h-full">
          <Button onClick={send} disabled={sending || !input.trim()} className="flex-1 w-18 disabled:opacity-50 disabled:cursor-not-allowed">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
