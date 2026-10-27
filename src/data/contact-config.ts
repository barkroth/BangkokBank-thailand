import type { ContactChannel } from "@/types/finance";

/**
 * Contact destinations.
 *
 * Set real values in a `.env.local` file (see `.env.example`). Until then the
 * placeholders below are used and the UI marks them as "Placeholder".
 *
 * NEXT_PUBLIC_* variables are embedded in the browser bundle, so only put
 * public contact details here — never secrets.
 */
const PLACEHOLDERS = {
  lineUrl: "https://line.me/R/ti/p/@your-line-id",
  whatsappNumber: "66000000000",
  phoneNumber: "+66000000000",
};

const lineUrl = process.env.NEXT_PUBLIC_CONTACT_LINE_URL;
const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER;
const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER;

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "line",
    label: { en: "LINE", th: "LINE" },
    description: { en: "Chat with your relationship officer", th: "แชทกับเจ้าหน้าที่ดูแลลูกค้า" },
    href: lineUrl || PLACEHOLDERS.lineUrl,
    displayValue: lineUrl ? "LINE" : "@your-line-id",
    isPlaceholder: !lineUrl,
  },
  {
    id: "whatsapp",
    label: { en: "WhatsApp", th: "WhatsApp" },
    description: { en: "Message us on WhatsApp", th: "ส่งข้อความหาเราทาง WhatsApp" },
    href: `https://wa.me/${whatsappNumber || PLACEHOLDERS.whatsappNumber}`,
    displayValue: `+${whatsappNumber || PLACEHOLDERS.whatsappNumber}`,
    isPlaceholder: !whatsappNumber,
  },
  {
    id: "phone",
    label: { en: "Telephone", th: "โทรศัพท์" },
    description: { en: "Speak with a specialist", th: "พูดคุยกับเจ้าหน้าที่ผู้เชี่ยวชาญ" },
    href: `tel:${phoneNumber || PLACEHOLDERS.phoneNumber}`,
    displayValue: phoneNumber || PLACEHOLDERS.phoneNumber,
    isPlaceholder: !phoneNumber,
  },
];
