"use client";

import { Calculator, CalendarCheck, FileText, Lightbulb, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import type { SuggestedPrompt } from "@/types/assistant";
import { SUGGESTED_PROMPTS } from "@/data/assistant-prompts";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";

const ICONS: Record<string, LucideIcon> = {
  meeting: CalendarCheck,
  compare: Scale,
  insurance: ShieldCheck,
  documents: FileText,
  "cross-sell": Lightbulb,
  "open-calculator": Calculator,
};

interface SuggestedPromptsProps {
  /** cards = stacked tiles (sidebar / empty state); chips = one scrollable row (above the composer). */
  variant: "cards" | "chips";
  onSelect: (prompt: SuggestedPrompt) => void;
  disabled?: boolean;
  className?: string;
}

export function SuggestedPrompts({ variant, onSelect, disabled = false, className }: SuggestedPromptsProps) {
  const { text } = useI18n();

  if (variant === "chips") {
    return (
      <ul className={cn("-mx-1 flex gap-2 overflow-x-auto px-1 pb-1", className)}>
        {SUGGESTED_PROMPTS.map((prompt) => (
          <li key={prompt.id} className="shrink-0">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(prompt)}
              className="min-h-10 rounded-full border border-line-strong bg-card px-4 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:border-accent/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
            >
              {text(prompt.label)}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-2", className)}>
      {SUGGESTED_PROMPTS.map((prompt) => {
        const Icon = ICONS[prompt.id] ?? Lightbulb;
        return (
          <li key={prompt.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(prompt)}
              className="group flex min-h-12 w-full items-center gap-3 rounded-2xl border border-line bg-card px-3 py-2 text-left text-sm font-medium text-fg shadow-card transition-all duration-200 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="leading-snug">{text(prompt.label)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
