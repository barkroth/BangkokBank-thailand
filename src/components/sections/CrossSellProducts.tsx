"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  CreditCard,
  Landmark,
  MonitorSmartphone,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import { CROSS_SELL_PRODUCTS, type CrossSellProductKey } from "@/data/cross-sell-products";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";

const ICONS: Record<CrossSellProductKey, LucideIcon> = {
  commercialCards: Building2,
  creditCards: CreditCard,
  edc: Store,
  insurance: ShieldCheck,
  icash: MonitorSmartphone,
  operatingAccounts: Landmark,
};

export function CrossSellProducts() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="cross-sell-products-title"
      className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0a2a6b_0%,#0b3d91_55%,#0f5bd8_100%)] p-5 shadow-card sm:p-7"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 right-10 size-64 rounded-full bg-sky-300/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-10 size-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative">
        <h2 id="cross-sell-products-title" className="font-display text-2xl font-semibold text-white sm:text-3xl">
          {t.crossSellHub.title}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/85 sm:text-base">{t.crossSellHub.subtitle}</p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {CROSS_SELL_PRODUCTS.map((product, index) => {
            const Icon = ICONS[product.key];
            const item = t.crossSellHub.items[product.key];
            const inPage = product.href.startsWith("#");
            const filled = index % 2 === 0;
            const ActionIcon = inPage ? ArrowDown : ArrowUpRight;
            return (
              <li key={product.key}>
                <a
                  href={product.href}
                  {...(inPage ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={`${item.title} — ${inPage ? t.crossSellHub.inPage : t.crossSellHub.external}`}
                  className={cn(
                    "group flex h-full min-h-32 flex-col justify-between gap-4 rounded-2xl p-5 shadow-lg shadow-black/10 transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b3d91]",
                    filled ? "bg-[#1aa3ff] text-white hover:bg-[#0f95f0]" : "bg-white text-[#0a2a6b] hover:bg-sky-50",
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl",
                        filled ? "bg-white/20 text-white" : "bg-[#1aa3ff]/12 text-[#0b5fd1]",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <ActionIcon
                      className={cn(
                        "size-5 transition-transform duration-300",
                        inPage ? "group-hover:translate-y-0.5" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        filled ? "text-white/80" : "text-[#0b5fd1]/70",
                      )}
                      aria-hidden
                    />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold leading-tight">{item.title}</span>
                    <span className={cn("mt-1 block text-sm leading-relaxed", filled ? "text-white/85" : "text-[#0a2a6b]/70")}>
                      {item.body}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
