"use client";

import { ArrowRight, Check } from "lucide-react";
import type { LoanProductId } from "@/types/finance";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { useI18n } from "@/hooks/use-i18n";
import { formatTHBCompact } from "@/lib/format";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductIcon } from "@/components/products/ProductIcon";

interface ProductCardsProps {
  selectedId: LoanProductId;
  onCalculate: (id: LoanProductId) => void;
}

export function ProductCards({ selectedId, onCalculate }: ProductCardsProps) {
  const { t, text } = useI18n();

  return (
    <section id="products" className="border-t border-line bg-surface-2 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.products.eyebrow} title={t.products.title} description={t.products.description} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {LOAN_PRODUCTS.map((product) => {
            const selected = product.id === selectedId;
            return (
              <article
                key={product.id}
                className={cn(
                  "group flex flex-col rounded-3xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
                  selected ? "border-accent/70" : "border-line hover:border-line-strong",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                    <ProductIcon id={product.id} className="size-5" />
                  </span>
                  {selected && <DemoBadge tone="blue">{t.products.inCalculator}</DemoBadge>}
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{text(product.name)}</h3>
                <p className="mt-1 text-sm text-accent-ink">{text(product.tagline)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text(product.description)}</p>

                <dl className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-surface-2/60 p-3 text-center">
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">{t.products.demoRate}</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">{product.annualRate.default}%</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">{t.products.upTo}</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">
                      {formatTHBCompact(product.amount.max)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">{t.products.tenure}</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">
                      {t.products.years(product.tenureMonths.max / 12)}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {product.highlights.map((highlight) => (
                    <li key={highlight.en} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
                      {text(highlight)}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => onCalculate(product.id)}
                    className={cn(
                      "flex min-h-12 w-full items-center justify-between rounded-full border px-5 text-sm font-semibold transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      selected
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "border-line-strong text-fg hover:border-accent/60",
                    )}
                  >
                    {t.products.calculate}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
