"use client";

import type { InsuranceOptionId, LoanProductId } from "@/types/finance";
import { PresentationProvider, usePresentation } from "@/context/presentation-context";
import { useLoanCalculator } from "@/hooks/use-loan-calculator";
import { scrollToSection } from "@/lib/ui";
import { Header } from "@/components/layout/Header";
import { PresentationBar } from "@/components/layout/PresentationBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LoanCalculator } from "@/components/calculator/LoanCalculator";
import { ProductCards } from "@/components/products/ProductCards";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { CampaignBanner } from "@/components/sections/CampaignBanner";
import { ProductComparison } from "@/components/sections/ProductComparison";
import { ContactSection } from "@/components/sections/ContactSection";

export function SalesCompanionApp() {
  return (
    <PresentationProvider>
      <AppShell />
    </PresentationProvider>
  );
}

/**
 * Page composition. The calculator state lives here so that product cards and
 * insurance cards can push their selection into the calculator.
 */
function AppShell() {
  const { isPresenting } = usePresentation();
  const calculator = useLoanCalculator();

  const calculateProduct = (id: LoanProductId) => {
    calculator.selectProduct(id);
    scrollToSection("calculator");
  };

  const addInsurance = (id: InsuranceOptionId) => {
    calculator.setInsuranceId(id);
    if (id !== "none") scrollToSection("calculator");
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      {isPresenting ? <PresentationBar /> : <Header />}

      <main className="flex-1">
        <Hero />
        <LoanCalculator controller={calculator} />
        <ProductCards selectedId={calculator.input.productId} onCalculate={calculateProduct} />
        <InsuranceSection selectedId={calculator.input.insuranceId} onAddToCalculation={addInsurance} />
        {!isPresenting && <CampaignBanner />}
        {!isPresenting && <ProductComparison selectedId={calculator.input.productId} />}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
