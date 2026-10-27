import type { Language } from "@/types/finance";

/**
 * Language handling — same pattern as theme.ts.
 *
 * The current language lives on <html data-lang="..." lang="...">. A tiny
 * inline script applies the saved choice before first paint. Components read
 * and change it through `useI18n()`.
 */

export const LANGUAGE_STORAGE_KEY = "sales-companion-language";
export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem("${LANGUAGE_STORAGE_KEY}");if(l!=="en"&&l!=="th"){l="${DEFAULT_LANGUAGE}"}document.documentElement.dataset.lang=l;document.documentElement.lang=l}catch(e){}})();`;

const listeners = new Set<() => void>();

export function subscribeToLanguage(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLanguageSnapshot(): Language {
  return document.documentElement.dataset.lang === "th" ? "th" : "en";
}

export function getServerLanguageSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

export function applyLanguage(language: Language): void {
  const root = document.documentElement;
  root.dataset.lang = language;
  root.lang = language;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Storage can be unavailable (private mode). The language still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}
