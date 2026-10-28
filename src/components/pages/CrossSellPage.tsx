"use client";

import { useRouter } from "next/navigation";
import type { InsuranceOptionId } from "@/types/finance";
import { useCalculator } from "@/context/calculator-context";
import { usePresentation } from "@/context/presentation-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { CampaignBanner } from "@/components/sections/CampaignBanner";

export function CrossSellPage() {
  const calculator = useCalculator();
  const { isPresenting } = usePresentation();
  const router = useRouter();
  const { t } = useI18n();

  // Adding a plan includes it in the calculation and opens the calculator; removing stays here.
  const addInsurance = (id: InsuranceOptionId) => {
    calculator.setInsuranceId(id);
    if (id !== "none") router.push("/calculator");
  };

  const items: TabItem[] = [
    {
      id: "insurance",
      label: t.modules.tabInsurance,
      content: <InsuranceSection selectedId={calculator.input.insuranceId} onAddToCalculation={addInsurance} />,
    },
  ];
  // The demo campaign is staff talking-point content, hidden in presentation mode as before.
  if (!isPresenting) {
    items.push({ id: "campaign", label: t.modules.tabCampaign, content: <CampaignBanner /> });
  }

  return (
    <>
      <PageHeader title={t.nav.crossSell} description={t.modules.descriptions.crossSell} />
      <Container className="pb-6">
        <Tabs key={items.length} label={t.modules.tabsLabel} items={items} />
      </Container>
    </>
  );
}
