"use client";

import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { DEMO_CAMPAIGN } from "@/data/campaign";
import { scrollToSection } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function CampaignBanner() {
  const campaign = DEMO_CAMPAIGN;

  return (
    <section aria-label="Campaign (demo content)" className="pb-16 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-card p-6 shadow-card sm:p-10 lg:p-12">
          {/* Decorative concentric rings */}
          <div className="pointer-events-none absolute -right-24 -top-24 hidden sm:block" aria-hidden>
            {[0, 1, 2, 3].map((ring) => (
              <span
                key={ring}
                className="absolute rounded-full border border-gold/15"
                style={{ width: 220 + ring * 90, height: 220 + ring * 90, right: -ring * 45, top: -ring * 45 }}
              />
            ))}
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <DemoBadge>
                  <Sparkles className="size-3" aria-hidden />
                  {campaign.eyebrow}
                </DemoBadge>
                <DemoBadge tone="neutral">Sample content — not a real offer</DemoBadge>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">{campaign.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{campaign.message}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-subtle">
                <CalendarClock className="size-4" aria-hidden />
                {campaign.validity}
              </p>
            </div>
            <Button variant="outline-gold" size="lg" className="self-start lg:self-center" onClick={() => scrollToSection("calculator")}>
              {campaign.ctaLabel}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
