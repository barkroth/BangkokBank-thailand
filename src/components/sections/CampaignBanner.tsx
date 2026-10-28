"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { DEMO_CAMPAIGN } from "@/data/campaign";
import { useI18n } from "@/hooks/use-i18n";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function CampaignBanner() {
  const campaign = DEMO_CAMPAIGN;
  const { t, text } = useI18n();

  return (
        <div aria-label={t.campaign.ariaLabel} role="region" className="on-navy relative overflow-hidden rounded-3xl bg-brand p-6 shadow-card sm:p-10 lg:p-12">
          {/* Decorative concentric rings */}
          <div className="pointer-events-none absolute -right-24 -top-24 hidden sm:block" aria-hidden>
            {[0, 1, 2, 3].map((ring) => (
              <span
                key={ring}
                className="absolute rounded-full border border-white/10"
                style={{ width: 220 + ring * 90, height: 220 + ring * 90, right: -ring * 45, top: -ring * 45 }}
              />
            ))}
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <DemoBadge>
                  <Sparkles className="size-3" aria-hidden />
                  {text(campaign.eyebrow)}
                </DemoBadge>
                <DemoBadge tone="neutral">{t.campaign.sampleNotReal}</DemoBadge>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">{text(campaign.title)}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{text(campaign.message)}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-subtle">
                <CalendarClock className="size-4" aria-hidden />
                {text(campaign.validity)}
              </p>
            </div>
            <Link
              href="/calculator"
              className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full border border-accent/60 px-6 text-base font-semibold text-accent-ink transition-all duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:self-center"
            >
              {text(campaign.ctaLabel)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
  );
}
