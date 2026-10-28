"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { ModuleKey } from "@/data/navigation";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PageHeader } from "@/components/layout/PageHeader";

/**
 * Route for a module that is on the roadmap but has no functionality yet.
 * Intentionally empty — no content is invented for it.
 */
export function PlannedModule({ moduleKey }: { moduleKey: ModuleKey }) {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        title={t.nav[moduleKey]}
        description={t.modules.descriptions[moduleKey]}
        actions={<DemoBadge tone="neutral">{t.modules.planned}</DemoBadge>}
      />
      <Container className="flex flex-1 pb-6">
        <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-card/60 p-8 text-center">
          <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent-soft text-accent-ink">
            <Clock className="size-6" aria-hidden />
          </span>
          <h2 className="font-display text-2xl font-semibold text-fg">{t.modules.plannedTitle}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{t.modules.plannedBody}</p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-card px-5 text-sm font-semibold text-fg transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t.modules.backToDashboard}
          </Link>
        </div>
      </Container>
    </>
  );
}
