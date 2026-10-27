"use client";

import { useCallback, useMemo, useState } from "react";
import type { CalculatorInput, InsuranceOptionId, LoanCalculationResult, LoanProductId } from "@/types/finance";
import { DEFAULT_PRODUCT_ID, getLoanProduct } from "@/data/loan-products";
import { DEFAULT_INSURANCE_ID, getInsuranceOption } from "@/data/insurance-options";
import { calculateLoan } from "@/lib/loan-calculator";
import { hasErrors, validateCalculatorInput } from "@/lib/validation";
import { useI18n } from "@/hooks/use-i18n";

function defaultsFor(productId: LoanProductId, insuranceId: InsuranceOptionId = DEFAULT_INSURANCE_ID): CalculatorInput {
  const product = getLoanProduct(productId);
  return {
    productId,
    amount: product.amount.default,
    tenureMonths: product.tenureMonths.default,
    annualRate: product.annualRate.default,
    insuranceId,
  };
}

/**
 * Holds the calculator state and derives the (demo) result from it.
 * UI components call the setters; they never do maths themselves.
 */
export function useLoanCalculator() {
  const [input, setInput] = useState<CalculatorInput>(() => defaultsFor(DEFAULT_PRODUCT_ID));

  const product = getLoanProduct(input.productId);
  const insurance = getInsuranceOption(input.insuranceId);
  const { t } = useI18n();
  const errors = useMemo(() => validateCalculatorInput(input, product, t.validation), [input, product, t]);

  const result: LoanCalculationResult | null = useMemo(() => {
    if (hasErrors(errors) || input.amount === null || input.tenureMonths === null || input.annualRate === null) {
      return null;
    }
    return calculateLoan({
      principal: input.amount,
      tenureMonths: input.tenureMonths,
      annualRatePercent: input.annualRate,
      insuranceAnnualPremiumPercent: insurance.annualPremiumPercent,
      fee: product.fee,
    });
  }, [errors, input, insurance, product]);

  const selectProduct = useCallback((productId: LoanProductId) => {
    // Switching product loads that product's demo defaults but keeps the insurance choice.
    setInput((current) => defaultsFor(productId, current.insuranceId));
  }, []);

  const setAmount = useCallback((amount: number | null) => setInput((c) => ({ ...c, amount })), []);
  const setTenureMonths = useCallback((tenureMonths: number | null) => setInput((c) => ({ ...c, tenureMonths })), []);
  const setAnnualRate = useCallback((annualRate: number | null) => setInput((c) => ({ ...c, annualRate })), []);
  const setInsuranceId = useCallback((insuranceId: InsuranceOptionId) => setInput((c) => ({ ...c, insuranceId })), []);
  const reset = useCallback(() => setInput((c) => defaultsFor(c.productId)), []);

  return {
    input,
    product,
    insurance,
    errors,
    result,
    selectProduct,
    setAmount,
    setTenureMonths,
    setAnnualRate,
    setInsuranceId,
    reset,
  };
}

export type LoanCalculatorController = ReturnType<typeof useLoanCalculator>;
