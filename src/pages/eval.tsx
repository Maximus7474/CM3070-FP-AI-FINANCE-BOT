import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/lib/data";
import { modelsRepo, TrainedModel } from "@/lib/db/model";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Activity, ShieldAlert, Award } from "lucide-react";

interface Allocation {
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

interface BacktestSummary {
  rl_return_pct: number;
  bh_return_pct: number;
  alpha_margin: number;
  sharpe: number;
  max_drawdown_pct: number;
}

interface EvaluationResult {
  budget: number;
  cash_remaining: number;
  eval_period: string;
  backtest_summary: BacktestSummary;
  allocations: Allocation[];
}

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Evaluation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [models, setModels] = useState<TrainedModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

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

  async function handleEvaluate() {
    if (loading) return;

    if (!selectedModel) {
      setStatus({
        type: "error",
        message: "Please select a model to evaluate.",
      });
      return;
    }

    const modelObj = models.find((m) => m.model_name === selectedModel);
    const tickersList = modelObj?.tickers
      ? modelObj.tickers.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    setLoading(true);
    setStatus({ type: "info", message: `Evaluating model "${selectedModel}"...` });

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: selectedModel,
          tickers: tickersList,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setEvalResult(data.data);
        setStatus({
          type: "success",
          message: `Evaluation Complete!\nRecommendations saved to:\n${data.json_path}`,
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Evaluation failed", e);
      setStatus({
        type: "error",
        message: `Evaluation failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <ScrollArea className="min-h-0 px-3">
      <div className="space-y-6 container mx-auto pb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Evaluate Model
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Run the model against historical timeframes to generate backtest metrics and recommendations.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="model-select">Select Trained Model</Label>
            <Select
              value={selectedModel}
              onValueChange={(value) => setSelectedModel(value ?? models[0]?.model_name)}
              disabled={loadingModels || loading || models.length === 0}
            >
              <SelectTrigger id="model-select" className="w-full">
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
                      <span className="text-xs text-muted-foreground">
                        ({m.tickers})
                      </span>
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
            onClick={handleEvaluate}
            disabled={loading || loadingModels || !selectedModel}
            className="transition-colors bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Processing..." : "Generate Recommendations"}
          </Button>
        </div>

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

        {evalResult && (
          <div className="space-y-6 mt-6">
            {/* OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Evaluation Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${evalResult.budget.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cash Remaining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${evalResult.cash_remaining.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Evaluation Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-mono">{evalResult.eval_period}</div>
                </CardContent>
              </Card>
            </div>

            {/* BACKTEST PERFORMANCE METRICS */}
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">
                Backtest Performance Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      RL Model Return
                    </CardTitle>
                    {evalResult.backtest_summary.rl_return_pct >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-xl font-bold ${
                        evalResult.backtest_summary.rl_return_pct >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }`}
                    >
                      {evalResult.backtest_summary.rl_return_pct >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.rl_return_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Benchmark (B&H)
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {evalResult.backtest_summary.bh_return_pct >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.bh_return_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Alpha Margin
                    </CardTitle>
                    <Award className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-xl font-bold ${
                        evalResult.backtest_summary.alpha_margin >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }`}
                    >
                      {evalResult.backtest_summary.alpha_margin >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.alpha_margin.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Sharpe Ratio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {evalResult.backtest_summary.sharpe.toFixed(3)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Max Drawdown
                    </CardTitle>
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-destructive">
                      {evalResult.backtest_summary.max_drawdown_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* RECOMMENDED ALLOCATIONS TABLE */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Allocations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>% Budget</TableHead>
                      <TableHead>RSI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evalResult.allocations.map((alloc) => (
                      <TableRow key={alloc.ticker}>
                        <TableCell className="font-bold">{alloc.ticker}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alloc.action === "BUY"
                                ? "default"
                                : alloc.action === "SELL"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {alloc.action}
                          </Badge>
                        </TableCell>
                        <TableCell>${alloc.price.toFixed(2)}</TableCell>
                        <TableCell>{alloc.shares}</TableCell>
                        <TableCell>${alloc.dollar_value.toLocaleString()}</TableCell>
                        <TableCell>{alloc.pct_of_budget}%</TableCell>
                        <TableCell>{alloc.rsi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
