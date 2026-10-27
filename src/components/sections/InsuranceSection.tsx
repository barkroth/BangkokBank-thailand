"use client";

import { Check, Info, ShieldCheck, Umbrella } from "lucide-react";
import type { InsuranceOptionId } from "@/types/finance";
import { INSURANCE_OPTIONS } from "@/data/insurance-options";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface InsuranceSectionProps {
  selectedId: InsuranceOptionId;
  onAddToCalculation: (id: InsuranceOptionId) => void;
}

const KEY_POINTS = [
  "Protection is shown as an optional add-on in this prototype.",
  "Premiums are a separate cost line and do not change the loan interest rate.",
  "Actual coverage, exclusions and eligibility are defined by the insurer's policy terms.",
];

export function InsuranceSection({ selectedId, onAddToCalculation }: InsuranceSectionProps) {
  const plans = INSURANCE_OPTIONS.filter((option) => option.id !== "none");

  return (
    <section id="insurance" className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Insurance"
              title="Protect what you're building"
              description="Loan protection can help families manage an outstanding balance if the unexpected happens. Plans below are illustrative examples."
            />
            <ul className="mt-8 space-y-4">
              {KEY_POINTS.map((point) => (
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
                    selected ? "border-gold/70" : "border-line",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-soft text-blue-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <DemoBadge tone="neutral">Demo plan</DemoBadge>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{plan.shortDescription}</p>

                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {plan.coverage.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm text-subtle">
                    Demo premium:{" "}
                    <span className="font-semibold text-fg">{plan.annualPremiumPercent}% of loan amount / year</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => onAddToCalculation(selected ? "none" : plan.id)}
                    aria-pressed={selected}
                    className={cn(
                      "mt-5 min-h-12 rounded-full border px-5 text-sm font-semibold transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      selected
                        ? "border-gold bg-gold-soft text-gold-ink"
                        : "border-line-strong text-fg hover:border-gold/60",
                    )}
                  >
                    {selected ? "Included — remove" : "Add to calculation"}
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
