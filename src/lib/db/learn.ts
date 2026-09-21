import { generateId } from "../utils";
import { getDb } from "./client";
import type {
  Deck,
  Flashcard,
  FlashcardProgress,
  Guide,
  GuideSource,
  GuideStep,
  StoredDeck,
  StoredGuide,
} from "@/types";

function parseGuide(row: StoredGuide): Guide {
  const safeParse = <T,>(json: string, fallback: T): T => {
    try {
      return JSON.parse(json) as T;
    } catch {
      return fallback;
    }
  };
  return {
    id: row.id,
    topic: row.topic,
    title: row.title,
    summary: row.summary,
    steps: safeParse<GuideStep[]>(row.steps, []),
    keyTakeaways: safeParse<string[]>(row.key_takeaways, []),
    sources: safeParse<GuideSource[]>(row.sources, []),
    grounded: row.grounded === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const guidesRepo = {
  async list(): Promise<Guide[]> {
    const db = await getDb();
    const rows = await db.select<StoredGuide[]>(
      "SELECT * FROM guides ORDER BY created_at DESC"
    );
    return rows.map(parseGuide);
  },

  async get(id: string): Promise<Guide | null> {
    const db = await getDb();
    const rows = await db.select<StoredGuide[]>(
      "SELECT * FROM guides WHERE id = ?",
      [id]
    );
    return rows[0] ? parseGuide(rows[0]) : null;
  },

  async create(input: {
    topic: string;
    title: string;
    summary: string;
    steps: GuideStep[];
    keyTakeaways: string[];
    sources: GuideSource[];
    grounded: boolean;
  }): Promise<Guide> {
    const db = await getDb();
    const now = Date.now();
    const guide: Guide = {
      id: generateId(),
      topic: input.topic,
      title: input.title,
      summary: input.summary,
      steps: input.steps,
      keyTakeaways: input.keyTakeaways,
      sources: input.sources,
      grounded: input.grounded,
      createdAt: now,
      updatedAt: now,
    };
    await db.execute(
      `INSERT INTO guides (id, topic, title, summary, steps, key_takeaways, sources, grounded, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        guide.id,
        guide.topic,
        guide.title,
        guide.summary,
        JSON.stringify(guide.steps),
        JSON.stringify(guide.keyTakeaways),
        JSON.stringify(guide.sources),
        guide.grounded ? 1 : 0,
        guide.createdAt,
        guide.updatedAt,
      ]
    );
    return guide;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM guides WHERE id = ?", [id]);
  },
};

// ---------------------------------------------------------------------------
// Flashcard decks
// ---------------------------------------------------------------------------

function parseDeck(row: StoredDeck): Deck {
  let cards: Flashcard[] = [];
  try {
    cards = JSON.parse(row.cards) as Flashcard[];
  } catch {
    cards = [];
  }
  return { id: row.id, topic: row.topic, cards, createdAt: row.created_at };
}

export const decksRepo = {
  async list(): Promise<Deck[]> {
    const db = await getDb();
    const rows = await db.select<StoredDeck[]>(
      "SELECT * FROM flashcard_decks ORDER BY created_at DESC"
    );
    return rows.map(parseDeck);
  },

  async create(topic: string, cards: Flashcard[]): Promise<Deck> {
    const db = await getDb();
    const deck: Deck = {
      id: generateId(),
      topic,
      cards,
      createdAt: Date.now(),
    };
    await db.execute(
      "INSERT INTO flashcard_decks (id, topic, cards, created_at) VALUES (?, ?, ?, ?)",
      [deck.id, deck.topic, JSON.stringify(deck.cards), deck.createdAt]
    );
    return deck;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    // plugin-sql migrations don't guarantee PRAGMA foreign_keys=ON, so
    // cascade manually.
    await db.execute("DELETE FROM flashcard_progress WHERE deck_id = ?", [id]);
    await db.execute("DELETE FROM flashcard_decks WHERE id = ?", [id]);
  },
};

// ---------------------------------------------------------------------------
// Flashcard review progress (Leitner boxes)
// ---------------------------------------------------------------------------

// Box intervals in hours: box 0 -> today, box 1 -> ~1 day, box 2 -> ~3 days.
const BOX_INTERVALS_HOURS = [0.25, 24, 72];
export const MAX_BOX = BOX_INTERVALS_HOURS.length - 1;

function dueAtForBox(box: number): number {
  return Date.now() + BOX_INTERVALS_HOURS[box] * 3600 * 1000;
}

export const progressRepo = {
  /** All progress rows for a deck. */
  async listForDeck(deckId: string): Promise<FlashcardProgress[]> {
    const db = await getDb();
    return db.select<FlashcardProgress[]>(
      "SELECT * FROM flashcard_progress WHERE deck_id = ?",
      [deckId]
    );
  },

  /** Card indices due for review now (box 0 cards are always due). */
  async dueCardIds(deckId: string): Promise<string[]> {
    const db = await getDb();
    const rows = await db.select<Pick<FlashcardProgress, "card_id">[]>(
      "SELECT card_id FROM flashcard_progress WHERE deck_id = ? AND (box_level = 0 OR due_at <= ?)",
      [deckId, Date.now()]
    );
    return rows.map((r) => r.card_id);
  },

  /** Number of cards not yet due (for "N cards scheduled later" UI). */
  async scheduledCount(deckId: string): Promise<number> {
    const db = await getDb();
    const rows = await db.select<{ n: number }[]>(
      "SELECT COUNT(*) as n FROM flashcard_progress WHERE deck_id = ? AND box_level > 0 AND due_at > ?",
      [deckId, Date.now()]
    );
    return rows[0]?.n ?? 0;
  },

  /**
   * Record a review: 'got_it' promotes the box (and due date);
   * 'again' resets to box 0 (due immediately).
   */
  async record(
    deckId: string,
    cardId: string,
    gotIt: boolean
  ): Promise<void> {
    const db = await getDb();
    const rows = await db.select<Pick<FlashcardProgress, "box_level">[]>(
      "SELECT box_level FROM flashcard_progress WHERE deck_id = ? AND card_id = ?",
      [deckId, cardId]
    );
    const current = rows[0]?.box_level ?? 0;
    const nextBox = gotIt ? Math.min(current + 1, MAX_BOX) : 0;
    const now = Date.now();

    await db.execute(
      `INSERT INTO flashcard_progress (deck_id, card_id, box_level, due_at, last_reviewed_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(deck_id, card_id) DO UPDATE SET
         box_level = excluded.box_level,
         due_at = excluded.due_at,
         last_reviewed_at = excluded.last_reviewed_at`,
      [deckId, cardId, nextBox, dueAtForBox(nextBox), now]
    );
  },
};
