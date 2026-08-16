import { ReactNode } from "react";

export type NavElement = {
  title: string;
  url: string;
  icon: ReactNode;
  page: ReactNode;
  hidenav?: boolean;
  expandable?: boolean;
}

// prediction / quiz interfaces
export interface Allocation {
  ticker: string;
  action: "BUY" | "SELL" | "HOLD";
  price: number;
  shares: number;
  dollar_value: number;
  pct_of_budget: number;
  rsi: number;
  macd_hist: number;
  bb_pct: number;
}

export interface Evolution {
  dates: string[];
  rl_value: number[];
  bh_value: number[];
  rl_drawdown: number[];
  bh_drawdown: number[];
}

export interface BacktestSummary {
  rl_return_pct: number;
  bh_return_pct: number;
  sharpe: number;
  max_drawdown_pct: number;
  alpha_margin: number;
}

export interface PredictionResult {
  budget: number;
  cash_remaining: number;
  eval_period: string;
  backtest_summary: BacktestSummary;
  allocations: Allocation[];
  evolution: Evolution;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "open";
  question: string;
  options?: string[];
  context?: string;
}

export interface QuizReviewItem {
  question_id: string;
  correct?: boolean;
  feedback: string;
}

export interface QuizReview {
  reviews?: QuizReviewItem[];
  overall_feedback?: string;
  score?: number;
  total?: number;
  raw?: string;
}

export interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}
