"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { InsuranceOptionId } from "@/types/finance";
import { useCalculator } from "@/context/calculator-context";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { CampaignBanner } from "@/components/sections/CampaignBanner";
import { CrossSellProducts } from "@/components/sections/CrossSellProducts";

export function CrossSellPage() {
  const calculator = useCalculator();
  const { isPresenting } = usePresentation();
  const router = useRouter();
  const { t } = useI18n();
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const insuranceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (insuranceOpen) insuranceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [insuranceOpen]);

  // Adding a plan includes it in the calculation and opens the calculator; removing stays here.
  const addInsurance = (id: InsuranceOptionId) => {
    calculator.setInsuranceId(id);
    if (id !== "none") router.push("/calculator");
  };

  return (
    <>
      <PageHeader title={t.nav.crossSell} description={t.modules.descriptions.crossSell} />
      <Container className="flex flex-col gap-8 pb-6">
        <CrossSellProducts insuranceOpen={insuranceOpen} onToggleInsurance={() => setInsuranceOpen((open) => !open)} />
        {insuranceOpen && (
          <div id="insurance" ref={insuranceRef} className="animate-fade-up flex scroll-mt-24 flex-col gap-8">
            <InsuranceSection selectedId={calculator.input.insuranceId} onAddToCalculation={addInsurance} />
            {/* The demo campaign is staff talking-point content, hidden in presentation mode. */}
            {!isPresenting && <CampaignBanner />}
          </div>
        )}
      </Container>
    </>
  );
}
