import type { AssistantService } from "@/types/assistant";
import { respondToDemoPrompt } from "@/lib/assistant/demo-responder";

/**
 * Scripted demo backend. It answers from src/lib/assistant/demo-responder.ts
 * after a short delay so the loading state is visible; no network call is made.
 *
 * To connect a real model later, implement `AssistantService` with a call to a
 * server-side route (e.g. app/api/assistant/route.ts) that holds the API key,
 * and pass it to <AssistantChatProvider service={...}>. Never call a model
 * provider directly from the browser.
 */
export function createDemoAssistantService(delayMs = 650): AssistantService {
  return {
    reply(request, signal) {
      const lastUserMessage = [...request.messages].reverse().find((message) => message.role === "user");

      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          try {
            resolve(respondToDemoPrompt(lastUserMessage?.text ?? "", request.intentHint));
          } catch (error) {
            reject(error);
          }
        }, delayMs);

        signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(timer);
            reject(new DOMException("Aborted", "AbortError"));
          },
          { once: true },
        );
      });
    },
  };
}

export const demoAssistantService = createDemoAssistantService();
