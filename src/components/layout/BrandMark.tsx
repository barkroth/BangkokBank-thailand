"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/use-i18n";
import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * Text-only wordmark. Deliberately NOT an official logo — this prototype must
 * not imply it is an approved bank product.
 */
export function BrandMark({ showBadge = true }: { showBadge?: boolean }) {
  const { t } = useI18n();

  return (
    <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <span className="hidden h-8 w-px shrink-0 bg-accent sm:block" aria-hidden />
      <span className="min-w-0 leading-none">
        <span className="block whitespace-nowrap font-display text-lg font-semibold tracking-tight text-fg sm:text-[1.4rem]">
          {t.brand.name}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[0.62rem] sm:tracking-[0.24em]">
          {t.brand.subtitle}
        </span>
      </span>
      {showBadge && (
        <span className="hidden sm:block xl:hidden 2xl:block">
          <DemoBadge>{t.common.prototype}</DemoBadge>
        </span>
      )}
    </Link>
  );
}
