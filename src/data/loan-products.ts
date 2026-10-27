import type { LoanProduct, LoanProductId } from "@/types/finance";

/**
 * DEMO DATA ONLY.
 *
 * These products, limits, rates and fees are invented for the prototype.
 * They are NOT official Bangkok Bank products, rates or terms.
 * Replace this file with approved product data before any real use.
 */
export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "personal",
    name: "Personal Loan",
    tagline: "Flexible funds for life's plans",
    description:
      "An unsecured instalment loan for planned expenses such as education, travel or home improvements.",
    highlights: ["No collateral in this demo", "Fixed monthly instalments", "Tenure up to 5 years"],
    typicalUse: "Planned personal expenses",
    amount: { min: 10_000, max: 1_000_000, step: 10_000, default: 200_000, quickPicks: [50_000, 100_000, 300_000, 500_000] },
    tenureMonths: { min: 12, max: 60, step: 1, default: 36, quickPicks: [12, 24, 36, 48, 60] },
    annualRate: { min: 8, max: 25, step: 0.05, default: 15, quickPicks: [12, 15, 18, 22] },
    fee: { label: "Processing fee (demo)", percentOfPrincipal: 1, minimum: 500, maximum: 5_000 },
  },
  {
    id: "home",
    name: "Home Loan",
    tagline: "A long-term partner for your home",
    description:
      "A secured, long-tenure loan for purchasing or refinancing a residential property.",
    highlights: ["Long tenures for lower instalments", "Secured against the property", "Refinance scenarios"],
    typicalUse: "Buying or refinancing a home",
    amount: { min: 500_000, max: 20_000_000, step: 100_000, default: 3_000_000, quickPicks: [2_000_000, 3_000_000, 5_000_000, 8_000_000] },
    tenureMonths: { min: 60, max: 360, step: 12, default: 300, quickPicks: [120, 180, 240, 300, 360] },
    annualRate: { min: 2, max: 9, step: 0.05, default: 5.5, quickPicks: [3.5, 4.5, 5.5, 6.5] },
    fee: { label: "Appraisal & processing fee (demo)", percentOfPrincipal: 0.25, minimum: 3_000, maximum: 20_000 },
  },
  {
    id: "auto",
    name: "Auto Loan",
    tagline: "Drive away with a clear plan",
    description:
      "An instalment loan to finance a new or used vehicle, with the vehicle as security.",
    highlights: ["New and used vehicles", "Tenure up to 7 years", "Predictable repayments"],
    typicalUse: "Financing a vehicle purchase",
    amount: { min: 100_000, max: 3_000_000, step: 10_000, default: 800_000, quickPicks: [400_000, 800_000, 1_200_000, 2_000_000] },
    tenureMonths: { min: 12, max: 84, step: 1, default: 60, quickPicks: [24, 36, 48, 60, 72, 84] },
    annualRate: { min: 2, max: 12, step: 0.05, default: 5, quickPicks: [3.5, 5, 6.5, 8] },
    fee: { label: "Processing fee (demo)", percentOfPrincipal: 0.5, minimum: 1_000, maximum: 10_000 },
  },
  {
    id: "sme",
    name: "SME Business Loan",
    tagline: "Working capital for growing businesses",
    description:
      "Term financing for small and medium enterprises to fund expansion, equipment or working capital.",
    highlights: ["Working capital or equipment", "Tenure up to 10 years", "Structured repayment plan"],
    typicalUse: "Business expansion & equipment",
    amount: { min: 100_000, max: 10_000_000, step: 50_000, default: 2_000_000, quickPicks: [500_000, 1_000_000, 3_000_000, 5_000_000] },
    tenureMonths: { min: 12, max: 120, step: 1, default: 60, quickPicks: [24, 36, 60, 84, 120] },
    annualRate: { min: 4, max: 15, step: 0.05, default: 7.5, quickPicks: [6, 7.5, 9, 11] },
    fee: { label: "Front-end fee (demo)", percentOfPrincipal: 0.75, minimum: 2_000, maximum: 30_000 },
  },
];

export const DEFAULT_PRODUCT_ID: LoanProductId = "personal";

export function getLoanProduct(id: LoanProductId): LoanProduct {
  const product = LOAN_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Unknown loan product: ${id}`);
  }
  return product;
}
