"use client";

import { X } from "lucide-react";
import { usePresentation } from "@/context/presentation-context";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";

/** Minimal customer-facing top bar shown during presentation mode. */
export function PresentationBar() {
  const { exitPresentation } = usePresentation();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-header backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <BrandMark showBadge={false} />
        <Button variant="secondary" size="lg" onClick={exitPresentation}>
          <X className="size-5" aria-hidden />
          Exit<span className="hidden sm:inline"> presentation</span>
        </Button>
      </Container>
    </header>
  );
}
