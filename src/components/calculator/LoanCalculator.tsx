"use client";

import { RotateCcw } from "lucide-react";
import type { LoanCalculatorController } from "@/hooks/use-loan-calculator";
import { usePresentation } from "@/context/presentation-context";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { formatNumber, formatTHBCompact } from "@/lib/format";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderField } from "@/components/ui/SliderField";
import { ProductIcon } from "@/components/products/ProductIcon";
import { InsuranceSelector } from "@/components/calculator/InsuranceSelector";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";

interface LoanCalculatorProps {
  controller: LoanCalculatorController;
}

export function LoanCalculator({ controller }: LoanCalculatorProps) {
  const { isPresenting } = usePresentation();
  const { input, product, errors, selectProduct, setAmount, setTenureMonths, setAnnualRate, setInsuranceId, reset } =
    controller;

  return (
    <section id="calculator" className={cn(isPresenting ? "py-8 sm:py-10" : "py-16 sm:py-24")}>
      <Container>
        {!isPresenting && (
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Loan calculator"
              title="Estimate a monthly instalment"
              description="Adjust the amount, tenure and rate together with your customer. All results are illustrative and based on demo data."
            />
            <DemoBadge className="self-start lg:self-end">Prototype · Illustrative rates</DemoBadge>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
          {/* Inputs */}
          <div className="rounded-3xl border border-line bg-card p-5 shadow-card sm:p-8">
            <fieldset>
              <legend className={cn("mb-3 font-semibold text-fg", isPresenting ? "text-lg" : "text-sm")}>
                Loan type
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LOAN_PRODUCTS.map((p) => {
                  const active = p.id === product.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectProduct(p.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-2xl border px-3 text-left font-semibold transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                        isPresenting ? "min-h-16 text-base" : "min-h-12 text-sm",
                        active
                          ? "border-gold bg-gold-soft text-fg"
                          : "border-line-strong text-muted hover:border-gold/50 hover:text-fg",
                      )}
                    >
                      <ProductIcon id={p.id} className={cn("size-4 shrink-0", active ? "text-gold-ink" : "")} />
                      <span className="leading-tight">{p.name.replace(" Loan", "")}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="my-7 h-px bg-line" />

            <div className="space-y-8">
              <SliderField
                label="Loan amount"
                value={input.amount}
                onChange={setAmount}
                range={product.amount}
                quickPicks={product.amount.quickPicks}
                formatQuickPick={formatTHBCompact}
                formatInputValue={formatNumber}
                formatRangeLabel={formatTHBCompact}
                prefix="฿"
                suffix="THB"
                error={errors.amount}
                large={isPresenting}
              />
              <SliderField
                label="Loan tenure"
                value={input.tenureMonths}
                onChange={setTenureMonths}
                range={product.tenureMonths}
                quickPicks={product.tenureMonths.quickPicks}
                formatQuickPick={(m) => (m >= 24 && m % 12 === 0 ? `${m / 12} yrs` : `${m} mo`)}
                formatInputValue={String}
                formatRangeLabel={(m) => `${m} mo`}
                suffix="months"
                error={errors.tenureMonths}
                large={isPresenting}
              />
              <SliderField
                label="Interest rate (demo)"
                value={input.annualRate}
                onChange={setAnnualRate}
                range={product.annualRate}
                quickPicks={product.annualRate.quickPicks}
                formatQuickPick={(r) => `${r}%`}
                formatInputValue={(r) => String(Number(r.toFixed(2)))}
                formatRangeLabel={(r) => `${r}%`}
                suffix="% p.a."
                inputMode="decimal"
                error={errors.annualRate}
                hint={isPresenting ? undefined : "Illustrative annual rate, reducing balance. Not an official rate."}
                large={isPresenting}
              />
            </div>

            <div className="my-7 h-px bg-line" />

            <InsuranceSelector
              selectedId={input.insuranceId}
              onSelect={setInsuranceId}
              principal={input.amount}
              tenureMonths={input.tenureMonths}
              large={isPresenting}
            />

            {!isPresenting && (
              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  Reset to {product.name} defaults
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CalculatorResults controller={controller} large={isPresenting} />
          </div>
        </div>
      </Container>
    </section>
  );
}
