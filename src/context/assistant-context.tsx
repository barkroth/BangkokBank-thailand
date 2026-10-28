"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AssistantIntent, AssistantService, ChatMessage, UserMessage } from "@/types/assistant";
import { demoAssistantService } from "@/lib/assistant/assistant-service";
import { useI18n } from "@/hooks/use-i18n";

export type ChatStatus = "idle" | "loading" | "error";

interface AssistantChatValue {
  messages: ChatMessage[];
  status: ChatStatus;
  send: (text: string, intentHint?: AssistantIntent) => void;
  /** Re-sends the last request after an error. */
  retry: () => void;
  /** Starts a new conversation and cancels any pending reply. */
  clear: () => void;
}

const AssistantChatContext = createContext<AssistantChatValue | null>(null);

// Not crypto.randomUUID(): that needs a secure context, and the app is also opened over plain http on the LAN.
let sequence = 0;
const nextId = () => `msg-${Date.now().toString(36)}-${sequence++}`;

/**
 * Conversation state for the AI Assistant. Lives above the routes so a chat
 * survives opening the calculator from an answer and coming back.
 */
export function AssistantChatProvider({
  children,
  service = demoAssistantService,
}: {
  children: ReactNode;
  service?: AssistantService;
}) {
  const { lang } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const controllerRef = useRef<AbortController | null>(null);
  const pendingRef = useRef<{ history: ChatMessage[]; intentHint?: AssistantIntent } | null>(null);

  const request = useCallback(
    (history: ChatMessage[], intentHint?: AssistantIntent) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      pendingRef.current = { history, intentHint };
      setStatus("loading");

      service
        .reply({ messages: history, language: lang, intentHint }, controller.signal)
        .then((reply) => {
          if (controller.signal.aborted) return;
          setMessages((current) => [...current, { id: nextId(), role: "assistant", reply }]);
          pendingRef.current = null;
          setStatus("idle");
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setStatus("error");
        });
    },
    [service, lang],
  );

  const send = useCallback(
    (rawText: string, intentHint?: AssistantIntent) => {
      const text = rawText.trim();
      if (!text || status === "loading") return;
      const userMessage: UserMessage = { id: nextId(), role: "user", text };
      const history = [...messages, userMessage];
      setMessages(history);
      request(history, intentHint);
    },
    [messages, status, request],
  );

  const retry = useCallback(() => {
    if (pendingRef.current) request(pendingRef.current.history, pendingRef.current.intentHint);
  }, [request]);

  const clear = useCallback(() => {
    controllerRef.current?.abort();
    pendingRef.current = null;
    setMessages([]);
    setStatus("idle");
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const value = useMemo(() => ({ messages, status, send, retry, clear }), [messages, status, send, retry, clear]);

  return <AssistantChatContext.Provider value={value}>{children}</AssistantChatContext.Provider>;
}

export function useAssistantChat(): AssistantChatValue {
  const context = useContext(AssistantChatContext);
  if (!context) {
    throw new Error("useAssistantChat must be used inside <AssistantChatProvider>");
  }
  return context;
}
