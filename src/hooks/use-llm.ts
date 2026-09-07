import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/data";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";

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

export const DEFAULT_LLM_PROVIDER = "ollama";
export const DEFAULT_LLM_MODEL = "0xroyce/plutus";

/** Humanize a byte size, e.g. 4_700_000_000 -> "4.4 GB". */
export function humanizeSize(bytes: number | null): string {
  if (bytes == null || Number.isNaN(bytes)) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export function useLlm() {
  const [providers, setProviders] = useState<LlmProviderInfo[]>([]);
  const [models, setModels] = useState<OllamaModelInfo[]>([]);
  const [activeProvider, setActiveProvider] = useState<string>(DEFAULT_LLM_PROVIDER);
  const [activeModel, setActiveModel] = useState<string>(DEFAULT_LLM_MODEL);
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const [provRes, modelRes] = await Promise.all([
        fetch(`${API_BASE_URL}/llm/providers`),
        fetch(`${API_BASE_URL}/llm/models?provider=${DEFAULT_LLM_PROVIDER}`),
      ]);

      if (provRes.ok) {
        const data = await provRes.json();
        setProviders(data.providers ?? []);
        if (data.active?.provider) setActiveProvider(data.active.provider);
        if (data.active?.model) setActiveModel(data.active.model);
      }

      if (modelRes.ok) {
        const data = await modelRes.json();
        setModels(data.models ?? []);
        setOllamaRunning(Boolean(data.ollama_running));
        if (data.current_model) setActiveModel(data.current_model);
      } else if (modelRes.status === 503) {
        const data = await modelRes.json().catch(() => null);
        setOllamaRunning(false);
        setModels([]);
        if (data?.detail) setError(data.detail);
      }
    } catch {
      setError("Could not reach the analysis backend. Is the app running its sidecar?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Persist + apply a provider/model selection. Returns an error message or null. */
  const setProviderModel = useCallback(
    async (provider: string, model: string): Promise<string | null> => {
      try {
        const res = await fetch(`${API_BASE_URL}/llm/model`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, model }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          return data?.detail ?? `Failed to switch model (HTTP ${res.status}).`;
        }
        await settingsRepo.set(SETTINGS_KEYS.llmProvider, provider);
        await settingsRepo.set(SETTINGS_KEYS.llmModel, model);
        setActiveProvider(provider);
        setActiveModel(model);
        return null;
      } catch (e: any) {
        return e?.message ?? "Failed to reach the backend.";
      }
    },
    []
  );

  return {
    providers,
    models,
    activeProvider,
    activeModel,
    ollamaRunning,
    loading,
    error,
    refresh,
    setProviderModel,
  };
}
