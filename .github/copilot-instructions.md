# EcoCart Copilot Instructions

Concise operating guide for AI assistants working in this repository. Focus on implementing a React + Tailwind sustainable e‑commerce UI per the PRD (`ecocart_complete_doc.md`) and the rules (`rules file.md`). Keep answers action‑oriented, avoid generic fluff.

## 1. Project Snapshot
- Purpose: Sustainable marketplace emphasizing transparent environmental impact metrics (CO₂ saved, trees planted, water conserved, etc.).
- Current State: Greenfield – only PRD + rules present. You will be scaffolding the entire frontend.
- Target Stack (from PRD): React 18, React Router, Tailwind CSS (with custom tokens), shadcn/ui components, single‑page app.

## 2. Architecture Expectations
- SPA with route groups: `/` (home), `/products`, `/products/:id`, `/categories/:slug`, `/impact`, `/account/*` (dashboard, orders, sustainability), `/about`, `/checkout`.
- Global layout: Fixed header (64px) + main scroll area + footer; responsive breakpoints: sm (≤768), md (≤1024), lg (≤1280), xl (≥1280).
- Design tokens: Implement Tailwind config reflecting spacing, radius, shadows, colors from PRD. Prefer Tailwind utilities; only create custom CSS for tokens / keyframes.
- State: Start with local state + context (CartContext, UserContext, ImpactMetricsContext). Defer external store until complexity demands.
- Code splitting: Lazy‑load heavy routes (product detail, account dashboard) using `React.lazy` + `Suspense`.

## 3. File / Directory Conventions (proposed)
```
src/
  main.tsx               # React root + Router
  App.tsx                # Layout shell
  components/            # Reusable UI (Header, Hero, ProductCard, ImpactCounters, NewsletterForm, etc.)
  features/
    cart/                # Cart context/hooks/components
    products/            # Catalog grid, filters, product detail
    impact/              # Impact metrics, counters
    account/             # Dashboard, orders, preferences
  routes/                # Route-level components if separated
  lib/                   # Utility functions (formatting, calculations)
  types/                 # Shared TypeScript types (Product, ImpactMetrics)
  styles/                # Tailwind directives, base.css
```
Use PascalCase for components, camelCase for functions/variables, kebab-case for file names only when purely CSS/assets.

## 4. UI Patterns & Key Components
- Header: Sticky, desktop nav + mobile drawer, search bar (placeholder; stub filtering logic).
- Hero: Gradient bg (emerald/light), headline + CTA buttons.
- ImpactCounter: Animated counters (stub with setInterval or IntersectionObserver; replace with real API later).
- ProductCard: Image (4:3), sustainability badge (score 0–100), carbon savings badge, hover elevation.
- Grids: Use Tailwind responsive grid classes from PRD specs (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- Accessibility: Provide alt text, visible focus rings, semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`), aria-labels for interactive icons.

## 5. Styling & Tokens
Implement Tailwind config mapping PRD colors:
- Emerald shades: primary actions (#059669 / #10b981 hover darken)
- Background: #f9fafb; Text: gray-900 / gray-500; Status colors: success (#22c55e), warning (#f59e0b).
Add custom utilities for spacing & radius tokens if not default. Shadows: map to Tailwind (`shadow-sm`, custom `shadow-lg`).

## 6. Data & Placeholder Strategy
No backend yet: Use local mock data modules (e.g., `mockProducts.ts`, `mockImpact.ts`). Keep deterministic values; expose interfaces in `types/`.
- Product: { id, name, description, price, sustainabilityScore (0–100), carbonSavedKg, rating (0–5), images[] }
- ImpactMetrics: { co2SavedKg, treesPlanted, plasticReducedKg, waterSavedLiters }
Provide TODO comments where API integration should occur.

## 7. Performance Considerations (Early)
- Lazy images (`loading="lazy"`).
- Use responsive `srcset` for product images placeholders.
- Defer non-critical sections (e.g., testimonials) with dynamic import.

## 8. Testing Approach (Initial)
Until real backend, add light component tests (if test framework added later). For now, keep components pure & prop-driven to ease future tests. Avoid side effects in render.

## 9. Agent Operating Rules Integration
- Always consult `rules file.md` Golden Rule: fetch docs (React, Tailwind, React Router, shadcn/ui) before tooling or large edits.
- Maintain minimal, atomic patches; do not introduce deps beyond React Router, Tailwind, shadcn/ui without justification.
- Document deviations from PRD in comments + follow-up list.

## 10. Incremental Delivery Order
1. Toolchain setup (package.json, Vite or similar, Tailwind config).
2. Global layout + theming tokens.
3. Core components: Header, Hero, ImpactCounter, ProductCard.
4. Routing scaffold.
5. Mock data + Product grid.
6. Product detail page.
7. Account dashboard shell.
8. Checkout/cart flow (basic interactions).

## 11. Follow-Up / Deferred (Track in PRs)
- Real API integration & data fetching layer.
- Authentication & protected routes.
- Advanced search & sustainability filters (sliders, badges).
- Comparison feature & sustainability calculator.
- Service worker + performance budgets.

## 12. Examples
- Sustainability badge: `<span className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded">{score}</span>`
- Carbon savings badge: `<span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{carbonSavedKg.toFixed(1)} kg CO₂</span>`

Stay aligned with the PRD’s layout & spacing rules; if unsure, re-open `ecocart_complete_doc.md` and reconcile before coding.
