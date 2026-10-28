"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLoanCalculator, type LoanCalculatorController } from "@/hooks/use-loan-calculator";

const CalculatorContext = createContext<LoanCalculatorController | null>(null);

/**
 * Calculator state lives above the routes so a product or insurance plan picked
 * on one page is still selected when the user opens the calculator page.
 */
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const controller = useLoanCalculator();
  return <CalculatorContext.Provider value={controller}>{children}</CalculatorContext.Provider>;
}

export function useCalculator(): LoanCalculatorController {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used inside <CalculatorProvider>");
  }
  return context;
}
