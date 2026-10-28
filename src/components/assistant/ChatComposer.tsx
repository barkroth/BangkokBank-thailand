"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";

const MAX_LENGTH = 1000;
const MAX_HEIGHT_PX = 160;

interface ChatComposerProps {
  onSend: (text: string) => void;
  /** True while a reply is pending: typing stays possible, sending does not. */
  busy: boolean;
}

export function ChatComposer({ onSend, busy }: ChatComposerProps) {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !busy;

  // Grow with the content up to a few lines, then scroll inside the field.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, [value]);

  const submit = () => {
    if (!canSend) return;
    onSend(value);
    setValue("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // isComposing: don't submit while a Thai/IME candidate is still being chosen.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-end gap-2 rounded-2xl border border-line-strong bg-surface p-1.5 transition-colors focus-within:border-accent/70">
        <label htmlFor="assistant-input" className="sr-only">
          {t.assistant.inputLabel}
        </label>
        <textarea
          id="assistant-input"
          ref={inputRef}
          rows={1}
          value={value}
          maxLength={MAX_LENGTH}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.assistant.placeholder}
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-relaxed text-fg placeholder:text-subtle focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label={t.assistant.send}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            canSend ? "bg-primary text-primary-fg hover:bg-primary-hover" : "bg-card-2 text-subtle",
          )}
        >
          <SendHorizontal className="size-5" aria-hidden />
        </button>
      </div>
      <p className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 px-1 text-xs text-subtle">
        <span>{t.assistant.privacyHint}</span>
        <span className="hidden sm:inline">{t.assistant.keyboardHint}</span>
      </p>
    </form>
  );
}
