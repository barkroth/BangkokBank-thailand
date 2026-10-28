export type NavKey =
  | "home"
  | "knowledgeHub"
  | "loanProducts"
  | "crossSell"
  | "calculator"
  | "aiAssistant"
  | "esgNavigator";

export type ModuleKey = Exclude<NavKey, "home">;

export interface NavLink {
  href: string;
  /** Key into the translated `nav` messages. */
  key: NavKey;
}

export interface ModuleLink extends NavLink {
  key: ModuleKey;
  /** Modules without functionality yet render a "planned" placeholder page. */
  planned: boolean;
}

/** Dedicated pages, in dashboard order. */
export const MODULES: ModuleLink[] = [
  { href: "/calculator", key: "calculator", planned: false },
  { href: "/loan-products", key: "loanProducts", planned: false },
  { href: "/cross-sell", key: "crossSell", planned: false },
  { href: "/knowledge-hub", key: "knowledgeHub", planned: true },
  { href: "/ai-assistant", key: "aiAssistant", planned: false },
  { href: "/esg-navigator", key: "esgNavigator", planned: true },
];

export const NAV_LINKS: NavLink[] = [{ href: "/", key: "home" }, ...MODULES];
