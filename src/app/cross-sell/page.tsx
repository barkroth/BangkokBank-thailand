import type { Metadata } from "next";
import { CrossSellPage } from "@/components/pages/CrossSellPage";

export const metadata: Metadata = { title: "Cross-sell — Sales Companion" };

export default function Page() {
  return <CrossSellPage />;
}
