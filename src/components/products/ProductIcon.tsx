import { Briefcase, Car, House, Wallet, type LucideIcon } from "lucide-react";
import type { LoanProductId } from "@/types/finance";

const ICONS: Record<LoanProductId, LucideIcon> = {
  personal: Wallet,
  home: House,
  auto: Car,
  sme: Briefcase,
};

export function ProductIcon({ id, className }: { id: LoanProductId; className?: string }) {
  const Icon = ICONS[id];
  return <Icon className={className} aria-hidden />;
}
