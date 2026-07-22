# Practice Engine Design System

This is the living documentation for the shared design language used by every application in the Practice Engine suite. Update this file whenever a UI, component, color, typography, spacing, or interaction change is made.

Interactive reference: [design-system.html](design-system.html) (mobile: [design-system-mobile.html](design-system-mobile.html))
Single source of truth for styles: [css/practice-engine.css](css/practice-engine.css)
Shared behaviors: [js/practice-engine.js](js/practice-engine.js)

## Principles

1. One family, many personalities. Every product shares layout, components, and interaction patterns. Only the accent color and product branding change.
2. Healthcare appropriate. Calm neutrals, generous whitespace, clear hierarchy, friendly but professional tone.
3. Accessible by default. Visible focus rings, sufficient contrast, reduced motion support, semantic markup, labeled controls.
4. Responsive always. Every desktop page has a mobile counterpart named with a `-mobile` suffix (rule: `dashboard.html` pairs with `dashboard-mobile.html`). Shared JS auto-routes between the pair at a 768px breakpoint via `data-mobile-pair` / `data-desktop-pair` body attributes.
5. Variables first. All styling flows from CSS custom properties in `css/practice-engine.css`. Never hard-code a color, size, or shadow in page markup when a token exists.

## Brand identity: Evergreen and Ink

The umbrella brand is drawn from the Practice Engine wordmark (green PRACTICE over ink ENGINE). The logo's sage green is refined into a deeper evergreen (`#3E8E5C`, the `--pe-brand-*` family) for contrast on white, paired with an ink neutral (`--pe-ink` `#0B1220`). Products own the vivid accents; the platform identity stays calm and grounded.

Three approved wordmark lockups (see the Brand section of design-system.html, component `.pe-wordmark`):

- **A. Heritage Sage**: original logo green `#6CAC72` with ink. Print and legacy contexts only.
- **B. Evergreen Ink (primary)**: evergreen `#3E8E5C` with ink, plus an inverted version for dark surfaces (`.wm-invert`). The default digital identity.
- **C. Product Spectrum**: ink wordmark with a five-color rule made of the product accents. Suite-level marketing moments only, never inside a single product.

Product nicknames used internally: Recall Health is "RH", the AI Medical Receptionist is "Bella".

## Product theming

Set `data-product` on the `<html>` element and the entire page re-themes. Product identity colors also exist as root tokens (`--pe-recall`, `--pe-bella`, `--pe-chatbot`, `--pe-scheduler`, `--pe-intake`) so suite-level surfaces (landing hero, switcher tiles, spectrum rule) reference them from one place.

| Product | data-product | Accent | Gradient |
|---|---|---|---|
| Suite (default) | (none) | `#3E8E5C` Evergreen | `#3E8E5C to #7CC493` |
| Recall Health (RH) | `recall` | `#F8941D` Orange | `#F8941D to #FBBE6E` |
| AI Medical Receptionist (Bella) | `receptionist` | `#6E62A8` Heliotrope | `#6E62A8 to #A79BD4` |
| AI Chatbot | `chatbot` | `#0D9488` Teal | `#0D9488 to #2DD4BF` |
| Appointment Scheduler | `scheduler` | `#0284C7` Sky | `#0284C7 to #38BDF8` |
| Patient Intake | `intake` | `#B07AA1` Mauve | `#B07AA1 to #D3A8C8` |

Rationale for the July 2026 reassignment: RH was mandated to `#F8941D`, so Scheduler moved off orange to teal; Bella's violet was desaturated to a calmer, healthcare-friendly heliotrope; the umbrella brand took green from the logo, so Intake moved from green to rose to keep every hue distinct.

Each theme overrides `--accent`, `--accent-strong`, `--accent-soft`, `--accent-softer`, `--accent-gradient`, and the five chart tokens below. To add a new product: pick an accent family, add one `[data-product="name"]` block in the CSS (including chart tokens), add an `.app-tile-name` gradient for the app switcher, and add its card to the home pages.

## Categorical chart palettes

Every theme carries `--chart-1` through `--chart-5`: the product accent first, then muted friendly companions, slate last. Any chart with multiple series uses them in order via the `.sw-1` to `.sw-5` background utilities (legend swatches, `.mix-bar` segments, `.hbar-fill` fills) or `.bar.c1` to `.bar.c4` on bar charts.

