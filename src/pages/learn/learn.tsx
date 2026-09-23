import { useCallback, useEffect, useState } from "react";
import { GraduationCap, Layers, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { API_BASE_URL } from "@/lib/data";
import {
  decksRepo,
  guidesRepo,
} from "@/lib/db/learn";
import type { Deck, GeneratedGuide, Guide } from "@/types";
import { GuideTab } from "./guide-view";
import { FlashcardsTab } from "./flashcards";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const detail =
      (data && (typeof data.detail === "string" ? data.detail : data.detail?.detail)) ||
      `Request failed (${res.status})`;
    throw new ApiError(res.status, detail);
  }
  return data as T;
}

/** Fire a guide generation request against the sidecar. */
export function generateGuideApi(topic: string): Promise<GeneratedGuide> {
  return postJson<GeneratedGuide>("/learn/guide", { topic });
}

/** Fire a flashcards generation request against the sidecar. */
export function generateFlashcardsApi(
  topic: string,
  count = 10
): Promise<{ topic: string; cards: { front: string; back: string }[] }> {
  return postJson<{ topic: string; cards: { front: string; back: string }[] }>(
    "/learn/flashcards",
    { topic, count }
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const TOPIC_SUGGESTIONS = [
  "RSI",
  "MACD",
  "Bollinger Bands",
  "ETFs",
  "P/E ratio",
  "Diversification",
  "Dollar-cost averaging",
  "Stop-loss",
];

export function TopicSuggestions({ onPick }: { onPick: (topic: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TOPIC_SUGGESTIONS.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onPick(t)}
          className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// Page

export default function Learn() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);

  const refreshGuides = useCallback(async () => {
    try {
      setGuides(await guidesRepo.list());
    } catch (e) {
      console.error("Failed to load guides:", e);
    }
  }, []);

  const refreshDecks = useCallback(async () => {
    try {
      setDecks(await decksRepo.list());
    } catch (e) {
      console.error("Failed to load decks:", e);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all([refreshGuides(), refreshDecks()]);
      setLibraryLoading(false);
    })();
  }, [refreshGuides, refreshDecks]);

  if (libraryLoading) {
    return (
      <div className="space-y-4">
        <LearnHeader />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LearnHeader />

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">
            <BookOpen className="size-4 mr-1.5" /> Guides
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Layers className="size-4 mr-1.5" /> Flashcards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <GuideTab guides={guides} onRefresh={refreshGuides} />
        </TabsContent>

        <TabsContent value="flashcards">
          <FlashcardsTab decks={decks} onRefresh={refreshDecks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LearnHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
        <GraduationCap className="size-6" /> Learn
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        Step-by-step lessons grounded in reference sources, plus flashcards to make
        the concepts stick.
      </p>
    </div>
  );
}
