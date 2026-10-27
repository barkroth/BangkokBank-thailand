"use client";

import { useMemo, useState } from "react";
import type { ScheduleRow } from "@/types/finance";
import { summariseScheduleByYear } from "@/lib/loan-calculator";
import { formatTHB } from "@/lib/format";
import { cn } from "@/lib/ui";

type View = "monthly" | "yearly";

export function PaymentSchedule({ schedule }: { schedule: ScheduleRow[] }) {
  const [view, setView] = useState<View>(schedule.length > 60 ? "yearly" : "monthly");
  const rows = useMemo(() => (view === "yearly" ? summariseScheduleByYear(schedule) : schedule), [schedule, view]);
  const hasInsurance = schedule.some((row) => row.insurance > 0);

  return (
    <div id="payment-schedule" className="animate-fade-up mt-4">
      <div className="mb-3 inline-flex rounded-full border border-line-strong p-1" role="group" aria-label="Schedule view">
        {(["monthly", "yearly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
            className={cn(
              "min-h-9 rounded-full px-4 text-sm font-semibold capitalize transition-colors",
              view === option ? "bg-gold-soft text-gold-ink" : "text-muted hover:text-fg",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {/* The table scrolls inside its own box on small screens, never the page. */}
      <div className="max-h-96 overflow-auto rounded-2xl border border-line">
        <table className="w-full min-w-[520px] text-right text-sm tabular-nums">
          <thead className="sticky top-0 bg-card-2 text-xs uppercase tracking-wider text-subtle">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                {view === "yearly" ? "Year" : "Month"}
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Payment</th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Principal</th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Interest</th>
              {hasInsurance && <th scope="col" className="px-3 py-2.5 font-semibold">Insurance</th>}
              <th scope="col" className="px-3 py-2.5 font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-muted">
            {rows.map((row) => (
              <tr key={row.period} className="hover:bg-card-2/60">
                <td className="px-3 py-2 text-left font-medium text-fg">{row.period}</td>
                <td className="px-3 py-2 text-fg">{formatTHB(row.payment)}</td>
                <td className="px-3 py-2">{formatTHB(row.principal)}</td>
                <td className="px-3 py-2">{formatTHB(row.interest)}</td>
                {hasInsurance && <td className="px-3 py-2">{formatTHB(row.insurance)}</td>}
                <td className="px-3 py-2">{formatTHB(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
