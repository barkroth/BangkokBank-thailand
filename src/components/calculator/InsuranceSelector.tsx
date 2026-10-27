"use client";

import { ShieldCheck } from "lucide-react";
import type { InsuranceOptionId } from "@/types/finance";
import { INSURANCE_OPTIONS } from "@/data/insurance-options";
import { calculateTotalInsurance } from "@/lib/loan-calculator";
import { formatTHB } from "@/lib/format";
import { cn } from "@/lib/ui";

interface InsuranceSelectorProps {
  selectedId: InsuranceOptionId;
  onSelect: (id: InsuranceOptionId) => void;
  principal: number | null;
  tenureMonths: number | null;
  large?: boolean;
}

export function InsuranceSelector({ selectedId, onSelect, principal, tenureMonths, large }: InsuranceSelectorProps) {
  const canPreview = principal !== null && principal > 0 && tenureMonths !== null && tenureMonths > 0;

  return (
    <fieldset>
      <legend className={cn("mb-1 font-semibold text-fg", large ? "text-lg" : "text-sm")}>Loan protection (optional)</legend>
      <p className="mb-4 text-sm text-subtle">
        Insurance is a separate, optional cost. It does not change the interest rate.
      </p>

      <div className="grid gap-2 sm:grid-cols-3">
        {INSURANCE_OPTIONS.map((option) => {
          const active = option.id === selectedId;
          const monthly =
            canPreview && option.annualPremiumPercent > 0
              ? calculateTotalInsurance(principal, option.annualPremiumPercent, tenureMonths) / tenureMonths
              : null;

          return (
            <label
              key={option.id}
              className={cn(
                "relative flex cursor-pointer flex-col rounded-2xl border p-4 transition-all duration-200",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold",
                large ? "min-h-28" : "min-h-24",
                active ? "border-gold bg-gold-soft" : "border-line-strong hover:border-gold/50",
              )}
            >
              <input
                type="radio"
                name="insurance"
                value={option.id}
                checked={active}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span className="flex items-center gap-2 font-semibold text-fg">
                {option.id !== "none" && (
                  <ShieldCheck className={cn("size-4 shrink-0", active ? "text-gold-ink" : "text-muted")} aria-hidden />
                )}
                <span className={large ? "text-base" : "text-sm"}>{option.name}</span>
              </span>
              <span className="mt-1.5 text-xs leading-snug text-muted">
                {option.id === "none"
                  ? "Loan only"
                  : `${option.annualPremiumPercent}% of loan amount per year (demo)`}
              </span>
              {monthly !== null && (
                <span className="mt-auto pt-2 text-sm font-semibold tabular-nums text-gold-ink">
                  +{formatTHB(monthly)}/mo
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
