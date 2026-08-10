import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/use-conversation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8721";

const ROLE_STYLES = {
  user: {
    align: "items-end",
    bubble: "bg-primary text-primary-foreground",
  },
  system: {
    align: "items-center",
    bubble: "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
  },
  assistant: {
    align: "items-start",
    bubble: "bg-muted text-foreground",
  },
} as const;

export default function Chat() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const { messages, loading: historyLoading, appendMessage } = useConversation(searchParams.get("channel") ?? "general");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden box-border">
          <ScrollArea className="flex-1 min-h-0 pr-4">
            <div className="space-y-3 pb-4">
              {historyLoading && (
                <div className="text-center text-muted-foreground mt-10 text-sm">Loading history...</div>
              )}
              {!historyLoading && messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-10 text-sm">
                  Start a conversation with the LLM.
                </div>
              )}

              {messages.map((msg, i) => {
                const roleStyle = ROLE_STYLES[msg.role as keyof typeof ROLE_STYLES] || ROLE_STYLES.assistant;

                return (
                  <div key={msg.id || i} className={cn("flex flex-col", roleStyle.align)}>
                    <span className={cn("inline-block px-3 py-2 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] md:max-w-[75%]", roleStyle.bubble)}>
                      {msg.content}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}

              {sending && (
                <div className="text-sm text-muted-foreground italic animate-pulse">
                  Working...
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2 items-end border-t pt-3 p-1 shrink-0 mt-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={3}
              disabled={sending}
              className="flex-1 resize-none min-h-20"
            />
            <div className="flex flex-col gap-1.5 h-full">
              <Button
                onClick={send}
                disabled={sending || !input.trim()}
                className="flex-1 w-18 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
