"use client";

import type { ReactNode } from "react";
import { PresentationProvider } from "@/context/presentation-context";
import { CalculatorProvider } from "@/context/calculator-context";
import { AssistantChatProvider } from "@/context/assistant-context";
import { AppShell } from "@/components/layout/AppShell";

/** Client-side state shared by all routes, plus the persistent header/footer frame. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PresentationProvider>
      <CalculatorProvider>
        <AssistantChatProvider>
          <AppShell>{children}</AppShell>
        </AssistantChatProvider>
      </CalculatorProvider>
    </PresentationProvider>
  );
}
