"use client";

import { ArrowRight, Calculator } from "lucide-react";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { cn, scrollToSection } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function Hero() {
  const { isPresenting } = usePresentation();
  const { t } = useI18n();

  return (
    <section id="top" className={cn("on-navy relative overflow-hidden bg-brand", isPresenting ? "pt-20" : "pt-18")}>
      {/* One soft glow for depth — kept subtle on purpose */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-225 max-w-[160vw] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <Container
        className={cn(
          "relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]",
          isPresenting ? "pt-10 pb-2 sm:pt-14" : "pt-14 pb-10 sm:pt-24 sm:pb-16",
        )}
      >
        <div className="animate-fade-up">
          <DemoBadge>{t.hero.badge}</DemoBadge>
          <h1
            className={cn(
              "mt-6 font-display font-semibold leading-[1.05] tracking-tight text-fg",
              isPresenting ? "text-5xl sm:text-6xl" : "text-5xl sm:text-7xl lg:text-[5.5rem]",
            )}
          >
            {t.hero.headingStart} <span className="italic text-accent-ink">{t.hero.headingEmphasis}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.hero.support}</p>
          {!isPresenting && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => scrollToSection("calculator")}>
                <Calculator className="size-5" aria-hidden />
                {t.hero.ctaStart}
              </Button>
              <Button size="lg" variant="secondary" onClick={() => scrollToSection("products")}>
                {t.hero.ctaExplore}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          )}
        </div>

        {!isPresenting && (
          <div
            className="animate-fade-up rounded-3xl border border-line bg-card p-6 shadow-card sm:p-8"
            style={{ animationDelay: "120ms" }}
          >
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-subtle">{t.hero.outlineTitle}</h2>
            <ol>
              {t.hero.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 border-t border-line py-5 last:pb-0">
                  <span className="font-display text-3xl font-semibold leading-none text-accent-ink tabular-nums" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-semibold text-fg">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </section>
  );
}
