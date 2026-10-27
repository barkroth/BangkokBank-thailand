"use client";

import { useState } from "react";
import { Calculator, ChevronDown, CircleAlert } from "lucide-react";
import type { LoanCalculatorController } from "@/hooks/use-loan-calculator";
import { formatPercent, formatTHB, formatTenure } from "@/lib/format";
import { cn } from "@/lib/ui";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PaymentSchedule } from "@/components/calculator/PaymentSchedule";

interface CalculatorResultsProps {
  controller: LoanCalculatorController;
  large?: boolean;
}

export function CalculatorResults({ controller, large = false }: CalculatorResultsProps) {
  const { result, errors, input, insurance, product } = controller;
  const [showSchedule, setShowSchedule] = useState(false);

  if (!result) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-card/60 p-8 text-center">
        <span className="mb-4 grid size-14 place-items-center rounded-full bg-gold-soft text-gold-ink">
          <Calculator className="size-6" aria-hidden />
        </span>
        <h3 className="font-display text-2xl font-semibold text-fg">Complete the details to see an estimate</h3>
        <ul className="mt-4 space-y-1.5 text-sm text-muted">
          {Object.values(errors).map((message) => (
            <li key={message} className="flex items-center justify-center gap-1.5">
              <CircleAlert className="size-4 text-danger" aria-hidden />
              {message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const [whole, cents] = formatTHB(result.monthlyInstallment).split(".");

  const segments = [
    { label: "Principal", value: result.principal, className: "bg-blue" },
    { label: "Interest", value: result.totalInterest, className: "bg-gold" },
    { label: "Insurance", value: result.totalInsurance, className: "bg-blue-ink/70" },
    { label: "Fees", value: result.fees, className: "bg-subtle" },
  ].filter((segment) => segment.value > 0);

  const breakdown = [
    { label: "Principal", value: result.principal, note: "Amount borrowed" },
    { label: "Total interest", value: result.totalInterest, note: `${formatPercent(input.annualRate ?? 0)} p.a. (demo)` },
    {
      label: "Insurance cost",
      value: result.totalInsurance,
      note: result.totalInsurance > 0 ? insurance.name : "Not selected",
    },
    { label: "Fees", value: result.fees, note: `${product.fee.label}, one-time` },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-card">
      {/* Headline figure */}
      <div className="relative border-b border-line p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent"
          aria-hidden
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={cn("font-semibold text-muted", large ? "text-lg" : "text-sm")}>Estimated monthly instalment</p>
          <DemoBadge>Illustrative</DemoBadge>
        </div>

        <p
          key={result.monthlyInstallment}
          className={cn(
            "animate-value mt-4 font-semibold tracking-tight tabular-nums text-fg",
            large ? "text-6xl sm:text-7xl lg:text-8xl" : "text-5xl sm:text-6xl",
          )}
          aria-live="polite"
        >
          {whole}
          <span className={cn("text-muted", large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl")}>.{cents}</span>
        </p>

        <p className={cn("mt-3 text-muted", large ? "text-lg" : "text-sm")}>
          for {formatTenure(input.tenureMonths ?? 0)}
          {result.monthlyInsurance > 0 && (
            <>
              {" "}
              · includes {formatTHB(result.monthlyInsurance)} insurance
            </>
          )}
        </p>
      </div>

      {/* Breakdown */}
      <div className="p-6 sm:p-8">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line" role="img" aria-label="Cost composition">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className={cn("h-full transition-all duration-500", segment.className)}
              style={{ width: `${(segment.value / result.totalRepayment) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {segments.map((segment) => (
            <span key={segment.label} className="inline-flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", segment.className)} aria-hidden />
              {segment.label}
            </span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-line">
          {breakdown.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt>
                <span className={cn("font-medium text-fg", large ? "text-lg" : "text-sm")}>{row.label}</span>
                <span className="block text-xs text-subtle">{row.note}</span>
              </dt>
              <dd className={cn("font-semibold tabular-nums text-fg", large ? "text-xl" : "text-base")}>
                {formatTHB(row.value)}
              </dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 pt-4">
            <dt className={cn("font-semibold text-fg", large ? "text-xl" : "text-base")}>Total repayment</dt>
            <dd className={cn("font-semibold tabular-nums text-gold-ink", large ? "text-3xl" : "text-2xl")}>
              {formatTHB(result.totalRepayment)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => setShowSchedule((open) => !open)}
          aria-expanded={showSchedule}
          aria-controls="payment-schedule"
          className={cn(
            "mt-6 flex w-full items-center justify-between rounded-2xl border border-line-strong px-4 font-semibold text-fg transition-colors hover:border-gold/60",
            large ? "min-h-14 text-base" : "min-h-12 text-sm",
          )}
        >
          {showSchedule ? "Hide payment schedule" : "View payment schedule"}
          <ChevronDown className={cn("size-5 transition-transform duration-300", showSchedule && "rotate-180")} aria-hidden />
        </button>

        {showSchedule && <PaymentSchedule schedule={result.schedule} />}

        <p className="mt-5 text-xs leading-relaxed text-subtle">
          Prototype calculation using demo data. Figures are estimates for discussion only and are not an offer, quotation or
          approval.
        </p>
      </div>
    </div>
  );
}
