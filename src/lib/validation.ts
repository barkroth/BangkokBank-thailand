import type { CalculatorInput, LoanProduct, ValidationErrors } from "@/types/finance";
import type { Messages } from "@/i18n/messages";
import { formatNumber, formatPercent } from "@/lib/format";

/** Checks the calculator input against the selected product's demo limits. */
export function validateCalculatorInput(
  input: CalculatorInput,
  product: LoanProduct,
  messages: Messages["validation"],
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.amount === null) {
    errors.amount = messages.amountRequired;
  } else if (input.amount < product.amount.min || input.amount > product.amount.max) {
    errors.amount = messages.amountRange(`฿${formatNumber(product.amount.min)}`, `฿${formatNumber(product.amount.max)}`);
  }

  if (input.tenureMonths === null) {
    errors.tenureMonths = messages.tenureRequired;
  } else if (!Number.isInteger(input.tenureMonths)) {
    errors.tenureMonths = messages.tenureInteger;
  } else if (input.tenureMonths < product.tenureMonths.min || input.tenureMonths > product.tenureMonths.max) {
    errors.tenureMonths = messages.tenureRange(product.tenureMonths.min, product.tenureMonths.max);
  }

  if (input.annualRate === null) {
    errors.annualRate = messages.rateRequired;
  } else if (input.annualRate < product.annualRate.min || input.annualRate > product.annualRate.max) {
    errors.annualRate = messages.rateRange(formatPercent(product.annualRate.min), formatPercent(product.annualRate.max));
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
