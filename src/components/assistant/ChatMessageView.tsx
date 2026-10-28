"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Copy, Info, ShieldAlert, Sparkles, type LucideIcon } from "lucide-react";
import type { AssistantBlock, AssistantLink, AssistantText, ChatMessage, NoticeTone } from "@/types/assistant";
import { useCalculator } from "@/context/calculator-context";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/ui";
import { DemoBadge } from "@/components/ui/DemoBadge";

/** Resolves plain or localized reply text in the current language. */
function useResolve() {
  const { text } = useI18n();
  return (value: AssistantText) => (typeof value === "string" ? value : text(value));
}

export function ChatMessageView({ message }: { message: ChatMessage }) {
  const { t } = useI18n();

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-wrap text-primary-fg sm:max-w-[75%]">
          <span className="sr-only">{t.assistant.you}: </span>
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <AssistantFrame>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-fg">{t.assistant.assistantName}</span>
        <DemoBadge tone="neutral">{t.assistant.demoResponse}</DemoBadge>
      </div>
      {message.reply.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </AssistantFrame>
  );
}

/** Avatar + bubble used for replies, the loading indicator and the error state. */
export function AssistantFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink" aria-hidden>
        <Sparkles className="size-4" />
      </span>
      <div
        className={cn(
          "min-w-0 max-w-3xl flex-1 space-y-3 rounded-3xl rounded-tl-lg border border-line bg-card px-4 py-4 shadow-card sm:px-5",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

const NOTICE_STYLES: Record<NoticeTone, { icon: LucideIcon; className: string }> = {
  illustrative: { icon: Info, className: "border-accent/40 bg-accent-soft" },
  unverified: { icon: CircleAlert, className: "border-line-strong bg-card-2" },
  safety: { icon: ShieldAlert, className: "border-danger/30 bg-danger-soft" },
  info: { icon: Info, className: "border-blue/30 bg-blue-soft" },
};

function Block({ block }: { block: AssistantBlock }) {
  const resolve = useResolve();
  const { t } = useI18n();

  switch (block.type) {
    case "paragraph":
      return <p className="text-sm leading-relaxed text-fg">{resolve(block.text)}</p>;

    case "heading":
      return (
        <h3 className="pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">{resolve(block.text)}</h3>
      );

    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index} className="pl-1 leading-relaxed">
          {resolve(item)}
        </li>
      ));
      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-fg marker:text-accent-ink">{items}</ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg marker:text-accent-ink">{items}</ul>
      );
    }

    case "table":
      return (
        // Wide tables scroll inside their own box, never the page.
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-136 text-left text-sm">
            <thead className="bg-card-2">
              <tr>
                {block.columns.map((column, index) => (
                  <th key={index} scope="col" className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-subtle">
                    {resolve(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row" className="px-3 py-2.5 align-top font-semibold text-fg">
                        {resolve(cell)}
                      </th>
                    ) : (
                      <td key={cellIndex} className="px-3 py-2.5 align-top text-muted tabular-nums">
                        {resolve(cell)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "draft":
      return <Draft title={resolve(block.title)} text={resolve(block.text)} />;

    case "notice": {
      const { icon: Icon, className } = NOTICE_STYLES[block.tone];
      return (
        <div className={cn("flex gap-2.5 rounded-2xl border px-3.5 py-3 text-sm leading-relaxed text-fg", className)}>
          <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">{t.assistant.notices[block.tone]}: </span>
            {resolve(block.text)}
          </p>
        </div>
      );
    }

    case "links":
      return (
        <div className="flex flex-wrap gap-2 pt-1">
          {block.links.map((link, index) => (
            <ReplyLink key={`${link.href}-${index}`} link={link} />
          ))}
        </div>
      );
  }
}

/** Link to an existing route; can preload a product or plan into the calculator first. */
function ReplyLink({ link }: { link: AssistantLink }) {
  const resolve = useResolve();
  const calculator = useCalculator();

  const onClick = () => {
    if (link.productId) calculator.selectProduct(link.productId);
    if (link.insuranceId) calculator.setInsuranceId(link.insuranceId);
  };

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-accent/60 px-4 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {resolve(link.label)}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

function Draft({ title, text }: { title: string; text: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. plain http on the LAN); the text stays selectable.
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface-2">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          {copied ? t.assistant.copied : t.assistant.copy}
        </button>
      </div>
      <p className="px-3.5 py-3 text-sm leading-relaxed whitespace-pre-line text-fg">{text}</p>
    </div>
  );
}
