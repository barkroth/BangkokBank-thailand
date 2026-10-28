import type { AssistantBlock, AssistantIntent, AssistantLink, AssistantReply } from "@/types/assistant";
import type { InsuranceOptionId, Language, LoanProductId, Localized } from "@/types/finance";
import { MESSAGES, type Messages } from "@/i18n/messages";
import { LOAN_PRODUCTS, getLoanProduct } from "@/data/loan-products";
import { INSURANCE_OPTIONS, getInsuranceOption } from "@/data/insurance-options";
import { MODULES, NAV_LINKS, type NavKey } from "@/data/navigation";
import { calculateLoan } from "@/lib/loan-calculator";
import { formatTHB, formatTHBCompact } from "@/lib/format";

/**
 * DEMO ONLY: deterministic, scripted answers for the AI Assistant.
 *
 * No AI model is involved. Every fact comes from the app's own demo data
 * (src/data) — nothing here may introduce official rates, eligibility rules,
 * policies or document lists. Anything outside these scripts gets an honest
 * "not enough information" answer.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const LANGUAGES: Language[] = ["en", "th"];

const L = (en: string, th: string): Localized => ({ en, th });

/** Builds localized text from a function of the language. */
function per(build: (lang: Language) => string): Localized {
  return Object.fromEntries(LANGUAGES.map((lang) => [lang, build(lang)])) as Localized;
}

/** Localized text taken from the interface messages. */
const msg = (pick: (m: Messages) => string): Localized => per((lang) => pick(MESSAGES[lang]));

const routeOf = (key: NavKey): string => NAV_LINKS.find((link) => link.key === key)?.href ?? "/";

const isPlanned = (key: NavKey): boolean => MODULES.some((module) => module.key === key && module.planned);

function pageLink(key: NavKey): AssistantLink {
  return {
    href: routeOf(key),
    label: per((lang) => {
      const m = MESSAGES[lang];
      return isPlanned(key) ? `${m.modules.open} ${m.nav[key]} · ${m.modules.planned}` : `${m.modules.open} ${m.nav[key]}`;
    }),
  };
}

function calculateLink(productId: LoanProductId, insuranceId?: InsuranceOptionId): AssistantLink {
  const product = getLoanProduct(productId);
  return {
    href: routeOf("calculator"),
    productId,
    insuranceId,
    label: per((lang) => `${MESSAGES[lang].comparison.calculate}: ${product.shortName[lang]}`),
  };
}

const reply = (blocks: AssistantBlock[], unanswered = false): AssistantReply => ({ blocks, source: "demo", unanswered });

/* ------------------------------------------------------------------ */
/* Intent detection (simple keyword rules, English + Thai)             */
/* ------------------------------------------------------------------ */

interface Matcher {
  pattern: RegExp;
  /** Thai has no word spaces, so Thai keywords are plain substring matches. */
  thai: string[];
}

const m = (pattern: RegExp, thai: string[] = []): Matcher => ({ pattern, thai });

const matches = (text: string, matcher: Matcher) =>
  matcher.pattern.test(text) || matcher.thai.some((word) => text.includes(word));

const SENSITIVE = m(/\b(passwords?|passcodes?|pins?|otps?|cvv|security codes?)\b/, ["รหัสผ่าน", "รหัส pin", "otp"]);
const NAV_VERB = m(/\b(open|go to|take me|navigate|launch|show me the)\b/, ["เปิด", "ไปที่", "พาไป", "ไปหน้า"]);
const DOCUMENTS = m(/\b(documents?|paperwork|checklists?)\b/, ["เอกสาร"]);
const ELIGIBILITY = m(/\b(approv\w*|eligib\w*|qualif\w*|guarantee\w*|credit scores?)\b/, [
  "อนุมัติ",
  "คุณสมบัติ",
  "ผ่านไหม",
  "ผ่านหรือไม่",
]);
const CROSS_SELL = m(/\b(cross[- ]?sell\w*|upsell\w*|opportunit\w*|bundles?)\b/, ["ขายข้าม", "ขายเพิ่ม", "โอกาส"]);
const MEETING = m(/\b(prepar\w*|meetings?|agenda|follow[- ]?up|discovery)\b/, ["เตรียม", "ประชุม", "นัดพบ", "พบลูกค้า", "ติดตามผล"]);
const INSURANCE = m(/\b(insurance|protection|premiums?|coverage)\b/, ["ประกัน", "คุ้มครอง", "เบี้ย"]);
const RATES = m(/\b(rates?|interest|fees?)\b/, ["ดอกเบี้ย", "อัตรา", "ค่าธรรมเนียม"]);
const PRODUCTS = m(/\b(compar\w*|differen\w*|versus|vs|products?|loans?)\b/, ["เปรียบเทียบ", "ต่างกัน", "สินเชื่อ", "ผลิตภัณฑ์"]);
const CUSTOMER = m(/\b(customers?|clients?|owners?|famil(y|ies)|couples?)\b/, ["ลูกค้า", "เจ้าของ", "ครอบครัว"]);
const GREETING = m(/^(hi|hello|hey|good (morning|afternoon|evening)|help|what can you do)\b/, ["สวัสดี", "ทำอะไรได้"]);

