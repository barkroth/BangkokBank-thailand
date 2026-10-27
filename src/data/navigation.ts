export interface NavLink {
  href: `#${string}`;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#calculator", label: "Calculator" },
  { href: "#products", label: "Loans" },
  { href: "#insurance", label: "Insurance" },
  { href: "#compare", label: "Compare" },
  { href: "#contact", label: "Contact" },
];
