"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {theme === "dark" ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  );
}