/** Hypothetical customer needs → the demo product that matches them. */
const NEEDS: Record<LoanProductId, Matcher> = {
  sme: m(/\b(business\w*|sme|shops?|stores?|company|equipment|machinery|working capital|expan\w*|inventory|restaurants?)\b/, [
    "ธุรกิจ",
    "ร้าน",
    "บริษัท",
    "อุปกรณ์",
    "เครื่องจักร",
    "ทุนหมุนเวียน",
    "ขยาย",
  ]),
  home: m(/\b(homes?|houses?|condo\w*|property|apartments?|mortgages?|refinanc\w*)\b/, ["บ้าน", "คอนโด", "ที่อยู่อาศัย", "รีไฟแนนซ์"]),
  personal: m(/\b(education|tuition|travel\w*|wedding|renovat\w*|medical|personal)\b/, [
    "การศึกษา",
    "ค่าเทอม",
    "เที่ยว",
    "แต่งงาน",
    "ต่อเติม",
    "ส่วนตัว",
    "ส่วนบุคคล",
  ]),
};

/** Pages the assistant can open, checked in order. Every key is an existing route. */
const NAV_TARGETS: Array<{ key: NavKey; matcher: Matcher }> = [
  { key: "calculator", matcher: m(/\b(calculat\w*|instal+ments?|estimates?)\b/, ["เครื่องคำนวณ", "คำนวณ", "ค่างวด"]) },
  { key: "crossSell", matcher: m(/\b(cross[- ]?sell\w*|insurance|protection|campaigns?)\b/, ["ขายข้าม", "ประกัน", "แคมเปญ"]) },
  { key: "loanProducts", matcher: m(/\b(products?|loans?|compar\w*)\b/, ["ผลิตภัณฑ์", "สินเชื่อ", "เปรียบเทียบ"]) },
  { key: "knowledgeHub", matcher: m(/\bknowledge\b/, ["ความรู้"]) },
  { key: "esgNavigator", matcher: m(/\b(esg|sustainab\w*)\b/, ["esg", "ยั่งยืน"]) },
  { key: "home", matcher: m(/\b(dashboard|home ?page|main page)\b/, ["แดชบอร์ด", "หน้าหลัก"]) },
];

const detectNeeds = (text: string): LoanProductId[] =>
  LOAN_PRODUCTS.map((p) => p.id).filter((id) => matches(text, NEEDS[id]));

const detectNavTarget = (text: string): NavKey | undefined =>
  NAV_TARGETS.find((target) => matches(text, target.matcher))?.key;

/** Exported for testing: which scripted topic a message maps to. */
export function detectIntent(rawText: string): AssistantIntent {
  const text = rawText.toLowerCase();
  if (matches(text, SENSITIVE)) return "sensitive";
  if (matches(text, NAV_VERB) && detectNavTarget(text)) return "navigate";
  if (matches(text, DOCUMENTS)) return "documents";
  if (matches(text, ELIGIBILITY)) return "eligibility";
  if (matches(text, CROSS_SELL)) return "crossSell";
  if (matches(text, MEETING)) return "meetingPrep";
  if (matches(text, CUSTOMER) && detectNeeds(text).length > 0) return "crossSell";
  if (matches(text, INSURANCE)) return "insurance";
  if (matches(text, PRODUCTS) || matches(text, RATES)) return "compareLoans";
  if (matches(text, GREETING) && text.length < 40) return "greeting";
  return "unknown";
}

