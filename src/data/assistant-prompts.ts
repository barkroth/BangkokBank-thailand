import type { SuggestedPrompt } from "@/types/assistant";

/** Starter prompts shown in the AI Assistant. Each maps to one scripted demo answer. */
export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: "meeting",
    intent: "meetingPrep",
    label: { en: "Help me prepare for a customer meeting.", th: "ช่วยเตรียมตัวสำหรับการพบลูกค้า" },
  },
  {
    id: "compare",
    intent: "compareLoans",
    label: { en: "Compare the available loan products.", th: "เปรียบเทียบผลิตภัณฑ์สินเชื่อที่มี" },
  },
  {
    id: "insurance",
    intent: "insurance",
    label: { en: "Explain the insurance options.", th: "อธิบายตัวเลือกประกันภัย" },
  },
  {
    id: "documents",
    intent: "documents",
    label: {
      en: "What documents may be required for a loan application?",
      th: "การขอสินเชื่ออาจต้องใช้เอกสารอะไรบ้าง",
    },
  },
  {
    id: "cross-sell",
    intent: "crossSell",
    label: { en: "Help me identify cross-selling opportunities.", th: "ช่วยหาโอกาสในการขายข้ามผลิตภัณฑ์" },
  },
  {
    id: "open-calculator",
    intent: "navigate",
    label: { en: "Open the loan calculator.", th: "เปิดเครื่องคำนวณสินเชื่อ" },
  },
];
