import type { Metadata } from "next";
import { EsgNavigatorPage } from "@/components/pages/EsgNavigatorPage";

export const metadata: Metadata = { title: "ESG Navigator — Sales Companion" };

export default function Page() {
  return <EsgNavigatorPage />;
}
