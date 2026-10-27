import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * Text-only wordmark. Deliberately NOT an official logo — this prototype must
 * not imply it is an approved bank product.
 */
export function BrandMark({ showBadge = true }: { showBadge?: boolean }) {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
      <span className="h-8 w-px shrink-0 bg-gold" aria-hidden />
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-xl font-semibold tracking-tight text-fg sm:text-[1.4rem]">
          Bangkok Bank
        </span>
        <span className="mt-1 block truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">
          Sales Companion
        </span>
      </span>
      {showBadge && <DemoBadge className="hidden sm:inline-flex">Prototype</DemoBadge>}
    </a>
  );
}
