/**
 * Types for the AI Sales Assistant.
 *
 * The UI only depends on these shapes and on the `AssistantService` interface,
 * so the scripted demo can later be swapped for a real (server-side) backend
 * without touching the components.
 */

import type { InsuranceOptionId, Language, LoanProductId, Localized } from "@/types/finance";

/** Text shown in a reply: plain (e.g. from a real model) or localized (demo content). */
export type AssistantText = string | Localized;

/**
 * illustrative = demo data / template; unverified = verified information is missing;
 * safety = a limit the assistant must respect; info = neutral note.
 */
export type NoticeTone = "illustrative" | "unverified" | "safety" | "info";

export interface AssistantLink {
  /** Must be an existing app route. */
  href: string;
  label: AssistantText;
  /** Optional: load this product into the calculator before navigating. */
  productId?: LoanProductId;
  /** Optional: include this protection plan in the calculator before navigating. */
  insuranceId?: InsuranceOptionId;
}

export type AssistantBlock =
  | { type: "paragraph"; text: AssistantText }
  | { type: "heading"; text: AssistantText }
  | { type: "list"; items: AssistantText[]; ordered?: boolean }
  | { type: "table"; columns: AssistantText[]; rows: AssistantText[][] }
  | { type: "draft"; title: AssistantText; text: AssistantText }
  | { type: "notice"; tone: NoticeTone; text: AssistantText }
  | { type: "links"; links: AssistantLink[] };

export type AssistantIntent =
  | "greeting"
  | "meetingPrep"
  | "compareLoans"
  | "insurance"
  | "documents"
  | "crossSell"
  | "navigate"
  | "eligibility"
  | "sensitive"
  | "unknown";

export interface AssistantReply {
  blocks: AssistantBlock[];
  /** "demo" = deterministic scripted answer; no AI model involved. */
  source: "demo" | "model";
  /** True when the assistant could not answer from the information available. */
  unanswered?: boolean;
}

export interface UserMessage {
  id: string;
  role: "user";
  text: string;
}

export interface AssistantMessage {
  id: string;
  role: "assistant";
  reply: AssistantReply;
}

export type ChatMessage = UserMessage | AssistantMessage;

export interface AssistantRequest {
  /** Full conversation so far, ending with the user's latest message. */
  messages: ChatMessage[];
  language: Language;
  /** Set when the user picked a suggested prompt, so the demo answers deterministically. */
  intentHint?: AssistantIntent;
}

export interface AssistantService {
  reply(request: AssistantRequest, signal?: AbortSignal): Promise<AssistantReply>;
}

export interface SuggestedPrompt {
  id: string;
  label: Localized;
  intent: AssistantIntent;
}
