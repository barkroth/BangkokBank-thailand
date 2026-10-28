"use client";

import { ChevronDown, Info } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";

/**
 * Slim footer shared by every route. The full demo-data disclaimer stays
 * available but is collapsed so it does not push the page past one screen.
 */
export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="on-navy shrink-0 border-t border-line bg-brand">
      <Container>
        <details className="group py-2">
          <summary className="flex min-h-9 cursor-pointer list-none items-center gap-2 text-xs text-muted [&::-webkit-details-marker]:hidden">
            <Info className="size-4 shrink-0 text-accent-ink" aria-hidden />
            <span className="font-semibold text-fg">{t.footer.title}</span>
            <span className="hidden truncate md:inline">· {t.footer.left}</span>
            <ChevronDown className="ml-auto size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <div className="space-y-1.5 pt-2 pb-1 text-xs leading-relaxed text-muted">
            <p>{t.footer.body}</p>
            <p>{t.footer.insuranceNote}</p>
            <p className="text-subtle">
              {t.footer.left} {t.footer.right}
            </p>
          </div>
        </details>
      </Container>
    </footer>
  );
}
