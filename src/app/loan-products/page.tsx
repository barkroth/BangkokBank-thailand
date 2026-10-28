import type { Metadata } from "next";
import { LoanProductsPage } from "@/components/pages/LoanProductsPage";

export const metadata: Metadata = { title: "Loan Products — Sales Companion" };

export default function Page() {
  return <LoanProductsPage />;
}
