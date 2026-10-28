"use client";

import { useRouter } from "next/navigation";
import type { LoanProductId } from "@/types/finance";
import { useCalculator } from "@/context/calculator-context";
import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { Tabs } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCards } from "@/components/products/ProductCards";
import { ProductComparison } from "@/components/sections/ProductComparison";

export function LoanProductsPage() {
  const calculator = useCalculator();
  const router = useRouter();
  const { t } = useI18n();

  // Picking a product loads it into the calculator and opens that page.
  const calculateProduct = (id: LoanProductId) => {
    calculator.selectProduct(id);
    router.push("/calculator");
  };

  const selectedId = calculator.input.productId;

  return (
    <>
      <PageHeader title={t.nav.loanProducts} description={t.products.description} />
      <Container className="pb-6">
        <Tabs
          label={t.modules.tabsLabel}
          items={[
            {
              id: "products",
              label: t.modules.tabProducts,
              content: <ProductCards selectedId={selectedId} onCalculate={calculateProduct} />,
            },
            {
              id: "compare",
              label: t.modules.tabCompare,
              content: <ProductComparison selectedId={selectedId} onCalculate={calculateProduct} />,
            },
          ]}
        />
      </Container>
    </>
  );
}
