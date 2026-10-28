"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/ui";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/** Simple accessible tab set used to keep a module's content on one screen. */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div>
      <div role="tablist" aria-label={label} className="inline-flex rounded-full border border-line-strong bg-card p-1">
        {items.map((item) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "min-h-10 rounded-full px-5 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="mt-5">
        {active.content}
      </div>
    </div>
  );
}
