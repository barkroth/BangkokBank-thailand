import type { Metadata } from "next";
import { PlannedModule } from "@/components/sections/PlannedModule";

export const metadata: Metadata = { title: "ESG Navigator — Sales Companion" };

export default function Page() {
  return <PlannedModule moduleKey="esgNavigator" />;
}
