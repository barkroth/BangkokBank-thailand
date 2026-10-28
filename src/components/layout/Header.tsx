"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Presentation, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/** Staff-facing header shared by every route. Replaced by <PresentationBar> in presentation mode. */
export function Header() {
  const { enterPresentation } = usePresentation();
  const { t } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40 shrink-0">
      <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
        <BrandMark />

        <nav aria-label={t.header.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                      active ? "bg-card text-fg" : "text-muted hover:bg-card hover:text-fg",
                    )}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              );
            })}
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
            className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg xl:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label={t.header.mobileNav}
        className={cn(
          "absolute inset-x-0 top-full border-t border-line bg-brand shadow-card xl:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <Container className="py-3">
          <ul className="grid gap-1 sm:grid-cols-2">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-fg hover:bg-card",
                      active && "bg-card",
                    )}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
