"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssistantWorkspace } from "@/components/assistant/AssistantWorkspace";

export function AiAssistantPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader title={t.assistant.title} description={t.assistant.subtitle} />
      <Container className="flex min-h-0 flex-1 pb-5">
        <AssistantWorkspace />
      </Container>
    </>
  );
}
