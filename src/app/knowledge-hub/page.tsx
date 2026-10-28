import type { Metadata } from "next";
import { PlannedModule } from "@/components/sections/PlannedModule";

export const metadata: Metadata = { title: "Knowledge Hub — Sales Companion" };

export default function Page() {
  return <PlannedModule moduleKey="knowledgeHub" />;
}
