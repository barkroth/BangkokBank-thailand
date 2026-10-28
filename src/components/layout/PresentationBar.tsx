"use client";

import { X } from "lucide-react";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

/** Minimal customer-facing top bar shown during presentation mode. */
export function PresentationBar() {
  const { exitPresentation } = usePresentation();
  const { t } = useI18n();

  return (
    <header className="site-header sticky top-0 z-40 shrink-0">
      <Container className="flex h-18 items-center justify-between gap-4">
        <BrandMark showBadge={false} />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button variant="secondary" size="lg" onClick={exitPresentation}>
            <X className="size-5" aria-hidden />
            <span className="sm:hidden">{t.presentation.exit}</span>
            <span className="hidden sm:inline">{t.presentation.exitFull}</span>
          </Button>
        </div>
      </Container>
    </header>
  );
}
