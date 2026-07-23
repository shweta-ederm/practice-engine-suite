# Practice Engine Design System

This is the living documentation for the shared design language used by every application in the Practice Engine suite. Update this file whenever a UI, component, color, typography, spacing, or interaction change is made.

Interactive reference: [design-system.html](design-system.html)
Single source of truth for styles: [css/practice-engine.css](css/practice-engine.css)
Shared behaviors: [js/practice-engine.js](js/practice-engine.js)

## Principles

1. One family, many personalities. Every product shares layout, components, and interaction patterns. Only the accent color and product branding change.
2. Healthcare appropriate. Calm neutrals, generous whitespace, clear hierarchy, friendly but professional tone.
3. Accessible by default. Visible focus rings, sufficient contrast, reduced motion support, semantic markup, labeled controls.
4. Responsive always. Desktop pages adapt down to tablet widths. Dedicated `-mobile` companion pages are deferred by client decision and will return later using the same naming rule.
5. Variables first. All styling flows from CSS custom properties in `css/practice-engine.css`. Never hard-code a color, size, or shadow in page markup when a token exists.

## Brand identity: the Product Spectrum logo

Practice Engine has ONE logo: PRACTICE in the original logo green (`--pe-logo-green` `#6CAC72`) over the product spectrum rule, with ENGINE in ink. The spectrum rule (`--pe-spectrum`) carries one stripe per product in suite order, so the mark grows as products are added. The evergreen `--pe-brand-*` family remains the suite's UI accent (buttons, admin theming); the logo green is reserved for the wordmark.

Lockups and sizes (see the Brand section of design-system.html):

- **Full lockup** (`.pe-wordmark.wm-lg`): hero surfaces such as the landing page and sign-in.
- **Standard** (`.pe-wordmark`): cards and documents.
- **Inline** (`.wm-inline`): single-line version with the spectrum underneath, for top bars and footers.
- **Icon / app tile / favicon** (`.pe-mark`, sized via `--mark-size`): PE monogram over the spectrum on an ink rounded square at 80, 48, and 32px; at 16px the monogram drops and only the spectrum remains.

Rules: PRACTICE is always logo green, ENGINE is always ink, the spectrum always lists product colors in suite order, and the spectrum is never reused as decoration inside a product.

Product nicknames used internally: Recall Health is "RH", the AI Medical Receptionist is "Bella".

## Product theming

Set `data-product` on the `<html>` element and the entire page re-themes. Product identity colors also exist as root tokens (`--pe-recall`, `--pe-bella`, `--pe-chatbot`, `--pe-scheduler`, `--pe-intake`) so suite-level surfaces (landing hero, switcher tiles, spectrum rule) reference them from one place.

| Product | data-product | Accent | Gradient |
|---|---|---|---|
| Suite (default) | (none) | Ink `#1E293B` + Spectrum | `#0B1220 to #475569` |
| Recall Health (RH) | `recall` | `#F8941D` Orange | `#F8941D to #FBBE6E` |
| AI Medical Receptionist (Bella) | `receptionist` | `#6E62A8` Heliotrope | `#6E62A8 to #A79BD4` |
| AI Chatbot | `chatbot` | `#4169D1` Cobalt | `#4169D1 to #7B96E8` |
| Appointment Scheduler | `scheduler` | `#0284C7` Sky | `#0284C7 to #38BDF8` |
| Patient Intake | `intake` | `#B07AA1` Mauve | `#B07AA1 to #D3A8C8` |
| Pay My Doc | `paymydoc` | `#16A34A` Green | `#16A34A to #4ADE80` |
| Practice Engine Admin | `admin` | Ink `#1E293B` + Spectrum | `#0B1220 to #475569` |

Pay My Doc owns money green; the Chatbot moved from teal to cobalt so no two products read as green. Practice Engine itself (suite default and Admin) wears Ink + Spectrum: neutral ink for interactive accents with the multicolor spectrum as the brand signature (suite and Admin app tiles are ink with a spectrum stripe). This keeps the platform from competing with any product's hue, including Pay My Doc's green which previously sat too close to the old suite evergreen. The evergreen `--pe-brand-*` family remains available for logo-adjacent tints (landing mesh, dark-band eyebrows).

Rationale for the July 2026 reassignment: RH was mandated to `#F8941D`, so Scheduler moved off orange to teal; Bella's violet was desaturated to a calmer, healthcare-friendly heliotrope; the umbrella brand took green from the logo, so Intake moved from green to rose to keep every hue distinct.

