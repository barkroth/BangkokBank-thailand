"use client";

import { ArrowUpRight, Sprout } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";

const ESG_LEARN_MORE_URL = "https://www.set.or.th/set-esg-academy/standard.html";

export function EsgNavigatorPage() {
  const { t } = useI18n();
  const esg = t.esg;

  return (
    <>
      <PageHeader title={t.nav.esgNavigator} description={t.modules.descriptions.esgNavigator} />
      <Container className="flex flex-col gap-6 pb-8">
        <section className="animate-fade-up relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#eef0ea_0%,#e6ebdf_60%,#dfe9d2_100%)] p-6 shadow-card sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -top-20 left-1/3 size-72 rounded-full bg-[#a8d672]/25 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <h2 className="font-sans text-6xl font-extrabold tracking-tight text-[#2f4a3c] sm:text-7xl">{esg.title}</h2>
              <span aria-hidden className="mt-4 block h-1 w-12 rounded-full bg-[#a8d672]" />
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#33463b] sm:text-lg">{esg.intro}</p>
            </div>

            <div className="relative pt-10 sm:pl-12 sm:pt-0">
              <span className="absolute left-1/2 top-0 grid size-20 -translate-x-1/2 place-items-center rounded-full bg-[#a8d672] text-[#24392d] shadow-lg ring-4 ring-[#eef0ea] sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0">
                <Sprout className="size-9" aria-hidden />
              </span>
              <p className="rounded-3xl bg-[#334a3d] px-6 pb-6 pt-14 text-base leading-relaxed text-[#eef3ea] shadow-xl sm:py-7 sm:pl-14 sm:pr-8 sm:text-lg">
                {esg.definition}
              </p>
            </div>
          </div>
        </section>

        <ul className="grid gap-5 lg:grid-cols-3">
          {esg.pillars.map((pillar, index) => (
            <li
              key={pillar.letter}
              className="animate-fade-up flex gap-4 rounded-3xl bg-[#eef0ea] p-5 shadow-card sm:p-6"
              style={{ animationDelay: `${120 + index * 80}ms` }}
            >
              <span aria-hidden className="shrink-0 self-center font-sans text-7xl font-extrabold leading-none text-[#2f4a3c] sm:text-8xl">
                {pillar.letter}
              </span>
              <div className="min-w-0">
                <h3 className="inline-block rounded-lg bg-[#a8d672] px-3 py-1.5 font-sans text-base font-bold leading-snug text-[#24392d] shadow-sm sm:text-lg">
                  {pillar.title} <span className="font-semibold">({pillar.subtitle})</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#33463b]">{pillar.body}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#5b6f62]">{esg.examplesLabel}</p>
                <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[#33463b] marker:text-[#7fb547]">
                  {pillar.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={ESG_LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#334a3d] px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-[#24392d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8d672] focus-visible:ring-offset-2 sm:text-base"
          >
            {esg.learnMore}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
          <span className="text-sm text-muted">{esg.learnMoreHint}</span>
        </div>
      </Container>
    </>
  );
}
