"use client";

import { Check, Info, ShieldCheck, Umbrella } from "lucide-react";
import type { InsuranceOptionId } from "@/types/finance";
import { INSURANCE_OPTIONS } from "@/data/insurance-options";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface InsuranceSectionProps {
  selectedId: InsuranceOptionId;
  onAddToCalculation: (id: InsuranceOptionId) => void;
}

export function InsuranceSection({ selectedId, onAddToCalculation }: InsuranceSectionProps) {
  const { t, text } = useI18n();
  const plans = INSURANCE_OPTIONS.filter((option) => option.id !== "none");

  return (
    <section id="insurance" className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow={t.insurance.eyebrow} title={t.insurance.title} description={t.insurance.description} />
            <ul className="mt-8 space-y-4">
              {t.insurance.keyPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <Info className="mt-0.5 size-5 shrink-0 text-blue-ink" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {plans.map((plan, index) => {
              const selected = plan.id === selectedId;
              const Icon = index === 0 ? ShieldCheck : Umbrella;
              return (
                <article
                  key={plan.id}
                  className={cn(
                    "flex flex-col rounded-3xl border bg-card p-6 shadow-card transition-colors duration-300",
                    selected ? "border-accent/70" : "border-line",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-soft text-blue-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <DemoBadge tone="neutral">{t.common.demoPlan}</DemoBadge>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{text(plan.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text(plan.shortDescription)}</p>

                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {plan.coverage.map((item) => (
                      <li key={item.en} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
                        {text(item)}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm text-subtle">
                    {t.insurance.demoPremium}{" "}
                    <span className="font-semibold text-fg">{t.insurance.premiumValue(plan.annualPremiumPercent)}</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => onAddToCalculation(selected ? "none" : plan.id)}
                    aria-pressed={selected}
                    className={cn(
                      "mt-5 min-h-12 rounded-full border px-5 text-sm font-semibold transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      selected
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "border-line-strong text-fg hover:border-accent/60",
                    )}
                  >
                    {selected ? t.insurance.included : t.insurance.add}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
