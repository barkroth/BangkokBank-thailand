"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, MessageSquarePlus, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { SuggestedPrompt } from "@/types/assistant";
import { useAssistantChat } from "@/context/assistant-context";
import { useI18n } from "@/hooks/use-i18n";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { AssistantFrame, ChatMessageView } from "@/components/assistant/ChatMessageView";
import { ChatComposer } from "@/components/assistant/ChatComposer";
import { SuggestedPrompts } from "@/components/assistant/SuggestedPrompts";

/**
 * Chat workspace: suggested prompts + safety notes on the left (desktop),
 * conversation on the right. The conversation scrolls inside its own panel.
 */
export function AssistantWorkspace() {
  const { messages, status, send, retry, clear } = useAssistantChat();
  const { t, text } = useI18n();
  const logRef = useRef<HTMLDivElement>(null);
  const busy = status === "loading";
  const isEmpty = messages.length === 0 && status === "idle";

  const selectPrompt = (prompt: SuggestedPrompt) => send(text(prompt.label), prompt.intent);

  // Keep the newest content in view: the start of a new reply, otherwise the bottom.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const last = messages[messages.length - 1];
    const lastEl = Array.from(log.querySelectorAll<HTMLElement>("[data-message]")).at(-1);
    const top = last?.role === "assistant" && status === "idle" && lastEl ? lastEl.offsetTop - 16 : log.scrollHeight;
    log.scrollTo({ top, behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="grid min-h-0 w-full flex-1 gap-5 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
      <aside className="hidden min-h-0 flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin lg:flex">
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-subtle">{t.assistant.suggestedTitle}</h2>
          <SuggestedPrompts variant="cards" onSelect={selectPrompt} disabled={busy} />
        </div>
        <div className="rounded-2xl border border-line bg-card px-4 py-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
            <ShieldCheck className="size-4 text-accent-ink" aria-hidden />
            {t.assistant.howTitle}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-muted marker:text-accent-ink">
            {t.assistant.howPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </aside>

      <section
        aria-label={t.assistant.conversation}
        className="flex h-[calc(100dvh-6rem)] min-h-112 flex-col sm:h-[calc(100dvh-20rem)] overflow-hidden rounded-3xl border border-line bg-card shadow-card lg:h-auto lg:min-h-0"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
            <Sparkles className="size-4 text-accent-ink" aria-hidden />
            {t.assistant.conversation}
            <DemoBadge tone="neutral" className="ml-1">
              {t.assistant.demoMode}
            </DemoBadge>
          </h2>
          <button
            type="button"
            onClick={clear}
            disabled={isEmpty}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <MessageSquarePlus className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t.assistant.newConversation}</span>
            <span className="sr-only sm:hidden">{t.assistant.newConversation}</span>
          </button>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-busy={busy}
          className="relative min-h-0 flex-1 overflow-y-auto bg-surface-2/50 px-3 py-4 sm:px-5"
        >
          {isEmpty ? (
            <div className="flex min-h-full flex-col items-center justify-center py-4 text-center">
              <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent-soft text-accent-ink">
                <Sparkles className="size-6" aria-hidden />
              </span>
              <p className="font-display text-2xl font-semibold text-fg">{t.assistant.emptyTitle}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{t.assistant.emptyBody}</p>
              <SuggestedPrompts variant="cards" onSelect={selectPrompt} className="mt-6 w-full max-w-2xl sm:grid-cols-2 lg:hidden" />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} data-message>
                  <ChatMessageView message={message} />
                </div>
              ))}

              {busy && (
                <AssistantFrame className="w-fit flex-none">
                  <span className="flex items-center gap-1.5 py-1" aria-hidden>
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="size-2 rounded-full bg-accent motion-safe:animate-pulse"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                  <span className="sr-only">{t.assistant.loading}</span>
                </AssistantFrame>
              )}

              {status === "error" && (
                <AssistantFrame className="border-danger/30">
                  <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <CircleAlert className="size-4 text-danger" aria-hidden />
                    {t.assistant.errorTitle}
                  </p>
                  <p className="text-sm text-muted">{t.assistant.errorBody}</p>
                  <button
                    type="button"
                    onClick={retry}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <RotateCcw className="size-4" aria-hidden />
                    {t.assistant.retry}
                  </button>
                </AssistantFrame>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-line bg-card p-3 sm:p-4">
          {!isEmpty && <SuggestedPrompts variant="chips" onSelect={selectPrompt} disabled={busy} className="mb-3 lg:hidden" />}
          <ChatComposer onSend={(value) => send(value)} busy={busy} />
        </div>
      </section>
    </div>
  );
}
