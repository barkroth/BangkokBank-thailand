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
    name: { en: "No insurance", th: "ไม่เลือกประกัน" },
    shortDescription: { en: "Loan only, without a protection add-on.", th: "สินเชื่อเพียงอย่างเดียว ไม่มีประกันเสริม" },
    coverage: [],
    annualPremiumPercent: 0,
  },
  {
    id: "loan-protection",
    name: { en: "Loan Protection", th: "ประกันคุ้มครองสินเชื่อ" },
    shortDescription: {
      en: "Helps cover the outstanding balance in case of death.",
      th: "ช่วยคุ้มครองยอดหนี้คงเหลือในกรณีเสียชีวิต",
    },
    coverage: [
      { en: "Death (any cause)", th: "เสียชีวิต (ทุกสาเหตุ)" },
      { en: "Outstanding balance cover", th: "คุ้มครองยอดหนี้คงเหลือ" },
    ],
    annualPremiumPercent: 0.45,
  },
  {
    id: "loan-protection-plus",
    name: { en: "Loan Protection Plus", th: "ประกันคุ้มครองสินเชื่อ พลัส" },
    shortDescription: {
      en: "Adds total permanent disability and critical illness cover.",
      th: "เพิ่มความคุ้มครองทุพพลภาพถาวรสิ้นเชิงและโรคร้ายแรง",
    },
    coverage: [
      { en: "Death (any cause)", th: "เสียชีวิต (ทุกสาเหตุ)" },
      { en: "Total permanent disability", th: "ทุพพลภาพถาวรสิ้นเชิง" },
      { en: "Selected critical illnesses", th: "โรคร้ายแรงที่ระบุ" },
    ],
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
