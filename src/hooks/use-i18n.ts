"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Language, Localized } from "@/types/finance";
import { MESSAGES } from "@/i18n/messages";
import { applyLanguage, getLanguageSnapshot, getServerLanguageSnapshot, subscribeToLanguage } from "@/lib/language";

/** Current language, interface text (`t`) and a helper for localized data (`text`). */
export function useI18n() {
  const lang = useSyncExternalStore(subscribeToLanguage, getLanguageSnapshot, getServerLanguageSnapshot);

  const toggleLanguage = useCallback(() => {
    applyLanguage(getLanguageSnapshot() === "en" ? "th" : "en");
  }, []);

  const text = useCallback((value: Localized) => value[lang], [lang]);

  return { lang: lang as Language, t: MESSAGES[lang], text, toggleLanguage };
}
