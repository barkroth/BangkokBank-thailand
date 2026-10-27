"use client";

import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { DEMO_CAMPAIGN } from "@/data/campaign";
import { useI18n } from "@/hooks/use-i18n";
import { scrollToSection } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function CampaignBanner() {
  const campaign = DEMO_CAMPAIGN;
  const { t, text } = useI18n();

  return (
    <section aria-label={t.campaign.ariaLabel} className="pb-16 sm:pb-24">
      <Container>
        <div className="on-navy relative overflow-hidden rounded-3xl bg-brand p-6 shadow-card sm:p-10 lg:p-12">
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
            <Button variant="outline-accent" size="lg" className="self-start lg:self-center" onClick={() => scrollToSection("calculator")}>
              {text(campaign.ctaLabel)}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
