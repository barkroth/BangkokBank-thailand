"use client";

import { ArrowRight, Check } from "lucide-react";
import type { LoanProductId } from "@/types/finance";
import { LOAN_PRODUCTS } from "@/data/loan-products";
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
  return (
    <section id="products" className="border-t border-line bg-surface-2 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Loan products"
          title="Solutions for every stage"
          description="Sample product profiles to guide the conversation. Names, limits and rates are demo content only."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {LOAN_PRODUCTS.map((product) => {
            const selected = product.id === selectedId;
            return (
              <article
                key={product.id}
                className={cn(
                  "group flex flex-col rounded-3xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
                  selected ? "border-gold/70" : "border-line hover:border-line-strong",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gold-soft text-gold-ink">
                    <ProductIcon id={product.id} className="size-5" />
                  </span>
                  {selected && <DemoBadge tone="blue">In calculator</DemoBadge>}
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{product.name}</h3>
                <p className="mt-1 text-sm text-gold-ink">{product.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>

                <dl className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-surface-2/60 p-3 text-center">
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">Demo rate</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">{product.annualRate.default}%</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">Up to</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">
                      {formatTHBCompact(product.amount.max)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-subtle">Tenure</dt>
                    <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fg">
                      {product.tenureMonths.max / 12} yrs
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => onCalculate(product.id)}
                    className={cn(
                      "flex min-h-12 w-full items-center justify-between rounded-full border px-5 text-sm font-semibold transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      selected
                        ? "border-gold bg-gold-soft text-gold-ink"
                        : "border-line-strong text-fg hover:border-gold/60",
                    )}
                  >
                    Calculate this loan
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
