"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  Landmark,
  Leaf,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { MODULES, type ModuleKey } from "@/data/navigation";
import { useI18n } from "@/hooks/use-i18n";
import { cn, externalLinkProps } from "@/lib/ui";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";

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
        <section className="animate-fade-up relative isolate overflow-hidden rounded-3xl bg-[#0b2f7a] shadow-card">
          <Image
            src="/images/ro-smart-hub-bg.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="-z-10 object-cover object-[70%_center] sm:object-right"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b2f7a]/95 via-[#0b2f7a]/70 to-transparent sm:via-[#0b2f7a]/40" />

          <div className="flex min-h-56 flex-col justify-center gap-3 px-6 py-7 sm:min-h-64 sm:px-10 lg:min-h-72 xl:px-12">
            <h1 className="flex items-center gap-2 font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl xl:text-6xl">
              <ChevronRight className="size-9 shrink-0 text-sky-400 sm:size-11 xl:size-14" strokeWidth={3} aria-hidden />
              {t.hero.title}
            </h1>
            <p className="text-lg font-semibold text-white sm:text-xl xl:text-2xl">{t.hero.tagline}</p>
            <p className="max-w-md text-sm leading-relaxed text-blue-100/90 sm:text-base">{t.hero.support}</p>
          </div>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden aspect-[2048/686] w-full -translate-y-1/2 lg:block">
            <p className="absolute left-[82.4%] top-[28.4%] flex h-[30.1%] w-[15.9%] flex-col items-end justify-center p-[1.1%] text-right text-xs font-semibold leading-snug text-white drop-shadow-[0_1px_6px_rgba(11,47,122,0.55)] xl:text-sm 2xl:text-base">
              {t.hero.callout.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </section>

        <nav aria-label={t.modules.dashboard} className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {MODULES.map((module) => {
              const Icon = ICONS[module.key];
              return (
                <li key={module.href}>
                  <Link
                    href={module.href}
                    {...externalLinkProps(module.href)}
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
      </Container>
    </div>
  );
}