/* ------------------------------------------------------------------ */
/* Scripted answers                                                    */
/* ------------------------------------------------------------------ */

const CAPABILITIES: Localized[] = [
  L(
    "Preparing a customer meeting: agenda, discovery questions and a follow-up draft",
    "เตรียมการพบลูกค้า: วาระ คำถามสำรวจความต้องการ และร่างข้อความติดตามผล",
  ),
  L("Comparing the demo loan products", "เปรียบเทียบผลิตภัณฑ์สินเชื่อตัวอย่าง"),
  L("Explaining the demo loan protection plans", "อธิบายแผนประกันคุ้มครองสินเชื่อตัวอย่าง"),
  L(
    "Spotting possible cross-selling topics for a hypothetical customer",
    "หาประเด็นการขายข้ามผลิตภัณฑ์ที่อาจเกี่ยวข้องสำหรับลูกค้าสมมติ",
  ),
  L("Opening the right page in the app", "เปิดหน้าที่เกี่ยวข้องในแอป"),
];

function greeting(): AssistantReply {
  return reply([
    {
      type: "paragraph",
      text: L(
        "I'm the Sales Companion demo assistant. I can help with a few scripted topics, using only the demo data in this app:",
        "ผู้ช่วยตัวอย่างของ Sales Companion ช่วยได้ในหัวข้อที่กำหนดไว้ไม่กี่หัวข้อ โดยใช้เฉพาะข้อมูลตัวอย่างในแอปนี้:",
      ),
    },
    { type: "list", items: CAPABILITIES },
    {
      type: "notice",
      tone: "info",
      text: L(
        "No AI model is connected yet, and I can't access customer records or internal bank documents.",
        "ยังไม่ได้เชื่อมต่อโมเดล AI และไม่สามารถเข้าถึงข้อมูลลูกค้าหรือเอกสารภายในของธนาคารได้",
      ),
    },
  ]);
}

