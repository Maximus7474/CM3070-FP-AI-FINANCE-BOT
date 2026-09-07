import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { humanizeSize, useLlm } from "@/hooks/use-llm";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export const MainSettings = () => {
  const {
    providers,
    models,
    activeProvider,
    activeModel,
    ollamaRunning,
    loading,
    error,
    refresh,
    setProviderModel,
  } = useLlm();

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  const availableProviders = providers.filter((p) => p.available);
  const comingSoonProviders = providers.filter((p) => !p.available);
  const activeProviderInfo = providers.find((p) => p.id === activeProvider);

  async function handleProviderChange(providerId: string | null) {
    if (!providerId || providerId === activeProvider) return;
    const info = providers.find((p) => p.id === providerId);
    if (!info?.available) {
      setStatus({
        type: "info",
        message: info?.setup_hint || "This provider is not available yet.",
      });
      return;
    }
    setStatus({
      type: "info",
      message: `Switching provider to ${info.name}. Pick a model to apply it.`,
    });
    await refresh();
  }

  async function handleModelChange(modelName: string | null) {
    if (saving || !modelName) return;
    if (modelName === activeModel) return;
    setSaving(true);
    setStatus({ type: "info", message: `Switching model to ${modelName}...` });
    const err = await setProviderModel(activeProvider, modelName);
    if (err) {
      setStatus({ type: "error", message: err });
    } else {
      setStatus({
        type: "success",
        message: `Model switched to ${modelName}. New chats will use it immediately.`,
      });
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            LLM Provider
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={loading}
              title="Reload providers and downloaded models"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Choose which AI provider and model powers chat and recommendation
            explanations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="llm-provider">Provider</Label>
            <Select
              value={activeProvider}
              onValueChange={handleProviderChange}
              disabled={loading || availableProviders.length === 0}
            >
              <SelectTrigger id="llm-provider" className="w-full">
                <SelectValue placeholder={loading ? "Loading..." : "Select a provider"} />
              </SelectTrigger>
              <SelectContent>
                {availableProviders.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{p.name}</span>
                      {p.id === activeProvider && (
                        <span className="text-xs text-muted-foreground">active</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
                {comingSoonProviders.map((p) => (
                  <SelectItem key={p.id} value={p.id} disabled>
                    <div className="flex items-center justify-between gap-4">
                      <span>{p.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        Coming soon
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeProviderInfo && !activeProviderInfo.available && (
              <p className="text-xs text-muted-foreground">{activeProviderInfo.setup_hint}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="llm-model">Model</Label>
            <Select
              value={activeModel}
              onValueChange={handleModelChange}
              disabled={loading || saving || !ollamaRunning || models.length === 0}
            >
              <SelectTrigger id="llm-model" className="w-full">
                <SelectValue
                  placeholder={
                    loading
                      ? "Loading models..."
                      : !ollamaRunning
                      ? "Ollama is not running"
                      : models.length === 0
                      ? "No models downloaded"
                      : "Select a model"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.name} value={m.name}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {[
                          m.parameter_size,
                          m.quantization_level,
                          humanizeSize(m.size),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {models.length === 0 && !loading && (
              <p className="text-xs text-destructive">
                No models downloaded yet, see the instructions below.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${
                ollamaRunning ? "bg-emerald-500" : "bg-destructive"
              }`}
            />
            {ollamaRunning
              ? "Ollama server is running (localhost:11434)"
              : "Ollama server is not reachable, start Ollama and refresh"}
          </div>

          {error && (
            <div className="p-4 rounded-lg border text-sm bg-destructive/10 text-destructive border-destructive/20 whitespace-pre-wrap">
              {error}
            </div>
          )}

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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Downloading more models</CardTitle>
          <CardDescription>
            Add models from the Ollama library, then pick them above.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Browse available models at{" "}
              <a
                href="https://ollama.com/library"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2"
              >
                ollama.com/library
              </a>
              .
            </li>
            <li>
              Open a terminal and pull the one you want:
              <pre className="mt-1 rounded bg-muted px-3 py-2 text-xs text-foreground overflow-x-auto">
                ollama pull {"<model-name>"}
              </pre>
            </li>
            <li>Click the refresh button above, the new model appears in the list.</li>
          </ol>
          <p>
            The default model is{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
              0xroyce/plutus
            </code>
            . Models stay on disk until removed with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
              ollama rm {"<model-name>"}
            </code>
            .
          </p>
          <p>
            Support for hosted providers such as OpenAI (ChatGPT) and Anthropic
            (Claude) is planned for a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
