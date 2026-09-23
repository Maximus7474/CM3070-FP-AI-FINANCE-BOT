import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  BrainCircuitIcon,
  CalendarRange,
  CircleCheckIcon,
  CircleXIcon,
  SparklesIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/data";
import { modelsRepo } from "@/lib/db/model";
import { DEFAULT_LLM_PROVIDER } from "@/hooks/use-llm";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";
import type { Allocation, PredictionResult, QuizQuestion, QuizReview, StatusState, TrainedModel } from "@/types";

const chartConfig = {
  rl: { label: "RL Agent", color: "#06b6d4" },
  bh: { label: "Buy & Hold", color: "#f59e0b" },
} satisfies ChartConfig;

const ACTION_META = {
  BUY: { label: "Buy", color: "#10b981" },
  HOLD: { label: "Hold", color: "#94a3b8" },
  SELL: { label: "Sell", color: "#ef4444" },
} as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatTick(value: string) {
  const [y, m] = value.split("-");
  const month = MONTHS[Number(m) - 1];
  return month ? `${month} '${y.slice(2)}` : value;
}

function formatDollar(value: number) {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(1)}k`;
  return `${sign}$${abs.toFixed(0)}`;
}

function formatPercent(value: number) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function AllocationTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as {
    ticker: string;
    action: keyof typeof ACTION_META;
    value: number;
    pct: number;
    rsi: number;
    macd_hist: number;
    bb_pct: number;
  };
  const meta = ACTION_META[d.action];
  return (
    <div className="min-w-40 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="mb-1 flex items-center justify-between gap-3 font-medium">
        <span>{d.ticker}</span>
        <span style={{ color: meta.color }}>{meta.label}</span>
      </div>
      <div className="space-y-0.5 text-muted-foreground">
        <div className="flex justify-between gap-3">
          <span>Value</span>
          <span className="font-mono">{formatDollar(d.value)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Weight</span>
          <span className="font-mono">{d.pct}%</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>RSI</span>
          <span className="font-mono">{d.rsi}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>MACD hist</span>
          <span className="font-mono">{d.macd_hist}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>BB%</span>
          <span className="font-mono">{d.bb_pct}</span>
        </div>
      </div>
    </div>
  );
}

export default function Predictions() {
  const [models, setModels] = useState<TrainedModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizLoading, setQuizLoading] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [quizStatus, setQuizStatus] = useState<StatusState | null>(null);
  const [review, setReview] = useState<QuizReview | null>(null);

  async function loadModels() {
    setLoadingModels(true);
    try {
      const data = await modelsRepo.list();
      setModels(data);
      if (data.length > 0) {
        setSelectedModel(data[0].model_name);
      }
    } catch (e) {
      console.error("Failed to load models", e);
    } finally {
      setLoadingModels(false);
    }
  }

  async function handlePredict() {
    if (loading) return;

    if (!selectedModel) {
      setStatus({ type: "error", message: "Please select a model to run predictions." });
      return;
    }

    const modelObj = models.find((m) => m.model_name === selectedModel);
    const tickersList = modelObj?.tickers
      ? modelObj.tickers.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    setLoading(true);
    setStatus({ type: "info", message: `Running predictions with "${selectedModel}"...` });
    setPrediction(null);
    setQuestions([]);
    setAnswers({});
    setReview(null);
    setQuizStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_name: selectedModel, tickers: tickersList }),
      });
      const data = await res.json();

      if (res.ok) {
        setPrediction(data.data);
        setStatus({ type: "success", message: "Predictions generated." });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Prediction failed", e);
      setStatus({ type: "error", message: `Prediction failed: ${e.message}` });
    } finally {
      setLoading(false);
    }
  }

  async function startQuiz() {
    if (quizLoading) return;
    setQuizLoading(true);
    setQuizStatus(null);
    setReview(null);
    setAnswers({});

    try {
      const res = await fetch(`${API_BASE_URL}/quiz/generate`);
      const data = await res.json();

      if (res.ok) {
        setQuestions(data.questions ?? []);
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Failed to load quiz", e);
      setQuizStatus({ type: "error", message: `Failed to load quiz: ${e.message}` });
    } finally {
      setQuizLoading(false);
    }
  }

  async function submitQuiz() {
    if (reviewing) return;

    const [savedModel, savedProvider] = await Promise.all([
      settingsRepo.get(SETTINGS_KEYS.llmModel),
      settingsRepo.get(SETTINGS_KEYS.llmProvider),
    ]);

    const payload = {
      answers: Object.entries(answers).map(([question_id, answer]) => ({
        question_id,
        answer,
      })),
      model: savedModel ?? undefined,
      provider: savedProvider ?? DEFAULT_LLM_PROVIDER,
    };

    setReviewing(true);
    setQuizStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/quiz/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setReview(data.review);
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Quiz review failed", e);
      setQuizStatus({ type: "error", message: `Review failed: ${e.message}` });
    } finally {
      setReviewing(false);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  const equityData = useMemo(() => {
    if (!prediction) return [];
    return prediction.evolution.dates.map((date, i) => ({
      date,
      rl: prediction.evolution.rl_value[i],
      bh: prediction.evolution.bh_value[i],
    }));
  }, [prediction]);

  const drawdownData = useMemo(() => {
    if (!prediction) return [];
    return prediction.evolution.dates.map((date, i) => ({
      date,
      rl: prediction.evolution.rl_drawdown[i],
      bh: prediction.evolution.bh_drawdown[i],
    }));
  }, [prediction]);

  const allocationData = useMemo(() => {
    if (!prediction) return [];
    return prediction.allocations.map((a) => ({
      ticker: a.ticker,
      value: a.dollar_value,
      action: a.action,
      pct: a.pct_of_budget,
      rsi: a.rsi,
      macd_hist: a.macd_hist,
      bb_pct: a.bb_pct,
    }));
  }, [prediction]);

  const actionGroups = useMemo(() => {
    const groups: Record<Allocation["action"], Allocation[]> = {
      BUY: [],
      HOLD: [],
      SELL: [],
    };
    prediction?.allocations.forEach((a) => groups[a.action].push(a));
    return groups;
  }, [prediction]);

  const summary = prediction?.backtest_summary;
  const answeredCount = Object.values(answers).filter((a) => a.trim()).length;

  return (
    <ScrollArea className="min-h-0 px-3">
      <div className="space-y-6 container mx-auto pb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Predictions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Replay the PPO agent over historical data, compare its portfolio to a benchmark, then test your read of its final signals.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Predictions</CardTitle>
            <CardDescription>
              Replays a trained PPO agent over the evaluation window and returns its equity curve, drawdown, and final per-ticker signals. Each signal is a number between -1 and +1: above +0.05 the agent buys, below -0.05 it sells, and anything in between is a hold.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-w-xl">
              <Label htmlFor="predict-model-select">Select Trained Model</Label>
              <Select
                value={selectedModel}
                onValueChange={(value) => setSelectedModel(value ?? models[0]?.model_name)}
                disabled={loadingModels || loading || models.length === 0}
              >
                <SelectTrigger id="predict-model-select" className="w-full">
                  <SelectValue
                    placeholder={
                      loadingModels
                        ? "Loading models..."
                        : models.length === 0
                        ? "No models available"
                        : "Select a model"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.model_name}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">{m.model_name}</span>
                        <span className="text-xs text-muted-foreground">({m.tickers})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {models.length === 0 && !loadingModels && (
                <p className="text-xs text-destructive">
                  No trained models found. Train a model in settings first.
                </p>
              )}
            </div>

            <Button
              onClick={handlePredict}
              disabled={loading || loadingModels || !selectedModel}
              className="transition-colors bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {loading ? "Running..." : "Generate Predictions"}
            </Button>
          </CardContent>
        </Card>

        {status && (
          <div
            className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
              status.type === "info"
                ? "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                : status.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {status.message}
          </div>
        )}

        {prediction && summary && (
          <>
            {/* evaluated period */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarRange className="h-4 w-4 text-cyan-600" />
              <span>
                Evaluated period:{" "}
                <span className="font-medium text-foreground">
                  {prediction.eval_period}
                </span>
              </span>
            </div>

            {/* metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {summary.rl_return_pct >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                  )}
                  RL Return
                </div>
                <div
                  className={`text-lg font-bold ${
                    summary.rl_return_pct >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }`}
                >
                  {formatPercent(summary.rl_return_pct)}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Buy &amp; Hold</div>
                <div className="text-lg font-bold">{formatPercent(summary.bh_return_pct)}</div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Alpha</div>
                <div
                  className={`text-lg font-bold ${
                    summary.alpha_margin >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }`}
                >
                  {formatPercent(summary.alpha_margin)}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Sharpe</div>
                <div className="text-lg font-bold">{summary.sharpe.toFixed(3)}</div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Max Drawdown</div>
                <div className="text-lg font-bold text-destructive">
                  {summary.max_drawdown_pct.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* graphs */}
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Portfolio Evolution</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Equity Curve</CardTitle>
                    <CardDescription>
                      Portfolio value over the evaluation window if the agent rebalanced at every step, vs. an equal-weight buy-and-hold basket of the same tickers.<br />
                      The dashed line marks the starting budget.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <LineChart data={equityData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          minTickGap={48}
                          tickFormatter={formatTick}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          width={64}
                          domain={["auto", "auto"]}
                          tickFormatter={(v) => formatDollar(Number(v))}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ReferenceLine
                          y={prediction.budget}
                          stroke="var(--color-border)"
                          strokeDasharray="3 3"
                        />
                        <Line
                          type="monotone"
                          dataKey="rl"
                          stroke="var(--color-rl)"
                          strokeWidth={2}
                          dot={false}
                          name="RL Agent"
                        />
                        <Line
                          type="monotone"
                          dataKey="bh"
                          stroke="var(--color-bh)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                          name="Buy & Hold"
                        />
                      </LineChart>
                    </ChartContainer>
                    <div className="flex items-center justify-center gap-4 pt-3">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: chartConfig.rl.color }} />
                        RL Agent
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: chartConfig.bh.color }} />
                        Buy &amp; Hold
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Drawdown</CardTitle>
                    <CardDescription>
                      Worst peak-to-trough decline for each strategy at every point in time. Closer to 0% means the strategy never fell far from its previous high.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <AreaChart data={drawdownData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          minTickGap={48}
                          tickFormatter={formatTick}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          domain={["auto", "auto"]}
                          tickFormatter={(v) => `${Number(v).toFixed(0)}%`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="rl"
                          stroke="var(--color-rl)"
                          fill="var(--color-rl)"
                          fillOpacity={0.12}
                          name="RL Drawdown"
                        />
                        <Area
                          type="monotone"
                          dataKey="bh"
                          stroke="var(--color-bh)"
                          fill="var(--color-bh)"
                          fillOpacity={0.12}
                          name="B&H Drawdown"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Allocation Breakdown</CardTitle>
                  <CardDescription>
                    The agent's final signals at the last evaluation date. A buy targets a dollar
                    position (capped at 40% of the budget); sells and holds target $0, so only buy
                    signals show a visible bar. Hover a bar for the indicators the agent observed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(["BUY", "HOLD", "SELL"] as const).map((action) => {
                      const tickers = actionGroups[action].map((a) => a.ticker);
                      const meta = ACTION_META[action];
                      return (
                        <Badge
                          key={action}
                          variant="outline"
                          className="gap-1.5 text-xs"
                          style={{
                            color: meta.color,
                            borderColor: meta.color,
                            backgroundColor: `${meta.color}1A`,
                          }}
                        >
                          <span className="font-semibold">{meta.label}:</span>
                          {tickers.length ? tickers.join(", ") : "none"}
                        </Badge>
                      );
                    })}
                  </div>
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <BarChart data={allocationData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="ticker" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={64}
                        tickFormatter={(v) => formatDollar(Number(v))}
                      />
                      <ChartTooltip content={<AllocationTooltip />} />
                      <Bar dataKey="value" name="Allocation" radius={4}>
                        {allocationData.map((d) => (
                          <Cell key={d.ticker} fill={ACTION_META[d.action].color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                  <div className="flex items-center justify-center gap-4 pt-3">
                    {(["BUY", "HOLD", "SELL"] as const).map((action) => (
                      <span
                        key={action}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span
                          className="h-2 w-2 rounded-[2px]"
                          style={{ backgroundColor: ACTION_META[action].color }}
                        />
                        {ACTION_META[action].label}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* quiz */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuitIcon className="h-5 w-5" />
                  Quiz: Read the Agent's Mind
                </CardTitle>
                <CardDescription>
                  Answer questions about the agent's decisions, then have an LLM review your analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.length === 0 ? (
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={startQuiz}
                      disabled={quizLoading}
                      variant="outline"
                    >
                      {quizLoading && (
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      )}
                      {quizLoading ? "Loading quiz..." : "Start Quiz"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Questions are generated from the agent's latest recommendations.
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-5">
                      {questions.map((q, i) => (
                        <div key={q.id} className="space-y-2">
                          <p className="text-sm font-medium">
                            {i + 1}. {q.question}
                          </p>
                          {q.context && (
                            <p className="text-xs text-muted-foreground font-mono">{q.context}</p>
                          )}
                          {q.type === "mcq" ? (
                            <div className="flex flex-wrap gap-2">
                              {q.options?.map((opt) => {
                                const selected = answers[q.id] === opt;
                                return (
                                  <Button
                                    key={opt}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                                    }
                                    className={cn(
                                      selected &&
                                        "border-cyan-600 bg-cyan-600/10 text-cyan-700 dark:text-cyan-300"
                                    )}
                                  >
                                    {opt}
                                  </Button>
                                );
                              })}
                            </div>
                          ) : (
                            <Textarea
                              rows={3}
                              placeholder="Type your analysis..."
                              value={answers[q.id] ?? ""}
                              onChange={(e) =>
                                setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={submitQuiz}
                        disabled={reviewing || answeredCount < questions.length}
                        className="bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50"
                      >
                        {reviewing && (
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}
                        {reviewing ? "Reviewing..." : "Submit for Review"}
                      </Button>
                      <Button variant="ghost" onClick={startQuiz} disabled={quizLoading}>
                        Reset
                      </Button>
                    </div>
                  </>
                )}

                {quizStatus && (
                  <div
                    className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
                      quizStatus.type === "error"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                    }`}
                  >
                    {quizStatus.message}
                  </div>
                )}

                {review && (
                  <div className="space-y-3">
                    {review.raw ? (
                      <p className="text-sm whitespace-pre-wrap">{review.raw}</p>
                    ) : (
                      <>
                        {typeof review.score === "number" && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              {review.score} / {review.total}
                            </span>
                            <Badge variant="secondary" className="gap-1">
                              <SparklesIcon className="h-3 w-3" />
                              LLM reviewed
                            </Badge>
                          </div>
                        )}

                        {review.reviews?.map((r) => {
                          const q = questions.find((qq) => qq.id === r.question_id);
                          return (
                            <div key={r.question_id} className="rounded-lg border p-3">
                              <div className="flex items-start gap-2">
                                {r.correct === true ? (
                                  <CircleCheckIcon className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                ) : r.correct === false ? (
                                  <CircleXIcon className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                                ) : (
                                  <SparklesIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground">
                                    {q?.question}
                                  </p>
                                  <p className="text-sm mt-1">{r.feedback}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {review.overall_feedback && (
                          <div className="rounded-lg border p-3 bg-muted/50">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Overall feedback
                            </p>
                            <p className="text-sm whitespace-pre-wrap">{review.overall_feedback}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