function meetingPrep(needs: LoanProductId[]): AssistantReply {
  const blocks: AssistantBlock[] = [
    { type: "heading", text: L("Suggested agenda (30 minutes)", "วาระที่แนะนำ (30 นาที)") },
    {
      type: "list",
      ordered: true,
      items: [
        L("Welcome and purpose of the meeting (2 min)", "ทักทายและแจ้งวัตถุประสงค์ของการพบ (2 นาที)"),
        L("Understand the customer's goals and timeline (10 min)", "ทำความเข้าใจเป้าหมายและกรอบเวลาของลูกค้า (10 นาที)"),
        L(
          "Walk through relevant products and an illustrative estimate (10 min)",
          "แนะนำผลิตภัณฑ์ที่เกี่ยวข้องพร้อมตัวอย่างการประมาณการ (10 นาที)",
        ),
        L(
          "Discuss optional protection as a separate cost (5 min)",
          "พูดคุยเรื่องประกันคุ้มครองแบบเลือกได้ซึ่งเป็นค่าใช้จ่ายแยก (5 นาที)",
        ),
        L("Agree next steps and follow-up (3 min)", "สรุปขั้นตอนถัดไปและการติดตามผล (3 นาที)"),
      ],
    },
    { type: "heading", text: L("Discovery questions", "คำถามสำรวจความต้องการ") },
    {
      type: "list",
      items: [
        L("What would you like this financing to help you achieve?", "คุณต้องการให้เงินทุนนี้ช่วยให้บรรลุเป้าหมายอะไร"),
        L(
          "What is your timeline, and is there a deadline we should plan around?",
          "กรอบเวลาของคุณเป็นอย่างไร มีกำหนดเวลาที่ต้องวางแผนตามหรือไม่",
        ),
        L(
          "What monthly repayment would feel comfortable for your budget?",
          "ค่างวดรายเดือนเท่าไรที่คุณรู้สึกว่าเหมาะกับงบประมาณ",
        ),
        L(
          "Do you prefer a shorter tenure or a lower monthly instalment?",
          "คุณต้องการระยะเวลาผ่อนที่สั้นลง หรือค่างวดต่อเดือนที่ต่ำลง",
        ),
        L(
          "How would your family or business manage repayments if something unexpected happened?",
          "หากเกิดเหตุไม่คาดคิด ครอบครัวหรือธุรกิจของคุณจะรับมือกับการผ่อนชำระอย่างไร",
        ),
        L(
          "Is there anything else you are planning in the next year or two?",
          "ในหนึ่งถึงสองปีข้างหน้า คุณมีแผนการเงินอื่นอีกหรือไม่",
        ),
      ],
    },
    { type: "heading", text: L("Explaining the products", "การอธิบายผลิตภัณฑ์") },
    {
      type: "paragraph",
      text: L(
        "Use the Loan Products page for a side-by-side overview and the Smart Calculator to show an illustrative instalment together with the customer. Present all figures as demo examples, not offers.",
        "ใช้หน้าผลิตภัณฑ์สินเชื่อเพื่อดูภาพรวมแบบเทียบกัน และใช้เครื่องคำนวณเพื่อแสดงค่างวดตัวอย่างร่วมกับลูกค้า โดยนำเสนอตัวเลขทั้งหมดเป็นตัวอย่าง ไม่ใช่ข้อเสนอ",
      ),
    },
  ];

  if (needs.length > 0) {
    blocks.push(
      { type: "heading", text: L("Products to have ready (based on your description)", "ผลิตภัณฑ์ที่ควรเตรียมไว้ (ตามที่อธิบายมา)") },
      {
        type: "list",
        items: needs.map((id) => {
          const product = getLoanProduct(id);
          return per((lang) => `${product.name[lang]} — ${product.typicalUse[lang]}`);
        }),
      },
    );
  }

  blocks.push(
    {
      type: "draft",
      title: L("Follow-up message draft", "ร่างข้อความติดตามผล"),
      text: L(
        "Dear [Customer name],\n\nThank you for meeting with me today. As discussed, I have noted your goals and the options we explored together. The figures we reviewed were illustrative estimates only and are not an offer or approval.\n\nAs a next step, I will [next step] and contact you by [date]. Please let me know if you have any questions in the meantime.\n\nKind regards,\n[Your name]\n[Branch / contact details]",
        "เรียน [ชื่อลูกค้า]\n\nขอบคุณที่สละเวลาพบกันในวันนี้ ตามที่ได้พูดคุยกัน ได้บันทึกเป้าหมายของคุณและทางเลือกที่เราพิจารณาร่วมกันไว้แล้ว ตัวเลขที่ดูร่วมกันเป็นเพียงการประมาณการเพื่อประกอบการพิจารณา ไม่ใช่ข้อเสนอหรือการอนุมัติ\n\nขั้นตอนถัดไป จะ [ขั้นตอนถัดไป] และติดต่อกลับภายใน [วันที่] หากมีคำถามเพิ่มเติม สามารถติดต่อได้ตลอดเวลา\n\nขอแสดงความนับถือ\n[ชื่อของคุณ]\n[สาขา / ช่องทางติดต่อ]",
      ),
    },
    {
      type: "notice",
      tone: "illustrative",
      text: L(
        "Template only — review and personalise before sending. Do not include ID numbers or account details in messages.",
        "เป็นเพียงแม่แบบ โปรดตรวจทานและปรับให้เหมาะสมก่อนส่ง และอย่าใส่เลขบัตรประชาชนหรือข้อมูลบัญชีในข้อความ",
      ),
    },
    { type: "links", links: [pageLink("loanProducts"), pageLink("calculator")] },
  );

  return reply(blocks);
}

