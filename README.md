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
  app/                 layout (fonts, theme script, providers), one folder per route, globals.css (theme colours)
                       /  /calculator  /loan-products  /cross-sell  /knowledge-hub  /ai-assistant  /esg-navigator
  components/
    assistant/         AssistantWorkspace, ChatMessageView, ChatComposer, SuggestedPrompts
    calculator/        LoanCalculator, CalculatorResults, PaymentSchedule, InsuranceSelector
    products/          ProductCards, ProductIcon
    pages/             CalculatorPage, LoanProductsPage, CrossSellPage (route content)
    sections/          Dashboard, PlannedModule, InsuranceSection, CampaignBanner, ProductComparison, ContactSection
    layout/            AppShell, Header, PageHeader, PresentationBar, Footer, BrandMark, ThemeToggle
    ui/                Button, SliderField, DemoBadge, Tabs, Container
  context/             presentation-context (presentation mode), calculator-context (calculator state shared across routes),
                       assistant-context (AI Assistant conversation state)
  hooks/               use-loan-calculator (state + result), use-theme
  lib/
    loan-calculator.ts ← ALL calculation maths (demo). Replace with approved formulas.
    validation.ts      input checks against product limits
    format.ts          THB / % / tenure formatting
    theme.ts           dark/light handling
    assistant/         demo-responder.ts (scripted demo answers, demo data only) + assistant-service.ts
                       (AssistantService interface; swap in a server-side backend later)
  data/                demo products, insurance, campaign, contacts, navigation
  types/finance.ts     shared TypeScript types
```

## Configuring contact buttons

Copy `.env.example` to `.env.local`, fill in the public LINE URL, WhatsApp number and phone number, then
restart `npm run dev`. Until set, the buttons show a "Placeholder" badge.
