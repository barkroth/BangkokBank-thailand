"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Landmark,
  Leaf,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { MODULES, type ModuleKey } from "@/data/navigation";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ContactSection } from "@/components/sections/ContactSection";

const ICONS: Record<ModuleKey, LucideIcon> = {
  calculator: Calculator,
  loanProducts: Landmark,
  crossSell: ShieldCheck,
  knowledgeHub: BookOpen,
  aiAssistant: Sparkles,
  esgNavigator: Leaf,
};

/** Home screen: a compact intro and one card per module, all on one screen. */
export function Dashboard() {
  const { t } = useI18n();

  return (
    <div className="relative flex-1 bg-surface">
      <Container className="relative flex h-full flex-col gap-5 py-5 sm:py-7 xl:gap-7">
        <div className="animate-fade-up max-w-3xl">
          <DemoBadge>{t.hero.badge}</DemoBadge>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl xl:text-6xl">
            {t.hero.headingStart} <span className="italic text-accent-ink">{t.hero.headingEmphasis}</span>
          </h1>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:text-base xl:text-lg">{t.hero.support}</p>
        </div>

        <nav aria-label={t.modules.dashboard} className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {MODULES.map((module) => {
              const Icon = ICONS[module.key];
              return (
                <li key={module.href}>
                  <Link
                    href={module.href}
                    className={cn(
                      "group flex h-full items-start gap-4 rounded-3xl border bg-card p-4 shadow-card xl:p-5 transition-all duration-300",
                      "hover:-translate-y-0.5 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      module.planned ? "border-line" : "border-line-strong",
                    )}
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-xl font-semibold text-fg">{t.nav[module.key]}</span>
                        {module.planned && <DemoBadge tone="neutral">{t.modules.planned}</DemoBadge>}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">
                        {t.modules.descriptions[module.key]}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto">
          <ContactSection />
        </div>
      </Container>
    </div>
  );
}
