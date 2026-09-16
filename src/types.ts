import { ReactNode } from "react";

// Navigation

export type NavElement = {
  title: string;
  url: string;
  icon: ReactNode;
  page: ReactNode;
  hidenav?: boolean;
  expandable?: boolean;
}

// LLM providers

export interface LlmProviderInfo {
  id: string;
  name: string;
  available: boolean;
  status: boolean;
  setup_hint: string;
}

export interface OllamaModelInfo {
  name: string;
  size: number | null;
  parameter_size: string | null;
  quantization_level: string | null;
  family: string | null;
}

// Chat

export interface Channel {
  id: string;
  name: string;
  created_at: number;
}

export interface Conversation {
  id: string;
  channel_id: string;
  title: string | null;
  created_at: number;
}

export interface StoredMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: number;
}

// Trained models

export interface TrainedModel {
  id: string;
  model_name: string;
  tickers: string;
  start_date: string;
  end_date: string;
  created_at: number;
}

// App settings

export interface AppSetting {
  key: string;
  value: string | null;
  updated_at: number;
}

// guides + flashcards

export interface StoredGuide {
  id: string;
  topic: string;
  title: string;
  summary: string;
  steps: string; // JSON: [{title, content}]
  key_takeaways: string; // JSON: string[]
  sources: string; // JSON: [{title, url, extract}]
  grounded: number; // 0 | 1
  created_at: number;
  updated_at: number;
}

export interface GuideStep {
  title: string;
  content: string;
}

export interface GuideSource {
  title: string;
  url: string;
  extract: string;
}

/** Parsed shape used by the UI (JSON fields decoded). */
export interface Guide {
  id: string;
  topic: string;
  title: string;
  summary: string;
  steps: GuideStep[];
  keyTakeaways: string[];
  sources: GuideSource[];
  grounded: boolean;
  createdAt: number;
  updatedAt: number;
}

/** Guide payload returned by POST /learn/guide. */
export interface GeneratedGuide {
  title: string;
  summary: string;
  steps: GuideStep[];
  key_takeaways: string[];
  grounded: boolean;
  sources: GuideSource[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface StoredDeck {
  id: string;
  topic: string;
  cards: string; // JSON: Flashcard[]
  created_at: number;
}

export interface Deck {
  id: string;
  topic: string;
  cards: Flashcard[];
  createdAt: number;
}

export interface FlashcardProgress {
  deck_id: string;
  card_id: string; // index of the card within the deck, as string
  box_level: number; // 0..2 Leitner box
  due_at: number; // epoch ms
  last_reviewed_at: number | null;
}