| Theme | chart-1 | chart-2 | chart-3 | chart-4 | chart-5 |
|---|---|---|---|---|---|
| Suite | #3E8E5C | #5B7DA3 | #D9A253 | #A56A8E | #94A3B8 |
| RH | #F8941D | #5B8FA8 | #86A873 | #8D7CC2 | #94A3B8 |
| Bella | #6E62A8 | #56999C | #C489A5 | #D9A253 | #94A3B8 |
| Chatbot | #0D9488 | #6C8EBF | #E0A458 | #9A7CC4 | #94A3B8 |
| Scheduler | #0284C7 | #6DA873 | #D9A253 | #B07AA1 | #94A3B8 |
| Intake | #B07AA1 | #5F9E8F | #7C86C6 | #D9A253 | #94A3B8 |

Each app dashboard includes at least one chart that demonstrates its palette (RH channel donut, Bella outcomes mix, Chatbot topic bars, Scheduler visit mix, Intake packet status).

## Foundations

### Color

- Neutrals: slate scale `--pe-gray-50` through `--pe-gray-900`. Page background `--surface-page` (gray 50), cards `--surface-card` (white).
- Semantic: `--pe-success` `#16A34A`, `--pe-warning` `#D97706`, `--pe-danger` `#DC2626`, `--pe-info` `#0284C7`, each with a `-soft` background tint.
- Text: `--text-primary` (gray 900), `--text-secondary` (gray 600), `--text-muted` (gray 500), `--text-faint` (gray 400).

### Typography

- UI family: Roboto with system fallbacks (`--font-sans`).
- Brand family (`--font-logo`): Good Times, falling back to Orbitron (loaded from Google Fonts). Good Times is a licensed Typodermic font and is not bundled; place its webfont files in a local `fonts/` folder with an `@font-face` rule to activate it. Used ONLY for the Practice Engine wordmark lockups (`.pe-wordmark`, `.wm-inline`, topbar brand text). Product names use Roboto like the rest of the UI.
- Monospace for token values (`--font-mono`).
- Scale: `--text-xs` 12px, `--text-sm` 13px, `--text-base` 14px (body), `--text-md` 16px, `--text-lg` 18px, `--text-xl` 22px, `--text-2xl` 28px, `--text-3xl` 36px.
- Headings use classes `.h1` to `.h4`; uppercase section labels use `.eyebrow`.

### Spacing, shape, elevation, motion

- Spacing: 4px scale, `--space-1` (4px) through `--space-16` (64px).
- Radius: `--radius-sm` 6, `--radius-md` 10, `--radius-lg` 14, `--radius-xl` 20, `--radius-full` pill.
- Shadows: `--shadow-xs` to `--shadow-lg`, plus `--shadow-accent` for primary button hover.
- Motion: `--duration-fast` 120ms, `--duration-base` 200ms, `--duration-slow` 320ms with `--ease`. `prefers-reduced-motion` disables animation globally.

## Layout

- Desktop shell: `.topbar` (sticky, 60px, brand + product name + search + notifications + app switcher + avatar), `.sidebar` (240px, section labels + `.nav-item` links), `.main` with `.main-inner` capped at 1280px.
- Grid helpers: `.grid-2/-3/-4` (collapse responsively), `.stack`, `.row`, `.row-between`.
- Mobile shell: `.mobile-shell` (max 480px), `.mobile-topbar` (back button + product title + actions), `.mobile-main`, fixed `.mobile-tabbar` bottom navigation with 4 tabs.
- App switcher: waffle icon in the topbar opens a 2-column grid of product tiles; present on every desktop product page for suite-wide navigation.

## Components

All components live in `css/practice-engine.css`. Reuse before creating new ones.

- Buttons: `.btn` + `.btn-primary | -secondary | -soft | -ghost | -danger | -icon`, sizes `.btn-sm | .btn-lg`. Primary uses the product accent.
- Forms: `.field` wrapper with `.field-label`, `.field-hint`, `.field-error-msg`; controls `.input`, `.select`, `.textarea`, `.checkbox-row`, `.radio-row`, `.toggle`; `.input-group` for icon inputs. Error state: add `.field-error` to the field.
- Cards: `.card` with optional `.card-header / .card-body / .card-footer`; `.card-hover` for interactive lift; `.stat-card` with `.stat-label / .stat-value / .stat-delta` and `.stat-icon`.
- Badges: `.badge` + `.badge-accent | -success | -warning | -danger | -info | -neutral`, optional `.dot` status dot.
- Tables: `.table` inside `.table-wrap` (horizontal scroll on small screens); uppercase headers, row hover in the accent softer tint, `.cell-strong / .cell-muted`.
- Navigation: `.nav-item` (sidebar) with `.active` accent state; `.tabs / .tab`; `.segmented` control; `.mobile-tab`.
- Alerts: `.alert` + `.alert-info | -success | -warning | -danger` with icon and `.alert-title`.
- Modals: `.modal-overlay` + `.modal` with header/body/footer. Open with `data-modal-open="id"`, close with `data-modal-close`, backdrop click, or Escape (wired in shared JS).
- Avatars: `.avatar` (initials), sizes `-sm / -lg`, `.avatar-row` pairing.
- Data viz: `.bar-chart` (+`.bar.emph`), `.donut` (conic gradient, `--donut-value`), `.progress`, `.legend`.
- States: `.empty-state` (icon + title + explanation + action), `.skeleton` shimmer blocks, `.spinner`.
- Chat: `.chat-thread`, `.chat-msg` (+`.outbound`), `.chat-bubble`, `.chat-meta`, `.typing-dots`. Outbound bubbles use the product accent.
- Calendar: `.calendar-grid` week view with `.cal-head`, `.cal-time`, `.cal-event` (+ `.ev-success / -info / -warning`, `.span-2`).
- Steps: `.steps / .step` wizard indicator with `.done` and `.active` states.
- Lists (mobile-first): `.list-item` rows with `.list-item-title / -sub`, avatar, trailing badge or `.chevron`.