Each theme overrides `--accent`, `--accent-strong`, `--accent-soft`, `--accent-softer`, `--accent-gradient`, and the five chart tokens below. To add a new product: pick an accent family, add one `[data-product="name"]` block in the CSS (including chart tokens), add an `.app-tile-name` gradient for the app switcher, and add its card to the home pages.

## Categorical chart palettes

Every theme carries `--chart-1` through `--chart-5`: the product accent first, then muted friendly companions, slate last. Any chart with multiple series uses them in order via the `.sw-1` to `.sw-5` background utilities (legend swatches, `.mix-bar` segments, `.hbar-fill` fills) or `.bar.c1` to `.bar.c4` on bar charts.

| Theme | chart-1 | chart-2 | chart-3 | chart-4 | chart-5 |
|---|---|---|---|---|---|
| Suite | #334155 | #5B7DA3 | #D9A253 | #A56A8E | #94A3B8 |
| RH | #F8941D | #5B8FA8 | #86A873 | #8D7CC2 | #94A3B8 |
| Bella | #6E62A8 | #56999C | #C489A5 | #D9A253 | #94A3B8 |
| Chatbot | #4169D1 | #6DA873 | #E0A458 | #C489A5 | #94A3B8 |
| Scheduler | #0284C7 | #6DA873 | #D9A253 | #B07AA1 | #94A3B8 |
| Intake | #B07AA1 | #5F9E8F | #7C86C6 | #D9A253 | #94A3B8 |
| Pay My Doc | #16A34A | #4E79A7 | #D9A253 | #A56A8E | #94A3B8 |
| Admin | #334155 | #5B7DA3 | #D9A253 | #A56A8E | #94A3B8 |

Exception: when a chart's series ARE the products themselves (for example PE Admin's product adoption chart), color each series with its product identity token (`--pe-recall`, `--pe-bella`, and so on) instead of the theme's chart tokens, so the chart matches the colors users know each app by.

Each app dashboard includes at least one chart that demonstrates its palette (RH provider revenue pairs and contacts lines, Bella outcomes mix, Chatbot topic bars, Scheduler visit mix, Intake form completion, Pay My Doc payment methods, Admin product adoption).

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
- Cards: `.card` with optional `.card-header / .card-body / .card-footer`; `.card-hover` for interactive lift.
- Stat cards: `.stat-card.stat-edge` (colored left border via `--edge`, cycling through the active chart tokens) is the standard for every app dashboard's metric rows; stat cards never carry icons. `.kpi-card` (4px colored border and tinted fill via `--kpi`) is reserved for a page's two or three headline numbers. The plain `.stat-card` remains only for neutral non-dashboard contexts (settings summaries). Never mix tiers within one row. In equal-height rows (`.grid-4`, `.grid-6`) labels flex so the big values align horizontally.
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
- All demo data must be clearly fictional (suffix names with "(demo)"); never include real patient information (PHI) anywhere in this project. The repo is publicly hosted, so real provider and practice names are also replaced with fictional ones.
- Use standard healthtech terminology patients and staff already know: "intake forms" and "registration" (never "packets"), "patient balances", "payment plans", "recalls", "no-shows", "e-signature", "EHR sync". If a term needs explaining, replace it.
- Keep desktop and mobile versions visually and functionally consistent (mobile currently deferred, see Page inventory).

## Page inventory

| Page | File |
|---|---|
| Suite home (landing) | index.html |
| Sign in | login.html |
| Create account | register.html |
| Recall Health | recall-health.html |
| AI Medical Receptionist | ai-receptionist.html |
| AI Chatbot | ai-chatbot.html |
| Appointment Scheduler | appointment-scheduler.html |
| Patient Intake | patient-intake.html |
| Pay My Doc | pay-my-doc.html |
| Practice Engine Admin | pe-admin.html |
| PE Admin: Practice Settings | pe-admin-practices.html |
| Design system reference | design-system.html |

Mobile pages are deferred by client decision (July 2026): the `-mobile` pages were removed and will be rebuilt later. Rule 4's naming convention still applies when they return. Desktop pages remain responsive down to tablet widths in the meantime.

## Changelog

