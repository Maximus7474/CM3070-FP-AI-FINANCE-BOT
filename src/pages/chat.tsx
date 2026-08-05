import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const API_BASE_URL = "http://127.0.0.1:8721";

// const MOCK_MESSAGES: Message[] = [
//   {
//     role: "user",
//     content: "MACD definition",
//     timestamp: new Date().toISOString(),
//   },
//   {
//     role: "system",
//     content: "Content sent",
//     timestamp: new Date().toISOString(),
//   },
//   {
//     role: "assistant",
//     content: `The MACD (Moving Average Convergence Divergence) is a popular technical analysis indicator used by traders to identify trends in the market. It helps determine potential buy or sell signals based on price momentum.

//     **What does the MACD measure?**

//     The MACD measures the difference between two exponential moving averages (EMAs): a 12-period EMA and a 26-period EMA. This difference is then plotted against the price chart, creating another line known as the signal line, which typically has a slower period, often 9 periods.

//     **How do traders commonly interpret the MACD?**

//     Traders use the MACD to identify trends by looking at crossovers between the two moving averages. A bullish crossover occurs when the faster EMA crosses above the slower EMA, indicating potential upward price movement. Conversely, a bearish crossover happens when the faster EMA crosses below the slower EMA, suggesting possible downward price action.

//     **What are some common signals associated with the MACD?**

//     1. **Crossover:** As mentioned earlier, crossovers can indicate potential buy or sell opportunities.
//     2. **Divergence:** If the MACD line diverges from the price chart (i.e., while prices are falling, the MACD is rising), it may signal a reversal in trend direction.
//     3. **Histograms:** The MACD histogram displays the difference between the two moving averages and can provide additional insights into momentum.

//     **What are some limitations of using the MACD?**

//     1. **Lagging Indicator:** The MACD lags behind price movements, meaning it may not react quickly to changes in market conditions.
//     2. **False Signals:** Crossovers can sometimes produce false signals, leading traders to make incorrect decisions.
//     3. **Over-reliance on a single indicator:** Relying solely on the MACD for trading decisions can be risky; it's essential to combine it with other indicators and analysis methods.

//     In summary, the MACD is a valuable tool in technical analysis, but it should not be used in isolation when making trading decisions.
//   `,
//     timestamp: new Date().toISOString(),
//   }
// ];

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex flex-col h-full w-full overflow-hidden box-border">
        <ScrollArea className="flex-1 min-h-0 pr-4">
              <div className="space-y-3 pb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground mt-10 text-sm">
                    Start a conversation with the LLM.
                  </div>
                ) : messages.map((msg, i) => {
                  const roleStyle = ROLE_STYLES[msg.role as keyof typeof ROLE_STYLES] || ROLE_STYLES.assistant;

                  return (
                    <div key={i} className={cn("flex flex-col", roleStyle.align)}>
                      <span className={cn("inline-block px-3 py-2 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] md:max-w-[75%]", roleStyle.bubble)}>
                        {msg.content}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}

                {loading && (
                  <div className="text-sm text-muted-foreground italic animate-pulse">
                    Working...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              {/*<ScrollBar orientation="vertical" />*/}
            </ScrollArea>

        <div className="flex gap-2 items-end border-t pt-3 p-1 shrink-0 mt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={3}
            disabled={loading}
            className="flex-1 resize-none min-h-20"
          />
          <div className="flex flex-col gap-1.5 h-full">
            <Button
              onClick={send}
              disabled={loading || !input.trim()}
              className="flex-1 w-18 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
            <Button
              onClick={() => setMessages([])}
              variant="outline"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
    );
}
