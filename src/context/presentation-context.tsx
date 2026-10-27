"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface PresentationContextValue {
  isPresenting: boolean;
  enterPresentation: () => void;
  exitPresentation: () => void;
}

const PresentationContext = createContext<PresentationContextValue | null>(null);

/**
 * Presentation mode = simplified, customer-facing layout.
 * Components read `isPresenting` to hide staff controls and enlarge figures.
 */
export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isPresenting, setIsPresenting] = useState(false);

  const enterPresentation = useCallback(() => {
    setIsPresenting(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const exitPresentation = useCallback(() => setIsPresenting(false), []);

  // Allow the Escape key to leave presentation mode on keyboards/desktops.
  useEffect(() => {
    if (!isPresenting) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPresenting(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPresenting]);

  const value = useMemo(
    () => ({ isPresenting, enterPresentation, exitPresentation }),
    [isPresenting, enterPresentation, exitPresentation],
  );

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
}

export function usePresentation(): PresentationContextValue {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error("usePresentation must be used inside <PresentationProvider>");
  }
  return context;
}
