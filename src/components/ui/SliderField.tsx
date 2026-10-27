"use client";

import { useId, useState, type CSSProperties } from "react";
import { CircleAlert } from "lucide-react";
import type { NumericRange } from "@/types/finance";
import { parseNumericInput } from "@/lib/format";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";

interface SliderFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  range: NumericRange;
  quickPicks: number[];
  /** Text shown on quick-pick buttons, e.g. "฿500K" or "36 mo". */
  formatQuickPick: (value: number) => string;
  /** Text shown in the number box when it is not being edited. */
  formatInputValue: (value: number) => string;
  /** Labels shown under the slider ends. */
  formatRangeLabel: (value: number) => string;
  prefix?: string;
  suffix?: string;
  error?: string;
  hint?: string;
  inputMode?: "numeric" | "decimal";
  large?: boolean;
}

/**
 * A slider, a number box and quick-pick buttons that all edit the same value.
 * The number box keeps its own text while typing so partial input like "1,2"
 * doesn't jump around; the parent always receives a parsed number (or null).
 */
export function SliderField({
  label,
  value,
  onChange,
  range,
  quickPicks,
  formatQuickPick,
  formatInputValue,
  formatRangeLabel,
  prefix,
  suffix,
  error,
  hint,
  inputMode = "numeric",
  large = false,
}: SliderFieldProps) {
  const { t } = useI18n();
  const id = useId();
  const inputId = `${id}-input`;
  const messageId = `${id}-message`;
  const [draft, setDraft] = useState<string | null>(null);

  const sliderValue = Math.min(range.max, Math.max(range.min, value ?? range.min));
  const fill = ((sliderValue - range.min) / (range.max - range.min)) * 100;
  const displayValue = draft ?? (value === null ? "" : formatInputValue(value));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label htmlFor={inputId} className={cn("font-semibold text-fg", large ? "text-lg" : "text-sm")}>
          {label}
        </label>
        <div
          className={cn(
            "flex items-center rounded-xl border bg-surface-2 transition-colors focus-within:border-accent",
            error ? "border-danger/70" : "border-line-strong",
            large ? "h-14 px-4" : "h-11 px-3",
          )}
        >
          {prefix && <span className={cn("mr-1 text-muted", large ? "text-xl" : "text-sm")}>{prefix}</span>}
          <input
            id={inputId}
            type="text"
            inputMode={inputMode}
            autoComplete="off"
            value={displayValue}
            aria-invalid={Boolean(error)}
            aria-describedby={error || hint ? messageId : undefined}
            onFocus={(event) => {
              setDraft(value === null ? "" : String(value));
              event.target.select();
            }}
            onChange={(event) => {
              setDraft(event.target.value);
              onChange(parseNumericInput(event.target.value));
            }}
            onBlur={() => setDraft(null)}
            className={cn(
              "w-28 bg-transparent text-right font-semibold tabular-nums text-fg outline-none sm:w-32",
              large ? "text-2xl" : "text-base",
            )}
          />
          {suffix && <span className={cn("ml-1.5 text-muted", large ? "text-lg" : "text-sm")}>{suffix}</span>}
        </div>
      </div>

      <div>
        <input
          type="range"
          aria-label={t.calculator.sliderLabel(label)}
          min={range.min}
          max={range.max}
          step={range.step}
          value={sliderValue}
          onChange={(event) => onChange(Number(event.target.value))}
          className={cn("range", large && "range-lg")}
          style={{ "--fill": `${fill}%` } as CSSProperties}
        />
        <div className="flex justify-between text-xs text-subtle tabular-nums">
          <span>{formatRangeLabel(range.min)}</span>
          <span>{formatRangeLabel(range.max)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={t.calculator.quickSelect(label)}>
        {quickPicks.map((pick) => {
          const active = value === pick;
          return (
            <button
              key={pick}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(pick)}
              className={cn(
                "rounded-full border font-semibold tabular-nums transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                large ? "min-h-13 px-5 text-base" : "min-h-10 px-3.5 text-sm",
                active
                  ? "border-accent bg-accent-soft text-accent-ink"
                  : "border-line-strong text-muted hover:border-accent/50 hover:text-fg",
              )}
            >
              {formatQuickPick(pick)}
            </button>
          );
        })}
      </div>

      {(error || hint) && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={cn("flex items-start gap-1.5 text-sm", error ? "text-danger" : "text-subtle")}
        >
          {error && <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />}
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