function compareLoans(askedAboutRates: boolean): AssistantReply {
  const rows = LOAN_PRODUCTS.map((p) => {
    const exampleMonthly = calculateLoan({
      principal: p.amount.default,
      tenureMonths: p.tenureMonths.default,
      annualRatePercent: p.annualRate.default,
      insuranceAnnualPremiumPercent: 0,
      fee: p.fee,
    }).monthlyInstallment;

    return [
      p.name,
      msg((x) => x.comparison.rateRangeValue(p.annualRate.min, p.annualRate.max)),
      `${formatTHBCompact(p.amount.min)} – ${formatTHBCompact(p.amount.max)}`,
      msg((x) => x.comparison.tenureValue(p.tenureMonths.min, p.tenureMonths.max)),
      msg((x) =>
        x.comparison.feeValue(p.fee.percentOfPrincipal, formatTHBCompact(p.fee.minimum), formatTHBCompact(p.fee.maximum)),
      ),
      msg((x) =>
        x.comparison.exampleValue(formatTHB(exampleMonthly, { whole: true }), formatTHBCompact(p.amount.default), p.tenureMonths.default),
      ),
    ];
  });

  const blocks: AssistantBlock[] = [
    {
      type: "paragraph",
      text: L(
        "Here is a side-by-side view of the three loan products in the app's demo data.",
        "ภาพรวมเปรียบเทียบผลิตภัณฑ์สินเชื่อสามรายการจากข้อมูลตัวอย่างในแอป",
      ),
    },
    {
      type: "table",
      columns: [
        L("Product", "ผลิตภัณฑ์"),
        msg((x) => x.comparison.rateRange),
        msg((x) => x.comparison.loanAmount),
        msg((x) => x.comparison.tenure),
        msg((x) => x.comparison.fee),
        msg((x) => x.comparison.exampleMonthly),
      ],
      rows,
    },
    { type: "heading", text: msg((x) => x.comparison.bestFor) },
    {
      type: "list",
      items: LOAN_PRODUCTS.map((p) => per((lang) => `${p.name[lang]} — ${p.typicalUse[lang]}`)),
    },
  ];

  if (askedAboutRates) {
    blocks.push({
      type: "notice",
      tone: "unverified",
      text: L(
        "These rates and fees are demo values from the prototype, not official Bangkok Bank rates. For current rates, refer to the bank's official rate announcements or the responsible product team.",
        "อัตราและค่าธรรมเนียมเหล่านี้เป็นค่าตัวอย่างในต้นแบบ ไม่ใช่อัตราอย่างเป็นทางการของธนาคารกรุงเทพ สำหรับอัตราปัจจุบัน โปรดดูประกาศอัตราอย่างเป็นทางการของธนาคารหรือสอบถามทีมผลิตภัณฑ์ที่รับผิดชอบ",
      ),
    });
  }

  blocks.push(
    {
      type: "notice",
      tone: "illustrative",
      text: L(
        "All values are demo data. Eligibility conditions and required documents are not part of the app's data, so they are not shown — confirm them with the approved product guidelines.",
        "ค่าทั้งหมดเป็นข้อมูลตัวอย่าง เงื่อนไขคุณสมบัติและเอกสารที่ต้องใช้ไม่ได้อยู่ในข้อมูลของแอป จึงไม่ได้แสดงไว้ โปรดยืนยันกับแนวทางผลิตภัณฑ์ที่ได้รับอนุมัติ",
      ),
    },
    { type: "links", links: [...LOAN_PRODUCTS.map((p) => calculateLink(p.id)), pageLink("loanProducts")] },
  );

  return reply(blocks);
}

function insurance(): AssistantReply {
  const plans = INSURANCE_OPTIONS.filter((option) => option.id !== "none");
  const keyPointCount = MESSAGES.en.insurance.keyPoints.length;

  return reply([
    {
      type: "paragraph",
      text: L(
        "The app includes two illustrative loan protection plans. They are optional add-ons, shown as a separate cost.",
        "แอปมีแผนประกันคุ้มครองสินเชื่อตัวอย่างสองแผน เป็นตัวเลือกเสริมที่แสดงเป็นค่าใช้จ่ายแยกต่างหาก",
      ),
    },
    {
      type: "table",
      columns: [L("Plan", "แผน"), L("Coverage", "ความคุ้มครอง"), msg((x) => x.insurance.demoPremium.replace(/:$/, ""))],
      rows: plans.map((plan) => [
        plan.name,
        per((lang) => plan.coverage.map((item) => item[lang]).join(", ")),
        msg((x) => x.insurance.premiumValue(plan.annualPremiumPercent)),
      ]),
    },
    { type: "heading", text: L("Key points", "ประเด็นสำคัญ") },
    {
      type: "list",
      items: Array.from({ length: keyPointCount }, (_, i) => msg((x) => x.insurance.keyPoints[i])),
    },
    {
      type: "notice",
      tone: "illustrative",
      text: L(
        "Plans and premiums are demo examples, not real insurance products.",
        "แผนและเบี้ยประกันเป็นตัวอย่างเท่านั้น ไม่ใช่ผลิตภัณฑ์ประกันจริง",
      ),
    },
    {
      type: "links",
      links: [
        pageLink("crossSell"),
        ...plans.map((plan) => ({
          href: routeOf("calculator"),
          insuranceId: plan.id,
          label: per((lang) => `${MESSAGES[lang].insurance.add}: ${plan.name[lang]}`),
        })),
      ],
    },
  ]);
}

