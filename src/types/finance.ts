/**
 * Shared TypeScript types for the Sales Companion prototype.
 *
 * Keeping types in one place makes it easy to see the "shape" of the data the
 * UI expects, and to swap demo data for real (approved) data later.
 */

export type LoanProductId = "sme" | "personal" | "home";

export type InsuranceOptionId = "none" | "loan-protection" | "loan-protection-plus";

export type Theme = "dark" | "light";

export type Language = "en" | "th";

/** A piece of demo content written in each supported language. */
export type Localized = Record<Language, string>;

/** A min/max range with a step, used for sliders and validation. */
export interface NumericRange {
  min: number;
  max: number;
  step: number;
}

/** One-time processing fee, described as a percentage with optional bounds. */
export interface FeeRule {
  label: Localized;
  percentOfPrincipal: number;
  minimum: number;
  maximum: number;
}

/**
 * Quick-pick buttons must start at the range minimum and end at the range
 * maximum, so the shortcuts always match what the slider can actually reach.
 */
export interface LoanProduct {
  id: LoanProductId;
  name: Localized;
  /** Short name for tabs, e.g. "Personal". */
  shortName: Localized;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  typicalUse: Localized;
  amount: NumericRange & { default: number; quickPicks: number[] };
  tenureMonths: NumericRange & { default: number; quickPicks: number[] };
  /** Annual interest rate in percent, e.g. 6.5 means 6.5% p.a. */
  annualRate: NumericRange & { default: number; quickPicks: number[] };
  fee: FeeRule;
}

export interface InsuranceOption {
  id: InsuranceOptionId;
  name: Localized;
  shortDescription: Localized;
  coverage: Localized[];
  /**
   * Demo premium: a yearly percentage of the original loan amount.
   * 0 means no insurance. This is NOT linked to the interest rate.
   */
  annualPremiumPercent: number;
}

export interface Campaign {
  id: string;
  eyebrow: Localized;
  title: Localized;
  message: Localized;
  validity: Localized;
  ctaLabel: Localized;
}

export interface ContactChannel {
  id: "line" | "whatsapp" | "phone";
  label: Localized;
  description: Localized;
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