- 2026-07-22 (v6.2): App top bars now carry the official brand lockup: the `.pe-mark` icon (PE monogram over the spectrum, 32px) beside the `.wm-inline` wordmark, replacing the old gradient grid mark. The obsolete `.brand-mark` component was removed from the CSS.
- 2026-07-22 (v6.1): Added the PE Admin Practice Settings module (pe-admin-practices.html): practice list with master-detail settings across 13 sections (rich Practice Info with representative, PM/EHR systems, maps URLs and full address details; Contact; Locations; Providers; Business Hours; Team; Templates; Branding; Billing; Notifications; Integrations; IT Settings; and Products with activate/deactivate toggles plus per-product configuration). All product dashboards now present the global admin view: Period/Practice/Locations/Providers filter bar and the signed-in Global Admin identity in the topbar. Stat card standard revised: edge stats with chart-token colors on every dashboard, icons removed, values align horizontally in equal-height rows. PE Admin product adoption chart merged its legend into self-labeled bars.
- 2026-07-22 (v6): Platform identity resolved to Ink + Spectrum: the suite default and PE Admin themes now use neutral ink accents with the spectrum as the signature (ink tiles with spectrum stripes), because the old suite evergreen sat too close to Pay My Doc's money green. Pay My Doc keeps green. Landing decluttered: hero pill and card category badges removed, leaving wordmark, headline, subhead, and clean icon-name-tagline cards. Added `.grid-6`; Recall Health's six financial stats now run six across like production.
- 2026-07-22 (v5.2): KPI banner border increased to 4px. Product-name eyebrows removed from all app page headers (the topbar already names the product). PE Admin's product adoption chart now uses product identity colors, and that rule is documented under chart palettes.
- 2026-07-22 (v5.1): Formalized the stat card family as a three-tier system (default, edge stat, KPI banner) with usage rules, and added the variants to the Cards section of design-system.html. These were introduced on the Recall Health rebuild ahead of documentation; the reference page and docs now match the implementation.

- 2026-07-22 (v5): Suite grew to seven products. Added Pay My Doc (money green `#16A34A`) and Practice Engine Admin (brand evergreen control panel for customers, billing, integrations, and system health); Chatbot moved from teal to cobalt `#4169D1` so only Pay My Doc reads as green. The Product Spectrum lockup became the one and only logo (PRACTICE in `#6CAC72`, spectrum rule per product, ENGINE in ink) with size variants including the `.pe-mark` icon and favicons. Added login.html and register.html telling the single sign-on story ("one account, every product"). Recall Health dashboard rebuilt to the production navigation and content (KPI banners, filter bar, edge stats, provider revenue pairs, contacts line chart) with new `.kpi-card`, `.stat-edge`, `.filter-bar`, `.nav-sub` components. App bodies now span full width. Landing: narrower grid-4 cards, Design System and auth buttons in the top bar. Tabs promoted to their own design system section; tab strips no longer show scrollbars. Intake terminology swept ("packets" replaced with intake forms and registration). All mobile pages removed pending a later rebuild.

- 2026-07-22 (v4): Patient Intake accent changed from rose to mauve `#B07AA1` (previously RH's chart-4 companion); RH's chart-4 slot backfilled with soft violet `#8D7CC2`. Product names reverted to Roboto; Good Times/Orbitron is now reserved for the wordmark only. Landing hero pill enlarged, vertical spacing tightened so product cards sit higher. Design System added to the app switcher menu on all product pages (`.app-tile-design`).

- 2026-07-22 (v3): Typography switched to Roboto (UI) and Good Times with Orbitron fallback (brand and product names via `--font-logo`). Chatbot and Scheduler accents swapped (Chatbot now teal, Scheduler now sky). Landing page simplified: centered hero retained after trying a split layout; product cards reduced to icon, badge, name, and tagline with the whole card clickable; hero stats, section header, hero CTAs, and topbar nav removed at client request.

- 2026-07-22 (v2): Brand and color system overhaul. Umbrella brand adopted Evergreen and Ink from the logo with three wordmark lockups (`.pe-wordmark`). Accent reassignment: RH to `#F8941D` orange (mandated), Bella desaturated to heliotrope `#6E62A8`, Scheduler to teal, Intake to rose. Added per-theme categorical chart tokens (`--chart-1..5`) with `.sw-N` / `.bar.cN` utilities, `.mix-bar`, and `.hbar-*` components; each app page now demonstrates its palette in a chart. Landing page redesigned to premium standard (mesh hero, wordmark, richer product cards with taglines and metrics, dark platform band). Added scroll-reveal micro-animations (`data-animate`) and translucent blurred top bars.
- 2026-07-22: Initial system. Tokens, product themes, core components, suite home, five product showcase pages, design system reference, desktop and mobile versions of all pages.