function documents(): AssistantReply {
  return reply(
    [
      {
        type: "notice",
        tone: "unverified",
        text: L("Verified information is not available for this question.", "ยังไม่มีข้อมูลที่ได้รับการยืนยันสำหรับคำถามนี้"),
      },
      {
        type: "paragraph",
        text: L(
          "I can't list required documents: this app doesn't contain a verified document checklist, and I won't guess one. Requirements depend on the product and the customer's situation and are defined by the bank's approved product guidelines.",
          "ไม่สามารถระบุรายการเอกสารที่ต้องใช้ได้ เนื่องจากแอปนี้ไม่มีรายการเอกสารที่ได้รับการยืนยัน และจะไม่คาดเดาขึ้นเอง เอกสารที่ต้องใช้ขึ้นอยู่กับผลิตภัณฑ์และสถานการณ์ของลูกค้า และกำหนดโดยแนวทางผลิตภัณฑ์ที่ธนาคารอนุมัติ",
        ),
      },
      { type: "heading", text: L("Where to check", "แหล่งที่ควรตรวจสอบ") },
      {
        type: "list",
        items: [
          L("The official document checklist for the specific product", "รายการเอกสารอย่างเป็นทางการของผลิตภัณฑ์นั้น"),
          L("Your branch credit or operations team", "ทีมสินเชื่อหรือทีมปฏิบัติการของสาขา"),
          L("The responsible product team, for exceptions", "ทีมผลิตภัณฑ์ที่รับผิดชอบ สำหรับกรณีพิเศษ"),
        ],
      },
    ],
    true,
  );
}

/** Demo pairing of each loan product with a protection plan, and why it may be worth discussing. */
const CROSS_SELL_SCENARIOS: Record<LoanProductId, { situation: Localized; insuranceId: InsuranceOptionId; why: Localized }> = {
  sme: {
    situation: L("Is expanding a business or buying equipment", "กำลังขยายธุรกิจหรือซื้ออุปกรณ์"),
    insuranceId: "loan-protection",
    why: L(
      "Protection can help the business or family manage the outstanding balance if the owner can no longer repay.",
      "ประกันช่วยให้ธุรกิจหรือครอบครัวรับมือกับยอดหนี้คงเหลือได้ หากเจ้าของไม่สามารถผ่อนชำระต่อได้",
    ),
  },
  home: {
    situation: L("Is buying or refinancing a home", "กำลังซื้อหรือรีไฟแนนซ์บ้าน"),
    insuranceId: "loan-protection-plus",
    why: L(
      "Long tenures leave a balance outstanding for many years, so broader cover may be worth discussing.",
      "ระยะเวลาผ่อนที่ยาวทำให้มียอดหนี้คงเหลือเป็นเวลาหลายปี ความคุ้มครองที่กว้างขึ้นจึงอาจน่าพูดคุย",
    ),
  },
  personal: {
    situation: L("Has a planned personal expense", "มีค่าใช้จ่ายส่วนตัวที่วางแผนไว้"),
    insuranceId: "loan-protection",
    why: L(
      "Basic protection may help cover the remaining balance, at a lower demo premium.",
      "ความคุ้มครองพื้นฐานอาจช่วยคุ้มครองยอดคงเหลือ ด้วยเบี้ยประกันตัวอย่างที่ต่ำกว่า",
    ),
  },
};

