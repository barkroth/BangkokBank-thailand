"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Optional controls shown on the right (badges, tabs). */
  actions?: ReactNode;
}

/** Title row shared by all module pages, with a way back to the dashboard. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  const { isPresenting } = usePresentation();
  const { t } = useI18n();

  return (
    <Container className="pt-5 pb-4 sm:pt-6">
      {!isPresenting && (
        <Link
          href="/"
          className="mb-2 inline-flex min-h-9 items-center gap-1.5 rounded-full text-sm font-medium text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t.modules.backToDashboard}
        </Link>
      )}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">{title}</h1>
          {description && !isPresenting && <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </Container>
  );
}
