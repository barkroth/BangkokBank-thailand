import type { Messages } from "@/i18n/messages";

export type CrossSellProductKey = keyof Messages["crossSellHub"]["items"];

export interface CrossSellProduct {
  key: CrossSellProductKey;
  /** External bangkokbank.com page, or an in-page anchor (starts with "#"). */
  href: string;
}

export const CROSS_SELL_PRODUCTS: CrossSellProduct[] = [
  { key: "commercialCards", href: "https://www.bangkokbank.com/th/business-banking/manage-my-business/commercial-cards" },
  { key: "creditCards", href: "https://www.bangkokbank.com/en/personal/cards/credit-cards" },
  { key: "edc", href: "https://www.bangkokbank.com/th/business-banking/manage-my-business/merchant-services/payments-on-edc" },
  { key: "insurance", href: "#insurance" },
  { key: "icash", href: "https://www.bangkokbank.com/en/business-banking/manage-my-business/digital-banking/icash-newsystem" },
  { key: "operatingAccounts", href: "https://www.bangkokbank.com/en/business-banking/manage-my-business/operating-accounts" },
];
