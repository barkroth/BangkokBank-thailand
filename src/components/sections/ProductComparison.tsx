"use client";

import { useMemo } from "react";
import type { LoanProduct, LoanProductId } from "@/types/finance";
import type { Messages } from "@/i18n/messages";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { useI18n } from "@/hooks/use-i18n";
import { calculateLoan } from "@/lib/loan-calculator";
import { formatTHB, formatTHBCompact } from "@/lib/format";
import { cn } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductIcon } from "@/components/products/ProductIcon";

interface ComparisonRow {
  label: (t: Messages["comparison"]) => string;
  value: (product: LoanProduct, exampleMonthly: number, t: Messages["comparison"], text: (v: LoanProduct["name"]) => string) => string;
}

const ROWS: ComparisonRow[] = [
  { label: (t) => t.bestFor, value: (p, _m, _t, text) => text(p.typicalUse) },
  { label: (t) => t.rateRange, value: (p, _m, t) => t.rateRangeValue(p.annualRate.min, p.annualRate.max) },
  {
    label: (t) => t.loanAmount,
    value: (p) => `${formatTHBCompact(p.amount.min)} – ${formatTHBCompact(p.amount.max)}`,
  },
  { label: (t) => t.tenure, value: (p, _m, t) => t.tenureValue(p.tenureMonths.min, p.tenureMonths.max) },
  {
    label: (t) => t.fee,
    value: (p, _m, t) =>
      t.feeValue(p.fee.percentOfPrincipal, formatTHBCompact(p.fee.minimum), formatTHBCompact(p.fee.maximum)),
  },
  {
    label: (t) => t.exampleMonthly,
    value: (p, monthly, t) =>
      t.exampleValue(formatTHB(monthly, { whole: true }), formatTHBCompact(p.amount.default), p.tenureMonths.default),
  },
];

interface ProductComparisonProps {
  selectedId: LoanProductId;
  onCalculate: (id: LoanProductId) => void;
}

export function ProductComparison({ selectedId, onCalculate }: ProductComparisonProps) {
  const { t, text } = useI18n();

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
          eyebrow={t.comparison.eyebrow}
          title={t.comparison.title}
          description={t.comparison.description}
        />

        {/* Desktop / tablet landscape: table */}
        <div className="mt-12 hidden overflow-hidden rounded-3xl border border-line bg-card shadow-card md:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-[18%] px-5 py-5 text-xs font-semibold uppercase tracking-wider text-subtle">
                  <span className="sr-only">{t.comparison.attribute}</span>
                </th>
                {LOAN_PRODUCTS.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={cn("px-5 py-5 align-bottom", p.id === selectedId && "bg-accent-soft")}
                  >
                    <span className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
                      <ProductIcon id={p.id} className="size-4 shrink-0 text-accent-ink" />
                      {text(p.name)}
                    </span>
                    <Button variant="outline-accent" size="sm" className="mt-3" onClick={() => onCalculate(p.id)}>
                      {t.comparison.calculate}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map((row, index) => (
                <tr key={index}>
                  <th scope="row" className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-wider text-subtle">
                    {row.label(t.comparison)}
                  </th>
                  {LOAN_PRODUCTS.map((p) => (
                    <td
                      key={p.id}
                      className={cn("px-5 py-4 align-top text-muted tabular-nums", p.id === selectedId && "bg-accent-soft text-fg")}
                    >
                      {row.value(p, examples[p.id], t.comparison, text)}
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
              className={cn("rounded-3xl border bg-card p-5 shadow-card", p.id === selectedId ? "border-accent/70" : "border-line")}
            >
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
                <ProductIcon id={p.id} className="size-4 text-accent-ink" />
                {text(p.name)}
              </h3>
              <dl className="mt-4 divide-y divide-line text-sm">
                {ROWS.map((row, index) => (
                  <div key={index} className="flex justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-subtle">{row.label(t.comparison)}</dt>
                    <dd className="text-right text-fg tabular-nums">{row.value(p, examples[p.id], t.comparison, text)}</dd>
                  </div>
                ))}
              </dl>
              <Button variant="outline-accent" size="md" className="mt-4 w-full" onClick={() => onCalculate(p.id)}>
                {t.comparison.calculate}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
