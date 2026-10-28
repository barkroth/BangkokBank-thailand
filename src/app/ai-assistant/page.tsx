import type { Metadata } from "next";
import { AiAssistantPage } from "@/components/pages/AiAssistantPage";

export const metadata: Metadata = { title: "AI Sales Assistant — Sales Companion" };

export default function Page() {
  return <AiAssistantPage />;
}
