import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
        <span className={cn("h-px w-8 bg-gold/70", align === "center" && "hidden")} aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
