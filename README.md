# Sales Companion — Phase 1 prototype

A frontend prototype of a digital sales companion for relationship officers and insurance specialists.

> **Prototype only.** All products, rates, fees, premiums and campaigns are demo data. Calculations are
> illustrative. This is not an approved Bank product and is not production-ready.

## Run locally

```bash
npm install        # first time only
npm run dev        # start the dev server → http://localhost:3000
```

Other commands:

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run lint`      | ESLint checks                   |
| `npm run typecheck` | TypeScript checks               |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |

To test on a tablet or phone on the same Wi-Fi: `npm run dev -- -H 0.0.0.0`, then open
`http://<your-computer-ip>:3000` on the device.

## Where things live

```
src/
  app/                 layout (fonts, theme script), page, globals.css (theme colours)
  components/
    calculator/        LoanCalculator, CalculatorResults, PaymentSchedule, InsuranceSelector
    products/          ProductCards, ProductIcon
    sections/          Hero, InsuranceSection, CampaignBanner, ProductComparison, ContactSection
    layout/            Header, PresentationBar, Footer, BrandMark, ThemeToggle
    ui/                Button, SliderField, DemoBadge, SectionHeading, Container
  context/             presentation-context (presentation mode on/off)
  hooks/               use-loan-calculator (state + result), use-theme
  lib/
    loan-calculator.ts ← ALL calculation maths (demo). Replace with approved formulas.
    validation.ts      input checks against product limits
    format.ts          THB / % / tenure formatting
    theme.ts           dark/light handling
  data/                demo products, insurance, campaign, contacts, navigation
  types/finance.ts     shared TypeScript types
```

## Configuring contact buttons

Copy `.env.example` to `.env.local`, fill in the public LINE URL, WhatsApp number and phone number, then
restart `npm run dev`. Until set, the buttons show a "Placeholder" badge.
