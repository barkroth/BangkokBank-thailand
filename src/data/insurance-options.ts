import type { InsuranceOption, InsuranceOptionId } from "@/types/finance";

/**
 * DEMO DATA ONLY.
 *
 * Illustrative loan-protection options. Premiums are invented and are charged
 * as a separate cost line. They never change the loan interest rate.
 */
export const INSURANCE_OPTIONS: InsuranceOption[] = [
  {
    id: "none",
    name: "No insurance",
    shortDescription: "Loan only, without a protection add-on.",
    coverage: [],
    annualPremiumPercent: 0,
  },
  {
    id: "loan-protection",
    name: "Loan Protection",
    shortDescription: "Helps cover the outstanding balance in case of death.",
    coverage: ["Death (any cause)", "Outstanding balance cover"],
    annualPremiumPercent: 0.45,
  },
  {
    id: "loan-protection-plus",
    name: "Loan Protection Plus",
    shortDescription: "Adds total permanent disability and critical illness cover.",
    coverage: ["Death (any cause)", "Total permanent disability", "Selected critical illnesses"],
    annualPremiumPercent: 0.8,
  },
];

export const DEFAULT_INSURANCE_ID: InsuranceOptionId = "none";

export function getInsuranceOption(id: InsuranceOptionId): InsuranceOption {
  const option = INSURANCE_OPTIONS.find((o) => o.id === id);
  if (!option) {
    throw new Error(`Unknown insurance option: ${id}`);
  }
  return option;
}
