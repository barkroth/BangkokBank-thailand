/**
 * Shared TypeScript types for the Sales Companion prototype.
 *
 * Keeping types in one place makes it easy to see the "shape" of the data the
 * UI expects, and to swap demo data for real (approved) data later.
 */

export type LoanProductId = "personal" | "home" | "auto" | "sme";

export type InsuranceOptionId = "none" | "loan-protection" | "loan-protection-plus";

export type Theme = "dark" | "light";

/** A min/max range with a step, used for sliders and validation. */
export interface NumericRange {
  min: number;
  max: number;
  step: number;
}

/** One-time processing fee, described as a percentage with optional bounds. */
export interface FeeRule {
  label: string;
  percentOfPrincipal: number;
  minimum: number;
  maximum: number;
}

export interface LoanProduct {
  id: LoanProductId;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  typicalUse: string;
  amount: NumericRange & { default: number; quickPicks: number[] };
  tenureMonths: NumericRange & { default: number; quickPicks: number[] };
  /** Annual interest rate in percent, e.g. 6.5 means 6.5% p.a. */
  annualRate: NumericRange & { default: number; quickPicks: number[] };
  fee: FeeRule;
}

export interface InsuranceOption {
  id: InsuranceOptionId;
  name: string;
  shortDescription: string;
  coverage: string[];
  /**
   * Demo premium: a yearly percentage of the original loan amount.
   * 0 means no insurance. This is NOT linked to the interest rate.
   */
  annualPremiumPercent: number;
}

export interface Campaign {
  id: string;
  eyebrow: string;
  title: string;
  message: string;
  validity: string;
  ctaLabel: string;
}

export interface ContactChannel {
  id: "line" | "whatsapp" | "phone";
  label: string;
  description: string;
  href: string;
  displayValue: string;
  /** True while the destination is still a placeholder (not configured). */
  isPlaceholder: boolean;
}

/* ------------------------------------------------------------------ */
/* Calculator                                                          */
/* ------------------------------------------------------------------ */

/** What the user has entered. `null` means the field is empty. */
export interface CalculatorInput {
  productId: LoanProductId;
  amount: number | null;
  tenureMonths: number | null;
  annualRate: number | null;
  insuranceId: InsuranceOptionId;
}

/** Fully validated input passed to the calculation module. */
export interface LoanCalculationInput {
  principal: number;
  tenureMonths: number;
  annualRatePercent: number;
  insuranceAnnualPremiumPercent: number;
  fee: FeeRule;
}

export interface ScheduleRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  insurance: number;
  balance: number;
}

export interface LoanCalculationResult {
  /** Loan repayment + monthly insurance portion. */
  monthlyInstallment: number;
  monthlyLoanPayment: number;
  monthlyInsurance: number;
  principal: number;
  totalInterest: number;
  totalInsurance: number;
  fees: number;
  totalRepayment: number;
  schedule: ScheduleRow[];
}

export type CalculatorField = "amount" | "tenureMonths" | "annualRate";

export type ValidationErrors = Partial<Record<CalculatorField, string>>;
