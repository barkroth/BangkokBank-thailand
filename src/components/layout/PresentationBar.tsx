"use client";

import { X } from "lucide-react";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { useScrolled } from "@/hooks/use-scrolled";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

/** Minimal customer-facing top bar shown during presentation mode. */
export function PresentationBar() {
  const { exitPresentation } = usePresentation();
  const { t } = useI18n();
  const scrolled = useScrolled();

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40" data-solid={scrolled}>
      <Container className="flex h-20 items-center justify-between gap-4">
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
