import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/ui";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-gold";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary-hover shadow-card",
  secondary: "border border-line-strong bg-card text-fg hover:border-gold/60 hover:bg-card-2",
  ghost: "text-muted hover:bg-card hover:text-fg",
  "outline-gold": "border border-gold/60 text-gold-ink hover:bg-gold-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
  xl: "min-h-14 px-8 text-lg",
};

/** Class string for button-styled elements (also usable on <a> links). */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string): string {
  return cn(base, variants[variant], sizes[size], extra);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
