# Coco AI — PRD

## Original problem statement
Clone `https://github.com/alifnewone7-create/cc-run.git`, run the site as-is, then apply UI changes requested by the user (Banglish). Latest request (June 2026): premium professional AI/trading redesign of the home page, fully responsive, extra sections based on full site context, and a "coco-engine" diagram in the style of a reference image (central logo circle, colorful app-style tiles connected with right-angle lines and junction dots).

## Stack
- Frontend: Next.js 16 (App Router), React 19, Tailwind v4, custom design system in `app/coco.css`. Node 22 required. Production build: `yarn build` then `sudo supervisorctl restart frontend`.
- Backend: FastAPI (`/api`), MongoDB. Firebase auth + Groq AI SDK exist in repo.

## Implemented
- 2026-06 (earlier): rounded-rectangle buttons (10px), removed 3 hero stat items, darker hero gradient.
- 2026-06 (this session):
  - `components/coco/coco-engine.tsx` rewritten: constellation diagram — white core circle with Coco logo + halo, 7 gradient tiles (OTC, Real Chart, Live, Future, News, Risk Guard, Market Feed), orthogonal SVG wires with animated pulses and colored junction dots. Separate desktop (720x400) and mobile (360x460) layouts, legend chips.
  - New sections: `coco-ticker.tsx` (marquee market tape, MOCK data), `coco-modules.tsx` (bento of 5 modules with OTC verdict mock), `coco-how.tsx` (3 steps), `coco-terminal.tsx` (client, rotating MOCK signal feed), `coco-testimonials.tsx`, `coco-faq.tsx` (native details accordion).
  - `landing-page.tsx` composition updated; navbar links: Engine, Modules, How it works, Access, FAQ, Support.
  - CSS additions in `coco.css` (tiles, core, tape, glass cards, steps, terminal rows, FAQ, testimonial quote).
  - Tested via testing agent (`/app/test_reports/iteration_1.json`): all pass, no hydration errors, no mobile overflow.

- 2026-06 (follow-up): removed "coco-engine · 7 modules · one core" label; custom premium SVG glyphs in `components/coco/coco-glyphs.tsx`; wire pulse now sequential one-line-at-a-time (`.coco-dash-seq`, 0.5s per wire) and fixed on mobile (root cause: bbox-based gradient stroke was transparent on vertical segments + duplicate gradient id across hidden SVG; now solid white pulse with blur glow filter, per-layout ids).

- 2026-06: removed engine legend chips and market ticker section (coco-ticker.tsx deleted); hero bottom padding rebalanced.

- 2026-06: colour grading shifted from blue to dark purple/indigo (CSS vars --iris/--cyan, hero + shade gradients, buttons, cards, glass, steps, tile accents).

- 2026-07: `/dashboard` rebuilt in the home-page design language. Three sections only: (1) Profile — dark `coco-dark` zone with hero candle/glow backdrop, glass operator panel (avatar ring, tier pill, email/UID-copy/member-since meta, CTAs); (2) Tier — `coco-light coco-curve-top` (same curve as home) with `coco-shade` plan card (limit, reset note, tier ladder, upgrade CTA) + white daily-quota panel (per-tool bars, locked state for Free); (3) Tools — white panel with 6 gradient-tile tool cards. New files: `components/dashboard/dash-glyphs.tsx` (custom premium SVG glyph set), `dash-profile.tsx`, `dash-tier.tsx`, `dash-tools.tsx`; `dashboard-content.tsx` now just composes them. CSS block `Dashboard v2` appended to `coco.css`. Verified desktop 1920 + mobile 390, no overflow.

- 2026-07: analyzer pages (`/otc-chart-analyzer`, `/real-chart-analyzer`) redesigned with the home design system: `analyzer-view.tsx` now renders coco-dark hero zone (CocoHeroBg backdrop, eyebrow/title/lead, mode switch row, glass `.coco-analyzer-panel` wrapping ChartAnalyzer) + light `coco-curve-top` "three steps" section; StarField dropped. `.coco-analyzer` scope re-grades app tokens (--primary/--accent) and re-skins surface-luxe/border-luxe/btn-luxe to the iris purple grading. Broker arc picker (`lib/brokers.ts`, arc cards in the analyzer bottom sheet + `analyzer-mode-switch.tsx` chip/modal) added: Binolla / Quotex / Pocket Option, stored in localStorage, OTC↔Real instant route switch.

## Backlog
- P1: Wire ticker/terminal to real data (`/api/signals/live`) if desired.
- P2: Dashboard pages restyle to match new home design system.
- P2: Footer link columns (Modules / Legal / Support).
