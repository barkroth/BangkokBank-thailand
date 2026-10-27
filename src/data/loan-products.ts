import type { LoanProduct, LoanProductId } from "@/types/finance";

/**
 * DEMO DATA ONLY.
 *
 * These products, limits, rates and fees are invented for the prototype.
 * They are NOT official Bangkok Bank products, rates or terms.
 * Replace this file with approved product data before any real use.
 *
 * Order matters: the first product is the default and is shown first.
 * Quick picks must start at `min` and end at `max` of their range.
 */
export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "sme",
    name: { en: "SME Business Loan", th: "สินเชื่อธุรกิจ SME" },
    shortName: { en: "SME Business", th: "SME ธุรกิจ" },
    tagline: { en: "Working capital for growing businesses", th: "เงินทุนหมุนเวียนสำหรับธุรกิจที่กำลังเติบโต" },
    description: {
      en: "Term financing for small and medium enterprises to fund expansion, equipment or working capital.",
      th: "สินเชื่อระยะยาวสำหรับผู้ประกอบการ SME เพื่อขยายธุรกิจ ซื้ออุปกรณ์ หรือใช้เป็นเงินทุนหมุนเวียน",
    },
    highlights: [
      { en: "Working capital or equipment", th: "เงินทุนหมุนเวียนหรือซื้ออุปกรณ์" },
      { en: "Tenure up to 10 years", th: "ระยะเวลาสูงสุด 10 ปี" },
      { en: "Structured repayment plan", th: "แผนการผ่อนชำระที่ชัดเจน" },
    ],
    typicalUse: { en: "Business expansion & equipment", th: "ขยายธุรกิจและซื้ออุปกรณ์" },
    amount: {
      min: 100_000,
      max: 10_000_000,
      step: 50_000,
      default: 2_000_000,
      quickPicks: [100_000, 500_000, 1_000_000, 3_000_000, 5_000_000, 10_000_000],
    },
    tenureMonths: { min: 12, max: 120, step: 1, default: 60, quickPicks: [12, 24, 36, 60, 84, 120] },
    annualRate: { min: 4, max: 15, step: 0.05, default: 7.5, quickPicks: [4, 6, 7.5, 9, 11, 15] },
    fee: {
      label: { en: "Front-end fee (demo)", th: "ค่าธรรมเนียมแรกเข้า (ตัวอย่าง)" },
      percentOfPrincipal: 0.75,
      minimum: 2_000,
      maximum: 30_000,
    },
  },
  {
    id: "personal",
    name: { en: "Personal Loan", th: "สินเชื่อส่วนบุคคล" },
    shortName: { en: "Personal", th: "ส่วนบุคคล" },
    tagline: { en: "Flexible funds for life's plans", th: "เงินทุนยืดหยุ่นสำหรับแผนชีวิตของคุณ" },
    description: {
      en: "An unsecured instalment loan for planned expenses such as education, travel or home improvements.",
      th: "สินเชื่อผ่อนชำระแบบไม่มีหลักประกัน สำหรับค่าใช้จ่ายที่วางแผนไว้ เช่น การศึกษา การเดินทาง หรือการต่อเติมบ้าน",
    },
    highlights: [
      { en: "No collateral in this demo", th: "ไม่ต้องมีหลักประกันในตัวอย่างนี้" },
      { en: "Fixed monthly instalments", th: "ค่างวดรายเดือนคงที่" },
      { en: "Tenure up to 5 years", th: "ระยะเวลาสูงสุด 5 ปี" },
    ],
    typicalUse: { en: "Planned personal expenses", th: "ค่าใช้จ่ายส่วนตัวที่วางแผนไว้" },
    amount: {
      min: 10_000,
      max: 1_000_000,
      step: 10_000,
      default: 200_000,
      quickPicks: [10_000, 50_000, 100_000, 300_000, 500_000, 1_000_000],
    },
    tenureMonths: { min: 12, max: 60, step: 1, default: 36, quickPicks: [12, 24, 36, 48, 60] },
    annualRate: { min: 8, max: 25, step: 0.05, default: 15, quickPicks: [8, 12, 15, 18, 22, 25] },
    fee: {
      label: { en: "Processing fee (demo)", th: "ค่าธรรมเนียมดำเนินการ (ตัวอย่าง)" },
      percentOfPrincipal: 1,
      minimum: 500,
      maximum: 5_000,
    },
  },
  {
    id: "home",
    name: { en: "Home Loan", th: "สินเชื่อบ้าน" },
    shortName: { en: "Home", th: "บ้าน" },
    tagline: { en: "A long-term partner for your home", th: "คู่คิดระยะยาวสำหรับบ้านของคุณ" },
    description: {
      en: "A secured, long-tenure loan for purchasing or refinancing a residential property.",
      th: "สินเชื่อระยะยาวที่มีหลักประกัน สำหรับซื้อหรือรีไฟแนนซ์อสังหาริมทรัพย์เพื่อการอยู่อาศัย",
    },
    highlights: [
      { en: "Long tenures for lower instalments", th: "ระยะเวลายาวเพื่อค่างวดที่ต่ำลง" },
      { en: "Secured against the property", th: "มีทรัพย์สินเป็นหลักประกัน" },
      { en: "Refinance scenarios", th: "รองรับการรีไฟแนนซ์" },
    ],
    typicalUse: { en: "Buying or refinancing a home", th: "ซื้อหรือรีไฟแนนซ์บ้าน" },
    amount: {
      min: 500_000,
      max: 20_000_000,
      step: 100_000,
      default: 3_000_000,
      quickPicks: [500_000, 2_000_000, 3_000_000, 5_000_000, 8_000_000, 20_000_000],
    },
    tenureMonths: { min: 60, max: 360, step: 12, default: 300, quickPicks: [60, 120, 180, 240, 300, 360] },
    annualRate: { min: 2, max: 9, step: 0.05, default: 5.5, quickPicks: [2, 3.5, 4.5, 5.5, 6.5, 9] },
    fee: {
      label: { en: "Appraisal & processing fee (demo)", th: "ค่าประเมินและค่าดำเนินการ (ตัวอย่าง)" },
      percentOfPrincipal: 0.25,
      minimum: 3_000,
      maximum: 20_000,
    },
  },
];

export const DEFAULT_PRODUCT_ID: LoanProductId = LOAN_PRODUCTS[0].id;

export function getLoanProduct(id: LoanProductId): LoanProduct {
  const product = LOAN_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Unknown loan product: ${id}`);
  }
  return product;
}
