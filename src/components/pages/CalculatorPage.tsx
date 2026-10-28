"use client";

import { useCalculator } from "@/context/calculator-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoanCalculator } from "@/components/calculator/LoanCalculator";

export function CalculatorPage() {
  const calculator = useCalculator();
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        title={t.calculator.title}
        description={t.calculator.description}
        actions={<DemoBadge>{t.calculator.badge}</DemoBadge>}
      />
      <Container className="pb-6">
        <LoanCalculator controller={calculator} />
      </Container>
    </>
  );
}