function crossSell(needs: LoanProductId[]): AssistantReply {
  const tailored = needs.length > 0;
  const productIds = tailored ? needs : LOAN_PRODUCTS.map((p) => p.id);

  const blocks: AssistantBlock[] = [
    {
      type: "paragraph",
      text: tailored
        ? L(
            "Based on the hypothetical need you described, these may be worth discussing:",
            "จากความต้องการสมมติที่อธิบายมา ผลิตภัณฑ์ต่อไปนี้อาจน่าพูดคุย:",
          )
        : L(
            "Cross-selling works best when it follows the customer's actual need. Based on the products in this app, these combinations may be worth discussing:",
            "การขายข้ามผลิตภัณฑ์ได้ผลดีที่สุดเมื่อสอดคล้องกับความต้องการจริงของลูกค้า จากผลิตภัณฑ์ในแอปนี้ คู่ผลิตภัณฑ์ต่อไปนี้อาจน่าพูดคุย:",
          ),
    },
    {
      type: "table",
      columns: [L("If the customer…", "หากลูกค้า…"), L("Possibly relevant", "ผลิตภัณฑ์ที่อาจเกี่ยวข้อง"), L("Why", "เหตุผล")],
      rows: productIds.map((id) => {
        const scenario = CROSS_SELL_SCENARIOS[id];
        const product = getLoanProduct(id);
        const plan = getInsuranceOption(scenario.insuranceId);
        return [scenario.situation, per((lang) => `${product.name[lang]} + ${plan.name[lang]}`), scenario.why];
      }),
    },
  ];

  if (!tailored) {
    blocks.push({
      type: "paragraph",
      text: L(
        "For a tailored list, describe a hypothetical customer, for example: “SME owner planning to buy new equipment”. Please don't include names, ID numbers or account details.",
        "หากต้องการคำแนะนำที่เจาะจงขึ้น ให้อธิบายลูกค้าสมมติ เช่น “เจ้าของธุรกิจ SME ที่วางแผนซื้ออุปกรณ์ใหม่” โปรดอย่าใส่ชื่อ เลขบัตรประชาชน หรือข้อมูลบัญชี",
      ),
    });
  }

  blocks.push(
    {
      type: "notice",
      tone: "safety",
      text: L(
        "These are conversation ideas, not recommendations. Suitability, eligibility and approval must be assessed through the bank's approved process — nothing here guarantees an outcome.",
        "นี่เป็นเพียงแนวทางการสนทนา ไม่ใช่คำแนะนำ ความเหมาะสม คุณสมบัติ และการอนุมัติต้องพิจารณาผ่านกระบวนการที่ธนาคารอนุมัติ และไม่มีสิ่งใดในที่นี้รับประกันผลลัพธ์",
      ),
    },
    {
      type: "links",
      links: [
        ...productIds.map((id) => calculateLink(id, CROSS_SELL_SCENARIOS[id].insuranceId)),
        pageLink("crossSell"),
      ],
    },
  );

  return reply(blocks);
}

function navigate(target: NavKey | undefined): AssistantReply {
  if (!target) {
    return reply([
      { type: "paragraph", text: L("These are the pages available in the app:", "หน้าที่มีอยู่ในแอป:") },
      { type: "links", links: NAV_LINKS.filter((link) => link.key !== "aiAssistant").map((link) => pageLink(link.key)) },
    ]);
  }

  const blocks: AssistantBlock[] = [
    {
      type: "paragraph",
      text:
        target === "home"
          ? L("The dashboard lists every module in the app.", "แดชบอร์ดแสดงโมดูลทั้งหมดในแอป")
          : msg((x) => x.modules.descriptions[target]),
    },
  ];
  if (isPlanned(target)) {
    blocks.push({ type: "notice", tone: "info", text: msg((x) => `${x.modules.plannedTitle}. ${x.modules.plannedBody}`) });
  }
  blocks.push({ type: "links", links: [pageLink(target)] });
  return reply(blocks);
}

