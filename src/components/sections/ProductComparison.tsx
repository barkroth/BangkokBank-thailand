"use client";

import { useMemo } from "react";
import type { LoanProduct, LoanProductId } from "@/types/finance";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { calculateLoan } from "@/lib/loan-calculator";
import { formatTHB, formatTHBCompact } from "@/lib/format";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductIcon } from "@/components/products/ProductIcon";

interface ComparisonRow {
  label: string;
  value: (product: LoanProduct, exampleMonthly: number) => string;
}

const ROWS: ComparisonRow[] = [
  { label: "Best for", value: (p) => p.typicalUse },
  { label: "Demo rate range", value: (p) => `${p.annualRate.min}% – ${p.annualRate.max}% p.a.` },
  { label: "Loan amount", value: (p) => `${formatTHBCompact(p.amount.min)} – ${formatTHBCompact(p.amount.max)}` },
  { label: "Tenure", value: (p) => `${p.tenureMonths.min} – ${p.tenureMonths.max} months` },
  {
    label: "One-time fee (demo)",
    value: (p) => `${p.fee.percentOfPrincipal}% (min ${formatTHBCompact(p.fee.minimum)}, max ${formatTHBCompact(p.fee.maximum)})`,
  },
  {
    label: "Example monthly",
    value: (p, monthly) =>
      `${formatTHB(monthly, { whole: true })} on ${formatTHBCompact(p.amount.default)} / ${p.tenureMonths.default} mo`,
  },
];

export function ProductComparison({ selectedId }: { selectedId: LoanProductId }) {
  // Example instalment at each product's demo defaults, without insurance.
  const examples = useMemo(
    () =>
      Object.fromEntries(
        LOAN_PRODUCTS.map((p) => [
          p.id,
          calculateLoan({
            principal: p.amount.default,
            tenureMonths: p.tenureMonths.default,
            annualRatePercent: p.annualRate.default,
            insuranceAnnualPremiumPercent: 0,
            fee: p.fee,
          }).monthlyInstallment,
        ]),
      ) as Record<LoanProductId, number>,
    [],
  );

  return (
    <section id="compare" className="border-t border-line bg-surface-2 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Compare"
          title="Products side by side"
          description="A quick overview to help choose the right starting point. All values are demo data."
        />

        {/* Desktop / tablet landscape: table */}
        <div className="mt-12 hidden overflow-hidden rounded-3xl border border-line bg-card shadow-card md:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-[18%] px-5 py-5 text-xs font-semibold uppercase tracking-wider text-subtle">
                  <span className="sr-only">Attribute</span>
                </th>
                {LOAN_PRODUCTS.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={cn("px-5 py-5 align-bottom", p.id === selectedId && "bg-gold-soft")}
                  >
                    <span className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
                      <ProductIcon id={p.id} className="size-4 shrink-0 text-gold-ink" />
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-wider text-subtle">
                    {row.label}
                  </th>
                  {LOAN_PRODUCTS.map((p) => (
                    <td
                      key={p.id}
                      className={cn("px-5 py-4 align-top text-muted tabular-nums", p.id === selectedId && "bg-gold-soft text-fg")}
                    >
                      {row.value(p, examples[p.id])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones / tablet portrait: stacked cards */}
        <div className="mt-10 grid gap-4 md:hidden">
          {LOAN_PRODUCTS.map((p) => (
            <article
              key={p.id}
              className={cn("rounded-3xl border bg-card p-5 shadow-card", p.id === selectedId ? "border-gold/70" : "border-line")}
            >
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
                <ProductIcon id={p.id} className="size-4 text-gold-ink" />
                {p.name}
              </h3>
              <dl className="mt-4 divide-y divide-line text-sm">
                {ROWS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-subtle">{row.label}</dt>
                    <dd className="text-right text-fg tabular-nums">{row.value(p, examples[p.id])}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
