"use client";

import { ArrowUp, Info } from "lucide-react";
import type { InsuranceOptionId, LoanProductId } from "@/types/finance";
import { CONTACT_CHANNELS } from "@/data/contact-config";
import { INSURANCE_OPTIONS } from "@/data/insurance-options";
import { LOAN_PRODUCTS } from "@/data/loan-products";
import { NAV_LINKS } from "@/data/navigation";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  onCalculateProduct: (id: LoanProductId) => void;
  onAddInsurance: (id: InsuranceOptionId) => void;
}

const linkClass =
  "inline-flex min-h-9 items-center rounded text-left text-sm text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </div>
  );
}

/**
 * Brand-navy footer. Every link either scrolls to a section, loads a product
 * or plan into the calculator, or opens a contact channel. In presentation
 * mode only the disclaimer is shown.
 */
export function Footer({ onCalculateProduct, onAddInsurance }: FooterProps) {
  const { isPresenting } = usePresentation();
  const { t, text } = useI18n();

  return (
    <footer className="on-navy bg-brand">
      <Container className="py-12 sm:py-14">
        {!isPresenting && (
          <div className="grid gap-10 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-display text-2xl font-semibold text-fg">{t.brand.name}</p>
              <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">{t.brand.subtitle}</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.footer.about}</p>
            </div>

            <Column title={t.footer.explore}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </Column>

            <Column title={t.footer.loans}>
              {LOAN_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <button type="button" onClick={() => onCalculateProduct(product.id)} className={linkClass}>
                    {text(product.name)}
                  </button>
                </li>
              ))}
            </Column>

            <Column title={t.footer.protection}>
              {INSURANCE_OPTIONS.filter((option) => option.id !== "none").map((option) => (
                <li key={option.id}>
                  <button type="button" onClick={() => onAddInsurance(option.id)} className={linkClass}>
                    {text(option.name)}
                  </button>
                </li>
              ))}
            </Column>

            <Column title={t.footer.reachUs}>
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.id === "phone" ? undefined : "_blank"}
                    rel={channel.id === "phone" ? undefined : "noopener noreferrer"}
                    className={linkClass}
                  >
                    {text(channel.label)}
                  </a>
                </li>
              ))}
            </Column>
          </div>
        )}

        <div className={`flex gap-3 rounded-2xl border border-line bg-card p-5 sm:p-6 ${isPresenting ? "" : "mt-10"}`}>
          <Info className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
          <div className="space-y-2 text-sm leading-relaxed text-muted">
            <p className="font-semibold text-fg">{t.footer.title}</p>
            <p>{t.footer.body}</p>
            <p>{t.footer.insuranceNote}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>{t.footer.left}</p>
            <p>{t.footer.right}</p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-line-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-card-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden />
            {t.footer.backToTop}
          </button>
        </div>
      </Container>
    </footer>
  );
}