function eligibility(): AssistantReply {
  return reply(
    [
      {
        type: "notice",
        tone: "safety",
        text: L("I can't assess eligibility or approve loans.", "ไม่สามารถประเมินคุณสมบัติหรืออนุมัติสินเชื่อได้"),
      },
      {
        type: "paragraph",
        text: L(
          "This app has no eligibility criteria or credit rules, and calculator results are illustrative estimates, not approvals. Eligibility and approval are decided through the bank's credit assessment under approved product criteria.",
          "แอปนี้ไม่มีเกณฑ์คุณสมบัติหรือกฎด้านสินเชื่อ และผลจากเครื่องคำนวณเป็นเพียงการประมาณการตัวอย่าง ไม่ใช่การอนุมัติ คุณสมบัติและการอนุมัติจะพิจารณาผ่านการประเมินสินเชื่อของธนาคารตามเกณฑ์ผลิตภัณฑ์ที่ได้รับอนุมัติ",
        ),
      },
      {
        type: "paragraph",
        text: L(
          "Please check with your branch credit team. I can still help you prepare discovery questions for the meeting.",
          "โปรดสอบถามทีมสินเชื่อของสาขา แต่ยังสามารถช่วยเตรียมคำถามสำรวจความต้องการสำหรับการพบลูกค้าได้",
        ),
      },
      { type: "links", links: [pageLink("calculator")] },
    ],
    true,
  );
}

function sensitive(): AssistantReply {
  return reply(
    [
      {
        type: "notice",
        tone: "safety",
        text: L(
          "Please don't share passwords, PINs, OTPs or other security codes — here or anywhere else. This assistant never needs them.",
          "โปรดอย่าแชร์รหัสผ่าน PIN OTP หรือรหัสความปลอดภัยใด ๆ ทั้งที่นี่และที่อื่น ผู้ช่วยนี้ไม่จำเป็นต้องใช้ข้อมูลเหล่านี้",
        ),
      },
      {
        type: "paragraph",
        text: L(
          "For product questions, describe the situation hypothetically, without customer identifiers. If a customer's credentials may have been exposed, follow the bank's security incident procedure.",
          "สำหรับคำถามเกี่ยวกับผลิตภัณฑ์ ให้อธิบายสถานการณ์แบบสมมติโดยไม่ระบุตัวตนลูกค้า หากข้อมูลยืนยันตัวตนของลูกค้าอาจรั่วไหล ให้ปฏิบัติตามขั้นตอนเหตุการณ์ด้านความปลอดภัยของธนาคาร",
        ),
      },
    ],
    true,
  );
}

function unknown(): AssistantReply {
  return reply(
    [
      {
        type: "paragraph",
        text: L(
          "This demo doesn't have enough information to answer that yet. It only covers a few scripted topics using the app's demo data — no AI model is connected, so I won't guess.",
          "เดโมนี้ยังมีข้อมูลไม่เพียงพอที่จะตอบคำถามนี้ ครอบคลุมเพียงไม่กี่หัวข้อที่กำหนดไว้โดยใช้ข้อมูลตัวอย่างในแอป และยังไม่ได้เชื่อมต่อโมเดล AI จึงจะไม่คาดเดาคำตอบ",
        ),
      },
      { type: "heading", text: L("I can help with", "หัวข้อที่ช่วยได้") },
      { type: "list", items: CAPABILITIES },
      {
        type: "paragraph",
        text: L(
          "For anything else, please check the bank's approved sources or ask the responsible department.",
          "สำหรับเรื่องอื่น ๆ โปรดตรวจสอบจากแหล่งข้อมูลที่ธนาคารอนุมัติ หรือสอบถามหน่วยงานที่รับผิดชอบ",
        ),
      },
    ],
    true,
  );
}

/**
 * Returns the scripted answer for a message. `intentHint` (from a suggested
 * prompt) takes priority over keyword detection so starter prompts always
 * produce their intended answer in either language.
 */
export function respondToDemoPrompt(rawText: string, intentHint?: AssistantIntent): AssistantReply {
  const text = rawText.toLowerCase();
  const intent = intentHint ?? detectIntent(text);

  switch (intent) {
    case "greeting":
      return greeting();
    case "meetingPrep":
      return meetingPrep(detectNeeds(text));
    case "compareLoans":
      return compareLoans(matches(text, RATES));
    case "insurance":
      return insurance();
    case "documents":
      return documents();
    case "crossSell":
      return crossSell(detectNeeds(text));
    case "navigate":
      return navigate(detectNavTarget(text));
    case "eligibility":
      return eligibility();
    case "sensitive":
      return sensitive();
    case "unknown":
      return unknown();
  }
}
