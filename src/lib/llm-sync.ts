import { API_BASE_URL } from "@/lib/data";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";
import { DEFAULT_LLM_MODEL, DEFAULT_LLM_PROVIDER } from "@/hooks/use-llm";

/**
 * On app launch, re-apply the user's saved LLM provider/model to the
 * backend. The backend keeps its active selection in memory, so this
 * covers sidecar restarts that would otherwise reset it to the default.
 *
 * Fire-and-forget: failures are logged and never block app startup.
 */
export async function syncLlmSettingsOnLaunch(): Promise<void> {
  try {
    const [provider, model] = await Promise.all([
      settingsRepo.get(SETTINGS_KEYS.llmProvider),
      settingsRepo.get(SETTINGS_KEYS.llmModel),
    ]);

    if (!model) return; // nothing saved yet -> keep backend defaults

    const activeRes = await fetch(`${API_BASE_URL}/llm/providers`);
    if (!activeRes.ok) return;
    const activeData = await activeRes.json();
    const activeProvider = activeData?.active?.provider ?? DEFAULT_LLM_PROVIDER;
    const activeModel = activeData?.active?.model ?? DEFAULT_LLM_MODEL;

    const savedProvider = provider ?? DEFAULT_LLM_PROVIDER;
    if (savedProvider === activeProvider && model === activeModel) return;

    const res = await fetch(`${API_BASE_URL}/llm/model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: savedProvider, model }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      console.warn(
        "Saved LLM model could not be re-applied:",
        data?.detail ?? res.status
      );
    }
  } catch (e) {
    console.warn("LLM settings sync skipped:", e);
  }
}
