"use client";

import type { ReactNode } from "react";
import { usePresentation } from "@/context/presentation-context";
import { Header } from "@/components/layout/Header";
import { PresentationBar } from "@/components/layout/PresentationBar";
import { Footer } from "@/components/layout/Footer";

/**
 * Persistent frame for every route. On desktop/tablet-landscape the frame is
 * exactly one viewport tall and only <main> may scroll internally; on narrow
 * screens the page scrolls normally.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { isPresenting } = usePresentation();

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip lg:h-dvh">
      {isPresenting ? <PresentationBar /> : <Header />}
      <main className="flex min-h-0 flex-1 flex-col lg:overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
