export type NavKey = "calculator" | "products" | "insurance" | "compare" | "contact";

export interface NavLink {
  href: `#${string}`;
  /** Key into the translated `nav` messages. */
  key: NavKey;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#calculator", key: "calculator" },
  { href: "#products", key: "products" },
  { href: "#insurance", key: "insurance" },
  { href: "#compare", key: "compare" },
  { href: "#contact", key: "contact" },
];
