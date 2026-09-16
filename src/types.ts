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
