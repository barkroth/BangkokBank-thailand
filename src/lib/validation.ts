import type { CalculatorInput, LoanProduct, ValidationErrors } from "@/types/finance";
import { formatNumber, formatPercent } from "@/lib/format";

/** Checks the calculator input against the selected product's demo limits. */
export function validateCalculatorInput(input: CalculatorInput, product: LoanProduct): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.amount === null) {
    errors.amount = "Enter a loan amount.";
  } else if (input.amount < product.amount.min || input.amount > product.amount.max) {
    errors.amount = `Enter an amount between ฿${formatNumber(product.amount.min)} and ฿${formatNumber(product.amount.max)}.`;
  }

  if (input.tenureMonths === null) {
    errors.tenureMonths = "Enter a loan tenure.";
  } else if (!Number.isInteger(input.tenureMonths)) {
    errors.tenureMonths = "Tenure must be a whole number of months.";
  } else if (input.tenureMonths < product.tenureMonths.min || input.tenureMonths > product.tenureMonths.max) {
    errors.tenureMonths = `Choose between ${product.tenureMonths.min} and ${product.tenureMonths.max} months.`;
  }

  if (input.annualRate === null) {
    errors.annualRate = "Enter an interest rate.";
  } else if (input.annualRate < product.annualRate.min || input.annualRate > product.annualRate.max) {
    errors.annualRate = `Use a demo rate between ${formatPercent(product.annualRate.min)} and ${formatPercent(product.annualRate.max)}.`;
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
