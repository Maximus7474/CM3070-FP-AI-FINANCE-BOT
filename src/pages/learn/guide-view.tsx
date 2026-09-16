import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Lightbulb,
  ListChecks,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMarkdown } from "@/components/chat-markdown";
import { cn } from "@/lib/utils";
import { guidesRepo } from "@/lib/db/learn";
import { TopicSuggestions, generateGuideApi } from "./learn";
import { Guide } from "@/types";

interface GuideTabProps {
  guides: Guide[];
  onRefresh: () => Promise<void>;
}

export function GuideTab({ guides, onRefresh }: GuideTabProps) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  async function handleGenerate(t: string) {
    const trimmed = t.trim();
    if (!trimmed || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const guide = await generateGuideApi(trimmed);
      const saved = await guidesRepo.create({
        topic: trimmed,
        title: guide.title,
        summary: guide.summary,
        steps: guide.steps,
        keyTakeaways: guide.key_takeaways ?? [],
        sources: guide.sources ?? [],
        grounded: !!guide.grounded,
      });
      setActiveGuide(saved);
      await onRefresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate the guide.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id: string) {
    await guidesRepo.delete(id);
    setActiveGuide((g) => (g && g.id === id ? null : g));
    await onRefresh();
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Topic input row */}
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate(topic)}
          placeholder="Enter a topic to learn, e.g. RSI or dollar-cost averaging..."
          disabled={generating}
          className="flex-1"
        />
        <Button onClick={() => handleGenerate(topic)} disabled={generating || !topic.trim()}>
          {generating ? (
            <Loader2 className="size-4 animate-spin mr-1.5" />
          ) : (
            <Sparkles className="size-4 mr-1.5" />
          )}
          {generating ? "Generating..." : "Generate guide"}
        </Button>
      </div>

      <TopicSuggestions onPick={(t) => { setTopic(t); handleGenerate(t); }} />

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        {/* Reader / placeholder */}
        <div className="min-w-0">
          {generating && <GeneratingNotice />}
          {!generating && activeGuide && <GuideReader guide={activeGuide} />}
          {!generating && !activeGuide && (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              <BookOpen className="mx-auto size-8 opacity-40 mb-2" />
              Pick a topic above and the guide will appear here —
              grounded in Wikipedia sources and taught step by step.
            </div>
          )}
        </div>

        {/* Library */}
        <GuideLibrary
          guides={guides}
          activeId={activeGuide?.id ?? null}
          onOpen={(g) => setActiveGuide(g)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

function GeneratingNotice() {
  return (
    <div className="rounded-lg border p-6 space-y-2" aria-busy="true">
      <p className="text-sm font-medium flex items-center gap-2">
        <Loader2 className="size-4 animate-spin" /> Fetching reference material and
        writing your guide...
      </p>
      <p className="text-xs text-muted-foreground">
        Large local models can take a minute or two on the first run.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stepper reader
// ---------------------------------------------------------------------------

function GuideReader({ guide }: { guide: Guide }) {
  const [stepIndex, setStepIndex] = useState(0);
  const total = guide.steps.length;

  const next = useCallback(
    () => setStepIndex((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  // Keyboard navigation: <- / -> moves between steps.
  const handleKey = useRef<(e: KeyboardEvent) => void>(() => {});
  handleKey.current = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => handleKey.current(e);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Reset to the first step when switching guides.
  useEffect(() => {
    setStepIndex(0);
  }, [guide.id]);

  const isLast = stepIndex === total - 1;
  const pct = total > 1 ? (stepIndex / (total - 1)) * 100 : 100;
  const grounded = guide.grounded;
  const sources = guide.sources ?? [];

  return (
    <article className="rounded-lg border p-5">
      {/* Header */}
      <header className="mb-4">
        <h3 className="text-xl font-semibold leading-tight">{guide.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{guide.summary}</p>
        {!grounded && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <TriangleAlert className="size-3.5" />
            Reference sources could not be fetched — this guide relies on the
            model's own knowledge, so double-check specific figures.
          </p>
        )}
      </header>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>
            Step {stepIndex + 1} of {total}
          </span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Step rail + content */}
      <div className="flex gap-4">
        <ol className="flex flex-col gap-1 shrink-0 w-36" aria-label="Guide steps">
          {guide.steps.map((s, i) => {
            const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setStepIndex(i)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors cursor-pointer",
                    state === "current"
                      ? "bg-primary text-primary-foreground font-medium"
                      : state === "done"
                        ? "text-muted-foreground hover:bg-accent"
                        : "text-muted-foreground/60 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                      state === "done"
                        ? "border-primary/40 text-primary"
                        : state === "current"
                          ? "border-primary-foreground/40"
                          : "border-border"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0 flex-1 rounded-md bg-muted/40 p-4">
          <h4 className="font-semibold text-sm mb-2">
            {stepIndex + 1}. {guide.steps[stepIndex].title}
          </h4>
          <ChatMarkdown content={guide.steps[stepIndex].content} className="text-sm" />
        </div>
      </div>

      {/* Prev / Next */}
      <div className="mt-4 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prev} disabled={stepIndex === 0}>
          <ChevronLeft className="size-4 mr-1" /> Previous
        </Button>
        {isLast ? (
          <Button size="sm" onClick={() => setStepIndex(0)}>
            <RefreshCw className="size-4 mr-1" /> Start over
          </Button>
        ) : (
          <Button size="sm" onClick={next}>
            Next <ChevronRight className="size-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Key takeaways */}
      {guide.keyTakeaways.length > 0 && (
        <section className="mt-5 rounded-md border border-primary/25 bg-primary/5 p-4">
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
            <Lightbulb className="size-4" /> Key takeaways
          </h4>
          <ul className="space-y-1 text-sm">
            {guide.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-2">
                <ListChecks className="size-4 mt-0.5 shrink-0 text-primary/70" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <section className="mt-4">
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
            <Globe className="size-4" /> Sources
          </h4>
          <ul className="space-y-1">
            {sources.map((s, i) => (
              <li key={i} className="text-xs">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 inline-flex items-center gap-1"
                >
                  [{i + 1}] {s.title} <ExternalLink className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Library sidebar
// ---------------------------------------------------------------------------

function GuideLibrary({
  guides,
  activeId,
  onOpen,
  onDelete,
}: {
  guides: Guide[];
  activeId: string | null;
  onOpen: (g: Guide) => void;
  onDelete: (id: string) => Promise<void>;
}) {
  if (guides.length === 0) {
    return (
      <aside className="rounded-lg border p-4 text-xs text-muted-foreground h-fit">
        <h4 className="font-medium text-foreground mb-1">Your guides</h4>
        Guides you generate are saved here for quick access.
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border h-fit">
      <h4 className="font-medium text-sm px-3 pt-3 pb-1">Your guides</h4>
      <ScrollArea className="max-h-[420px]">
        <ul className="p-1.5 space-y-0.5">
          {guides.map((g) => (
            <li
              key={g.id}
              className={cn(
                "group flex items-center gap-1 rounded-md text-xs",
                g.id === activeId && "bg-accent"
              )}
            >
              <button
                type="button"
                onClick={() => onOpen(g)}
                className="flex-1 text-left px-2 py-1.5 min-w-0 cursor-pointer"
              >
                <span className="block truncate font-medium">{g.title}</span>
                <span className="block truncate text-muted-foreground">
                  {g.topic} · {g.steps.length} steps
                </span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(g.id)}
                title="Delete guide"
                className="mr-1 flex size-6 items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
