import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { API_BASE_URL, TICKER_OPTIONS } from "@/lib/data";
import { modelsRepo } from "@/lib/db/model";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

function generateName() {
  return `ppo_trading_model_${Date.now()}`
}

export const TrainModel = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [modelName, setModelName] = useState("");
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [openTickerSelect, setOpenTickerSelect] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function toggleTicker(tickerValue: string) {
    // ToDo: backend needs to be able to better handle multiple tickers
    // setSelectedTickers((prev) =>
    //   prev.includes(tickerValue)
    //     ? prev.filter((t) => t !== tickerValue)
    //     : [...prev, tickerValue]
    // );
    setSelectedTickers([tickerValue]);
  }

  async function handleTrain(e: React.SubmitEvent) {
    e.preventDefault();
    if (loading) return;

    const finalModelName = modelName.trim().length === 0 ? generateName() : modelName.trim();

    try {
      const isDuplicate = await modelsRepo.existsByName(finalModelName);
      if (isDuplicate) {
        setStatus({
          type: "error",
          message: `A model named "${finalModelName}" already exists. Please choose a unique model name.`,
        });
        return;
      }
    } catch (err) {
      console.error("Failed to check duplicate model name", err);
    }

    if (selectedTickers.length === 0) {
      setStatus({
        type: "error",
        message: "Please select at least one ticker before starting training.",
      });
      return;
    }

    setLoading(true);
    setStatus({
      type: "info",
      message: "Initiating model training... This may take a few minutes.",
    });

    try {
      const payload = {
        model_name: finalModelName,
        tickers: selectedTickers,
        train_start: startDate,
        train_end: endDate,
      };

      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const validTickersStr = Array.isArray(data.valid_tickers)
          ? data.valid_tickers.join(", ")
          : selectedTickers.join(", ");

        await modelsRepo.create({
          model_name: finalModelName,
          tickers: validTickersStr,
          start_date: startDate,
          end_date: endDate,
        });

        setStatus({
          type: "success",
          message: `${data.message || "Training complete!"}\nModel: ${finalModelName}\nValid Tickers: ${validTickersStr}`,
        });
      } else {
        throw new Error(data.detail || "Unknown backend error");
      }
    } catch (e: any) {
      console.error("Training failed", e);
      setStatus({
        type: "error",
        message: `Training failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Train New Agent</CardTitle>
        <CardDescription>
          Specify parameters to trigger a new PPO training execution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrain} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              placeholder="e.g. PPO_v1_AAPL"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tickers Selection<span className="text-red-500">*</span></Label>
            <Popover open={openTickerSelect} onOpenChange={setOpenTickerSelect}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTickerSelect}
                  className="w-full justify-between h-auto min-h-10 py-2 px-3 text-left font-normal"
                >
                  {selectedTickers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {selectedTickers.map((ticker) => (
                        <Badge
                          key={ticker}
                          variant="secondary"
                          className="text-xs font-mono flex items-center gap-1 pr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTicker(ticker);
                          }}
                        >
                          {ticker}
                          <X className="h-3 w-3 hover:text-destructive cursor-pointer" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select ticker(s)...</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search ticker..." />
                  <CommandList>
                    <CommandEmpty>No ticker found.</CommandEmpty>
                    <CommandGroup>
                      {TICKER_OPTIONS.map((option) => {
                        const isSelected = selectedTickers.includes(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => toggleTicker(option.value)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Training..." : "Start Training"}
          </Button>
        </form>

        {status && (
          <div
            className={`mt-4 p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
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
      </CardContent>
    </Card>
  )
}
