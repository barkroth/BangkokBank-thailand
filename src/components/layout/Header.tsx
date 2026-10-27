"use client";

import { useState } from "react";
import { Menu, Presentation, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/**
 * Staff-facing header. Replaced by <PresentationBar> in presentation mode.
 * Transparent at the top of the page; turns solid navy (see .site-header in
 * globals.css) as soon as the page is scrolled.
 */
export function Header() {
  const { enterPresentation } = usePresentation();
  const { t } = useI18n();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40" data-solid={scrolled}>
      <Container className="flex h-18 items-center justify-between gap-2 sm:gap-4">
        <BrandMark />

        <nav aria-label={t.header.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-fg"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button size="md" onClick={enterPresentation} aria-label={t.header.enterPresentation}>
            <Presentation className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t.header.present}</span>
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label={t.header.mobileNav}
        className={cn("border-t border-line bg-surface lg:hidden", menuOpen ? "block" : "hidden")}
      >
        <Container className="py-3">
          <ul className="grid gap-1 sm:grid-cols-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-fg hover:bg-card"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
