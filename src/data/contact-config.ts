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
    label: "LINE",
    description: "Chat with your relationship officer",
    href: lineUrl || PLACEHOLDERS.lineUrl,
    displayValue: lineUrl ? "Open LINE chat" : "@your-line-id",
    isPlaceholder: !lineUrl,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Message us on WhatsApp",
    href: `https://wa.me/${whatsappNumber || PLACEHOLDERS.whatsappNumber}`,
    displayValue: `+${whatsappNumber || PLACEHOLDERS.whatsappNumber}`,
    isPlaceholder: !whatsappNumber,
  },
  {
    id: "phone",
    label: "Telephone",
    description: "Speak with a specialist",
    href: `tel:${phoneNumber || PLACEHOLDERS.phoneNumber}`,
    displayValue: phoneNumber || PLACEHOLDERS.phoneNumber,
    isPlaceholder: !phoneNumber,
  },
];