## Interaction patterns and motion

- Hover: cards lift 2px with a stronger shadow; table rows tint with the accent softer color; primary buttons deepen and glow with `--shadow-accent`.
- Focus: 2px accent outline via `:focus-visible` everywhere.
- Press: buttons translate down 1px.
- Entrance: add `data-animate` for a one-time fade-and-rise on scroll into view (IntersectionObserver in shared JS); stagger siblings with `style="--d: 60ms"` steps. Gated on `html.js` so content never hides without script, and fully disabled under `prefers-reduced-motion`.
- Chrome: top bars use a translucent backdrop blur for depth while scrolling.
- Restraint: animations are one-shot, under 600ms, and never loop except status indicators (typing dots, live call pulse, skeletons).
- Feedback: use alerts for page-level messages, badges for row-level status, toasts/modals sparingly.

## Content rules

- Never use em dashes in UI text, content, documentation, or code comments.
- All demo data must be clearly fictional (suffix names with "(demo)"); never include real patient information (PHI) anywhere in this project.
- Keep desktop and mobile versions visually and functionally consistent.

## Page inventory

| Page | Desktop | Mobile |
|---|---|---|
| Suite home | index.html | index-mobile.html |
| Recall Health | recall-health.html | recall-health-mobile.html |
| AI Medical Receptionist | ai-receptionist.html | ai-receptionist-mobile.html |
| AI Chatbot | ai-chatbot.html | ai-chatbot-mobile.html |
| Appointment Scheduler | appointment-scheduler.html | appointment-scheduler-mobile.html |
| Patient Intake | patient-intake.html | patient-intake-mobile.html |
| Design system reference | design-system.html | design-system-mobile.html |

## Changelog

- 2026-07-22 (v4): Patient Intake accent changed from rose to mauve `#B07AA1` (previously RH's chart-4 companion); RH's chart-4 slot backfilled with soft violet `#8D7CC2`. Product names reverted to Roboto; Good Times/Orbitron is now reserved for the wordmark only. Landing hero pill enlarged, vertical spacing tightened so product cards sit higher. Design System added to the app switcher menu on all product pages (`.app-tile-design`).

- 2026-07-22 (v3): Typography switched to Roboto (UI) and Good Times with Orbitron fallback (brand and product names via `--font-logo`). Chatbot and Scheduler accents swapped (Chatbot now teal, Scheduler now sky). Landing page simplified: centered hero retained after trying a split layout; product cards reduced to icon, badge, name, and tagline with the whole card clickable; hero stats, section header, hero CTAs, and topbar nav removed at client request.

- 2026-07-22 (v2): Brand and color system overhaul. Umbrella brand adopted Evergreen and Ink from the logo with three wordmark lockups (`.pe-wordmark`). Accent reassignment: RH to `#F8941D` orange (mandated), Bella desaturated to heliotrope `#6E62A8`, Scheduler to teal, Intake to rose. Added per-theme categorical chart tokens (`--chart-1..5`) with `.sw-N` / `.bar.cN` utilities, `.mix-bar`, and `.hbar-*` components; each app page now demonstrates its palette in a chart. Landing page redesigned to premium standard (mesh hero, wordmark, richer product cards with taglines and metrics, dark platform band). Added scroll-reveal micro-animations (`data-animate`) and translucent blurred top bars.
- 2026-07-22: Initial system. Tokens, product themes, core components, suite home, five product showcase pages, design system reference, desktop and mobile versions of all pages.
