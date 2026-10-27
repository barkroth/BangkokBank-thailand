"use client";

import { ArrowUpRight, MessageCircle, MessagesSquare, Phone, type LucideIcon } from "lucide-react";
import type { ContactChannel } from "@/types/finance";
import { CONTACT_CHANNELS } from "@/data/contact-config";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<ContactChannel["id"], LucideIcon> = {
  line: MessagesSquare,
  whatsapp: MessageCircle,
  phone: Phone,
};

export function ContactSection() {
  const { isPresenting } = usePresentation();
  const { t, text } = useI18n();

  return (
    <section id="contact" className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => {
            const Icon = ICONS[channel.id];
            const external = channel.id !== "phone";
            return (
              <a
                key={channel.id}
                href={channel.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex min-h-24 items-center gap-4 rounded-3xl border border-line bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold text-fg">{text(channel.label)}</span>
                    {channel.isPlaceholder && <DemoBadge tone="neutral">{t.common.placeholder}</DemoBadge>}
                  </span>
                  <span className="block text-sm text-muted">{text(channel.description)}</span>
                  <span className="block truncate text-sm tabular-nums text-subtle">{channel.displayValue}</span>
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  aria-hidden
                />
              </a>
            );
          })}
        </div>

        {!isPresenting && CONTACT_CHANNELS.some((c) => c.isPlaceholder) && (
          <p className="mt-5 text-sm text-subtle">
            {t.contact.noteBefore}{" "}
            <code className="rounded bg-card-2 px-1.5 py-0.5 text-xs text-muted">.env.local</code> {t.contact.noteMiddle}{" "}
            <code className="rounded bg-card-2 px-1.5 py-0.5 text-xs text-muted">.env.example</code>
            {t.contact.noteAfter}
          </p>
        )}
      </Container>
    </section>
  );
}
