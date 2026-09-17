import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Layers,
  Loader2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMarkdown } from "@/components/chat-markdown";
import { cn } from "@/lib/utils";
import { decksRepo, progressRepo } from "@/lib/db/learn";
import { TopicSuggestions, generateFlashcardsApi } from "./learn";
import { Deck } from "@/types";

interface FlashcardsTabProps {
  decks: Deck[];
  onRefresh: () => Promise<void>;
}

interface SessionCard {
  cardId: string; // index within the deck as string
  front: string;
  back: string;
}

export function FlashcardsTab({ decks, onRefresh }: FlashcardsTabProps) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studying, setStudying] = useState<{
    deck: Deck;
    cards: SessionCard[];
  } | null>(null);

  /** Open a study session with the due-first queue for this deck. */
  const startSession = useCallback(async (deck: Deck) => {
    const cards = await buildQueue(deck);
    setStudying({ deck, cards });
  }, []);

  async function handleGenerate(t: string) {
    const trimmed = t.trim();
    if (!trimmed || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const { cards } = await generateFlashcardsApi(trimmed, 10);
      const deck = await decksRepo.create(trimmed, cards);
      await onRefresh();
      await startSession(deck);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate flashcards.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id: string) {
    await decksRepo.delete(id);
    setStudying((s) => (s && s.deck.id === id ? null : s));
    await onRefresh();
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate(topic)}
          placeholder="Enter a topic to build a flashcard deck, e.g. MACD..."
          disabled={generating}
          className="flex-1"
        />
        <Button onClick={() => handleGenerate(topic)} disabled={generating || !topic.trim()}>
          {generating ? (
            <Loader2 className="size-4 animate-spin mr-1.5" />
          ) : (
            <Sparkles className="size-4 mr-1.5" />
          )}
          {generating ? "Generating..." : "Generate deck"}
        </Button>
      </div>

      <TopicSuggestions onPick={(t) => { setTopic(t); handleGenerate(t); }} />

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {studying ? (
        <StudySession
          deck={studying.deck}
          queue={studying.cards}
          onClose={() => setStudying(null)}
        />
      ) : (
        <DeckLibrary decks={decks} onStudy={startSession} onDelete={handleDelete} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deck library
// ---------------------------------------------------------------------------

function DeckLibrary({
  decks,
  onStudy,
  onDelete,
}: {
  decks: Deck[];
  onStudy: (deck: Deck) => void | Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [dueCounts, setDueCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        decks.map(async (d) => [d.id, (await progressRepo.dueCardIds(d.id)).length] as const)
      );
      if (!cancelled) setDueCounts(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [decks]);

  if (decks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        <Layers className="mx-auto size-8 opacity-40 mb-2" />
        Generate a deck above — cards are graded with spaced repetition so
        tricky concepts come back until they stick.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => {
        const due = dueCounts[deck.id] ?? 0;
        return (
          <div key={deck.id} className="group rounded-lg border p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm truncate">{deck.topic}</h4>
              <button
                type="button"
                onClick={() => onDelete(deck.id)}
                title="Delete deck"
                className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {deck.cards.length} cards
              {due > 0 ? ` · ${due} due now` : " · nothing due"}
            </p>
            <Button
              size="sm"
              variant={due > 0 ? "default" : "outline"}
              onClick={() => onStudy(deck)}
            >
              Study
            </Button>
          </div>
        );
      })}
    </div>
  );
}

// Session queue policy: due cards first (in deck order), then cards with no
// progress yet, then everything else. Simple + predictable, boxes handle the
// long-term scheduling.
async function buildQueue(deck: Deck): Promise<SessionCard[]> {
  const [dueIds, progressRows] = await Promise.all([
    progressRepo.dueCardIds(deck.id),
    progressRepo.listForDeck(deck.id),
  ]);
  const seen = new Set(progressRows.map((r) => r.card_id));

  const due = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => dueIds.includes(id));
  const fresh = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => !seen.has(id));
  const later = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => !dueIds.includes(id) && seen.has(id));

  const toCard = ({ card, id }: { card: { front: string; back: string }; id: string }) => ({
    cardId: id,
    front: card.front,
    back: card.back,
  });
  return [...due, ...fresh, ...later].map(toCard);
}

function StudySession({
  deck,
  queue: initialQueue,
  onClose,
}: {
  deck: Deck;
  queue: SessionCard[];
  onClose: () => void;
}) {
  const [queue] = useState<SessionCard[]>(initialQueue);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [gotIt, setGotIt] = useState(0);
  const [done, setDone] = useState(false);

  const card = queue[current];
  const total = queue.length;

  const grade = useCallback(
    async (ok: boolean) => {
      if (!card) return;
      await progressRepo.record(deck.id, card.cardId, ok);
      setReviewed((r) => r + 1);
      if (ok) setGotIt((g) => g + 1);
      setFlipped(false);
      if (current + 1 >= total) {
        setDone(true);
      } else {
        setCurrent((c) => c + 1);
      }
    },
    [card, current, total, deck.id]
  );

  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  if (done) {
    return (
      <div className="rounded-lg border p-8 text-center space-y-3">
        <Check className="mx-auto size-10 text-primary" />
        <h3 className="text-lg font-semibold">Session complete!</h3>
        <p className="text-sm text-muted-foreground">
          {gotIt} of {reviewed} cards marked as known
          {reviewed - gotIt > 0
            ? ` — the other ${reviewed - gotIt} will come back soon.`
            : "."}
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={onClose}>
            Back to decks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">{deck.topic}</h3>
          <p className="text-xs text-muted-foreground">
            Card {current + 1} of {total} · {reviewed} reviewed
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="size-4" /> End session
        </Button>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "w-full rounded-lg border-2 p-8 text-left min-h-44 flex flex-col justify-center transition-colors cursor-pointer",
          flipped ? "border-primary/40 bg-primary/5" : "hover:bg-accent/40"
        )}
      >
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
          {flipped ? "Answer" : "Question — click or press Space to flip"}
        </span>
        {flipped ? (
          <ChatMarkdown content={card.back} className="text-base" />
        ) : (
          <span className="text-lg font-medium">{card.front}</span>
        )}
      </button>

      {flipped && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            onClick={() => grade(false)}
          >
            <X className="size-4 mr-1.5" /> Review again
          </Button>
          <Button className="flex-1" onClick={() => grade(true)}>
            <Check className="size-4 mr-1.5" /> Got it
          </Button>
        </div>
      )}
    </div>
  );
}
