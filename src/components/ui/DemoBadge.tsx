import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

interface DemoBadgeProps {
  children: ReactNode;
  tone?: "gold" | "neutral" | "blue";
  className?: string;
}

const tones = {
  gold: "border-gold/40 bg-gold-soft text-gold-ink",
  neutral: "border-line-strong bg-card-2 text-muted",
  blue: "border-blue/30 bg-blue-soft text-blue-ink",
};

/** Small pill used to label demo / illustrative / prototype content. */
export function DemoBadge({ children, tone = "gold", className }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
