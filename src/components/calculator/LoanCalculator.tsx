"use client";

import { RotateCcw } from "lucide-react";
import type { LoanCalculatorController } from "@/hooks/use-loan-calculator";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { formatNumber, formatTHBCompact } from "@/lib/format";
import { cn } from "@/lib/ui";
import { SliderField } from "@/components/ui/SliderField";
import { ProductIcon } from "@/components/products/ProductIcon";
import { InsuranceSelector } from "@/components/calculator/InsuranceSelector";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";

interface LoanCalculatorProps {
  controller: LoanCalculatorController;
}

export function LoanCalculator({ controller }: LoanCalculatorProps) {
  const { isPresenting } = usePresentation();
  const { t, text } = useI18n();
  const { input, product, errors, selectProduct, setAmount, setTenureMonths, setAnnualRate, setInsuranceId, reset } =
    controller;

  return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
          {/* Inputs */}
          <div className="rounded-3xl border border-line bg-card p-5 shadow-card sm:p-6">
            <fieldset>
              <legend className={cn("mb-3 font-semibold text-fg", isPresenting ? "text-lg" : "text-sm")}>
                {t.calculator.loanType}
              </legend>
              <div className="grid grid-cols-3 gap-2">
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
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        isPresenting ? "min-h-16 text-base" : "min-h-12 text-sm",
                        active
                          ? "border-accent bg-accent-soft text-fg"
                          : "border-line-strong text-muted hover:border-accent/50 hover:text-fg",
                      )}
                    >
                      <ProductIcon id={p.id} className={cn("size-4 shrink-0", active ? "text-accent-ink" : "")} />
                      <span className="leading-tight">{text(p.shortName)}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="my-5 h-px bg-line" />

            <div className="space-y-6">
              <SliderField
                label={t.calculator.loanAmount}
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
                label={t.calculator.loanTenure}
                value={input.tenureMonths}
                onChange={setTenureMonths}
                range={product.tenureMonths}
                quickPicks={product.tenureMonths.quickPicks}
                formatQuickPick={(m) => (m >= 24 && m % 12 === 0 ? t.calculator.yearsShort(m / 12) : t.calculator.monthsShort(m))}
                formatInputValue={String}
                formatRangeLabel={t.calculator.monthsShort}
                suffix={t.calculator.monthsUnit}
                error={errors.tenureMonths}
                large={isPresenting}
              />
              <SliderField
                label={t.calculator.interestRate}
                value={input.annualRate}
                onChange={setAnnualRate}
                range={product.annualRate}
                quickPicks={product.annualRate.quickPicks}
                formatQuickPick={(r) => `${r}%`}
                formatInputValue={(r) => String(Number(r.toFixed(2)))}
                formatRangeLabel={(r) => `${r}%`}
                suffix={t.calculator.ratePerYear}
                inputMode="decimal"
                error={errors.annualRate}
                hint={isPresenting ? undefined : t.calculator.rateHint}
                large={isPresenting}
              />
            </div>

            <div className="my-5 h-px bg-line" />

            <InsuranceSelector
              selectedId={input.insuranceId}
              onSelect={setInsuranceId}
              principal={input.amount}
              tenureMonths={input.tenureMonths}
              large={isPresenting}
            />

            {!isPresenting && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  {t.calculator.resetTo(text(product.name))}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:sticky lg:top-0 lg:self-start">
            <CalculatorResults controller={controller} large={isPresenting} />
          </div>
        </div>
  );
}
