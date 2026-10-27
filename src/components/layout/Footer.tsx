import { Info } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <Container className="py-10 sm:py-12">
        <div className="flex gap-3 rounded-2xl border border-line bg-card p-5 sm:p-6">
          <Info className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
          <div className="space-y-2 text-sm leading-relaxed text-muted">
            <p className="font-semibold text-fg">Illustrative calculations only</p>
            <p>
              All products, interest rates, fees, insurance premiums, campaigns and results shown in this prototype are
              demo data for illustration and discussion. They are not an offer, quotation, approval or advice, and do not
              represent official Bangkok Bank products, rates, formulas or terms. Actual terms depend on approved product
              criteria and individual assessment.
            </p>
            <p>Insurance shown here is optional and is not presented as reducing the loan interest rate.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-subtle sm:flex-row sm:justify-between">
          <p>Sales Companion — internal prototype. Not an approved bank product.</p>
          <p>No customer personal information is collected or stored.</p>
        </div>
      </Container>
    </footer>
  );
}
