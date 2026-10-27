const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const currencyFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 1234567 -> "1,234,567" */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** 1234.5 -> "฿1,234.50" (or "฿1,235" when `whole` is true) */
export function formatTHB(value: number, options: { whole?: boolean } = {}): string {
  return `฿${options.whole ? numberFormatter.format(value) : currencyFormatter.format(value)}`;
}

/** Short form for large amounts: 3000000 -> "฿3M", 250000 -> "฿250K" */
export function formatTHBCompact(value: number): string {
  if (value >= 1_000_000) return `฿${trimZeros(value / 1_000_000)}M`;
  if (value >= 1_000) return `฿${trimZeros(value / 1_000)}K`;
  return `฿${value}`;
}

/** 6.5 -> "6.50%" */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

/** 36 -> "36 months (3 yrs)" */
export function formatTenure(months: number): string {
  const years = months / 12;
  const yearsLabel = Number.isInteger(years) ? `${years} yr${years === 1 ? "" : "s"}` : `${trimZeros(years)} yrs`;
  return `${months} months (${yearsLabel})`;
}

function trimZeros(value: number): string {
  return Number(value.toFixed(1)).toString();
}

/** Parses user text like "1,200,000" or "6.5". Returns null if empty/invalid. */
export function parseNumericInput(raw: string): number | null {
  const cleaned = raw.replace(/[,\s฿%]/g, "");
  if (cleaned === "" || cleaned === "." || cleaned === "-") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}
