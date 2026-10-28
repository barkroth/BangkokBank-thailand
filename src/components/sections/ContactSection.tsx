"use client";

import { ArrowUpRight, MessageCircle, MessagesSquare, Phone, type LucideIcon } from "lucide-react";
import type { ContactChannel } from "@/types/finance";
import { CONTACT_CHANNELS } from "@/data/contact-config";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { DemoBadge } from "@/components/ui/DemoBadge";

const ICONS: Record<ContactChannel["id"], LucideIcon> = {
  line: MessagesSquare,
  whatsapp: MessageCircle,
  phone: Phone,
};

/** Compact row of contact channels, shown at the bottom of the dashboard. */
export function ContactSection() {
  const { isPresenting } = usePresentation();
  const { t, text } = useI18n();

  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-subtle">{t.modules.contactTitle}</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {CONTACT_CHANNELS.map((channel) => {
          const Icon = ICONS[channel.id];
          const external = channel.id !== "phone";
          return (
            <a
              key={channel.id}
              href={channel.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-card transition-all duration-300 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-fg">{text(channel.label)}</span>
                  {channel.isPlaceholder && <DemoBadge tone="neutral">{t.common.placeholder}</DemoBadge>}
                </span>
                <span className="block truncate text-sm tabular-nums text-subtle">{channel.displayValue}</span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                aria-hidden
              />
            </a>
          );
        })}
      </div>

      {!isPresenting && CONTACT_CHANNELS.some((c) => c.isPlaceholder) && (
        <p className="mt-2 text-xs text-subtle">
          {t.contact.noteBefore}{" "}
          <code className="rounded bg-card-2 px-1.5 py-0.5 text-xs text-muted">.env.local</code> {t.contact.noteMiddle}{" "}
          <code className="rounded bg-card-2 px-1.5 py-0.5 text-xs text-muted">.env.example</code>
          {t.contact.noteAfter}
        </p>
      )}
    </div>
  );
}
