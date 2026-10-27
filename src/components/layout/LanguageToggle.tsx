"use client";

import { Globe } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

/** Switches between English and Thai. The label shows the language you will switch TO. */
export function LanguageToggle() {
  const { t, toggleLanguage } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.header.switchLanguage}
      title={t.header.switchLanguage}
      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-sm font-semibold text-muted transition-colors hover:border-accent/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Globe className="size-4" aria-hidden />
      {t.header.languageButton}
    </button>
  );
}
