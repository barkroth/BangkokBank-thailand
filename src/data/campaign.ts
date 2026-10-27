import type { Campaign } from "@/types/finance";

/**
 * DEMO DATA ONLY. This is a fictional campaign used to show the layout.
 * It is not a real offer.
 */
export const DEMO_CAMPAIGN: Campaign = {
  id: "demo-year-end",
  eyebrow: { en: "Demo campaign", th: "แคมเปญตัวอย่าง" },
  title: { en: "Year-End Planning Conversations", th: "คุยแผนการเงินส่งท้ายปี" },
  message: {
    en: "A sample banner showing how a seasonal campaign could be presented to customers. Content, dates and benefits are placeholders.",
    th: "แบนเนอร์ตัวอย่างที่แสดงวิธีนำเสนอแคมเปญตามฤดูกาลแก่ลูกค้า เนื้อหา วันที่ และสิทธิประโยชน์เป็นเพียงข้อมูลสมมติ",
  },
  validity: {
    en: "Example validity: 1 Nov – 31 Dec (placeholder)",
    th: "ตัวอย่างระยะเวลา: 1 พ.ย. – 31 ธ.ค. (ข้อมูลสมมติ)",
  },
  ctaLabel: { en: "Explore the calculator", th: "ลองใช้เครื่องคำนวณ" },
};
