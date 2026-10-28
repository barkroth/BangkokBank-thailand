import type { Metadata } from "next";
import { CalculatorPage } from "@/components/pages/CalculatorPage";

export const metadata: Metadata = { title: "Smart Calculator — Sales Companion" };

export default function Page() {
  return <CalculatorPage />;
}
