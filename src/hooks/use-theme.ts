"use client";

import { useCallback, useSyncExternalStore } from "react";
import { applyTheme, getServerThemeSnapshot, getThemeSnapshot, subscribeToTheme } from "@/lib/theme";

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleTheme = useCallback(() => {
    applyTheme(getThemeSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggleTheme };
}
