import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { LANGUAGE_INIT_SCRIPT } from "@/lib/language";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Thai fonts: Manrope and Cormorant have no Thai letters, so these cover them.
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sales Companion — Prototype",
  description: "Prototype digital sales companion for relationship officers. Demo data and illustrative calculations only.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { color: "#002850" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme / data-lang default to light / English and are updated before paint by the init scripts.
    <html
      lang="en"
      data-theme="light"
      data-lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} ${notoSansThai.variable} ${notoSerifThai.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
