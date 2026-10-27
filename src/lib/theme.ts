import type { Theme } from "@/types/finance";

/**
 * Theme handling.
 *
 * The current theme lives on <html data-theme="...">. A tiny inline script
 * (THEME_INIT_SCRIPT) applies the saved choice before the page paints, so
 * there is no flash of the wrong theme. React components read and change it
 * through `useTheme()`.
 */

export const THEME_STORAGE_KEY = "sales-companion-theme";
export const DEFAULT_THEME: Theme = "dark";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="${DEFAULT_THEME}"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`;

const listeners = new Set<() => void>();

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode). The theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}
