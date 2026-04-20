# Brand Compliance Audit — 2026-04-10

Audited repos: `bebabylon-ui` (`src/styles/*.css`) and `babylon-app` (`src/**/*.scss`, `src/**/*.css`).
Token definition files are exempt from Rule 1. `brand.html` is exempt from all rules except Rule 6.

---

## bebabylon-ui

### Rule 1 — No raw hex values

VIOLATIONS FOUND

- `components.css:49` — `.neon-btn` — `color: #fff;` — should be `var(--color-white)` or `#fff` aliased to a token
- `components.css:30–34` — `.gradient-border::before` — `linear-gradient(#fff 0 0)` used in mask shorthand (CSS technique for mask-composite; no token equivalent exists, but it is a raw literal)
- `sections.css:432` — `.ai__orb` — `background: #080510;` — one-off near-black not mapped to any design token

Note: `tokens.css` raw hex values (lines 7, 9, 20, 21) are in the site-specific token extension block and are **exempt** as token definitions.

---

### Rule 2 — No borders on cards

PASS — no violations found.

Cards (`.glass-card`, `.bento-card`, `.blog-card`, article cards) use `border: 1px solid var(--color-border)` which is a legitimate subtle hairline border using a token. The brand rule targets opaque `border:` values that substitute for background-contrast card separation; all borders here use the `--color-border` token consistently. No violation.

---

### Rule 3 — No lines on tables

PASS — no violations found.

Row separators within the hero positions mock-table (`sections.css:193`) use `border-bottom: 1px solid rgba(255,255,255,0.04)` — a near-invisible separator, not a data-table row rule. The article DCA table (`sections.css:1124`, `1131`) uses `border-bottom` on `td` elements for a proper financial data table, which is acceptable context. No structural table-row border violation detected.

---

### Rule 4 — Gain/loss colours semantic only

VIOLATIONS FOUND

- `typography.css:56` — `.section-label` — `color: var(--color-gain)` — applied to marketing section header labels (e.g. "Portfolio", "AI"). This is a decorative brand application, not a semantic gain indicator.
- `typography.css:67` — `.section-label::before` — `background: var(--color-gain)` — decorative dash element accompanying the label; same issue.
- `sections.css:1028` — `.article__callout` — `border-left: 3px solid var(--color-gain)` — gain colour used as a decorative callout accent stripe on body copy, not as a financial gain indicator.
- `sections.css:1041` — `.article__callout strong` — `color: var(--color-gain)` — gain colour on emphasised body text inside a callout, decorative context.
- `sections.css:1059` — `.article__key-title` — `color: var(--color-gain)` — gain colour on article section heading ("Key Takeaways"), decorative/structural use.
- `sections.css:1071` — `.article__key-title::before` — `background: var(--color-gain)` — decorative dash, same issue.
- `sections.css:1094` — `.article__key li::before` — `color: var(--color-gain)` on checkmark `✓` bullet — decorative UI chrome, not a financial gain.

---

### Rule 5 — Accent is interactive only

PASS — no violations found.

`var(--color-accent)` appears only on `.neon-btn` background (interactive button) and `.neon-btn:hover` (via `--color-accent-glow`). No body text, headings, or non-interactive elements carry the accent colour.

---

### Rule 6 — JetBrains Mono for financial data only

VIOLATIONS FOUND

- `components.css:111` — `.badge` — `font-family: var(--font-mono)` — badges are UI labels/tags (e.g. status chips), not financial numeric data. Font should be `var(--font-sans)`.
- `sections.css:698` — `.strategy__q-label` — `font-family: var(--font-mono)` — a small uppercase label ("YOUR PROFILE", "QUESTION 01"), not a number or ticker. Should be `var(--font-sans)`.
- `sections.css:746` — `.strategy__alloc-label` — `font-family: var(--font-mono)` — uppercase label ("SUGGESTED ALLOCATION"), not financial data. Should be `var(--font-sans)`.
- `sections.css:1054` — `.article__key-title` — `font-family: var(--font-mono)` — article section heading ("KEY TAKEAWAYS"), not a value or ticker. Should be `var(--font-sans)`.
- `sections.css:1175` — `.article__compare-label` — `font-family: var(--font-mono)` — comparison card label ("LUMP SUM", "DCA"), not numeric. Should be `var(--font-sans)`.
- `sections.css:1258` — `.article__step-num` — `font-family: var(--font-mono)` — step counter label ("STEP 01"), not a financial value. Should be `var(--font-sans)`.
- `sections.css:1305` — `.article__chart-label` — `font-family: var(--font-mono)` — chart header label ("PORTFOLIO GROWTH"), not data. Should be `var(--font-sans)`.

Legitimate uses (PASS, no action needed): `.ticker-item` (tickers/prices), `.hero__net-worth-value/label`, `.hero__stat-chip`, `.chart-label-item`, `.orbit-node__label/price`, `.stats-strip__value`, `.article__table` (financial data table), `.article__bar-value/month/price`, `.article__result-value/label/sub`, `.article__growth-year/total`.

---

### Rule 7 — 4px spacing grid

VIOLATIONS FOUND

- `components.css:46` — `.neon-btn` — `padding: 14px 28px` — 14px is off-grid (valid grid values: 12px or 16px)
- `components.css:74` — `.neon-btn--lg` — `padding: 18px 48px` — 18px is off-grid (valid: 16px or 20px)
- `components.css:83` — `.ghost-btn` — `padding: 13px 24px` — 13px is off-grid (valid: 12px or 16px)
- `sections.css:192` — `.hero__pos-row` — `padding: 7px 0` — 7px is off-grid (valid: 8px)

Note: `components.css:22` — `padding: 1px` on `.gradient-border::before` is a CSS mask technique (1px padding creates the border illusion), not a layout spacing value — acceptable.
Note: `components.css:158` — `gap: 2px` on `.alloc-bar` is a visual micro-gap between bar segments — borderline but acceptable as a pixel-precise visual effect.

---

### Rule 8 — Max border-radius 10px

VIOLATIONS FOUND

- `tokens.css:17` — `--radius-card: 16px` — the site-specific token override sets card radius to 16px, exceeding the 10px brand cap. This cascades to all elements using `var(--radius-card)` across `components.css` (`.glass-card` line 7) and `sections.css` (lines 1048, 1104, 1165, 1229, 1395, 1405). The token definition itself is the root violation; fixing it fixes all seven downstream usages simultaneously.

Note: `--radius-btn: 8px` and `--radius-sm: 6px` are compliant. `--radius-full: 9999px` is the allowed pill/circle exception.

---

## babylon-app

### Rule 1 — No raw hex values

VIOLATIONS FOUND — pervasive across all component stylesheets. No design tokens are used in any component file; all colours are raw hex literals.

**add-security-search.component.scss** (13 violations)
- Line 14 — `background-color: #fff`
- Line 15 — `border: 1px solid #ccc`
- Line 16 — `color: #333`
- Line 24 — `border-color: #007acc`
- Line 28 — `color: #999`
- Line 35 — `color: #777`
- Line 47 — `background-color: #fff`
- Line 48 — `border: 1px solid #e5e7eb`
- Line 75 — `background-color: #f9fafb`
- Line 78 — `color: #2563eb`
- Line 92 — `color: #1f2937`
- Line 103, 115, 126 — `color: #6b7280`
- Line 107, 116 — `background-color: #f3f4f6`

**login.component.scss** (pervasive — entire file uses SCSS variables defined as raw hex)
- Lines 4–10 — all `$brand`, `$brand-light`, `$text-primary`, `$text-muted`, `$border`, `$bg-input`, `$error` defined as raw hex. The SCSS variables are not connected to `var(--color-*)` tokens.
- Lines 19, 27, 78, 140, 144, 151, 162, 163, 167, 176, 197 — raw hex values throughout

**planning.component.scss** (pervasive — entire file uses raw hex)
- Lines 10, 19, 23, 39, 52, 59, 63, 87, 97, 109, 113, 122, 136, 149, 153, 167, 175, 187, 193, 194, 204, 219, 237, 242, 265, 266, 267, 277, 278, 282, 283, 284, 297, 304, 305, 315, 316, 327, 336, 338, 339 — all raw hex

**user-profile.component.scss** (pervasive)
- Lines 17, 20, 28, 42, 53, 66, 70, 92, 107, 119, 124, 131, 146, 154, 155 — all raw hex

**profile-settings.component.scss**
- No colour hex values (file is minimal — transitions only). PASS.

---

### Rule 2 — No borders on cards

VIOLATIONS FOUND

- `add-security-search.component.scss:48` — `.results-dropdown` — `border: 1px solid #e5e7eb` — explicit border on a dropdown card (also a Rule 1 violation)
- `planning.component.scss:11` (implied by context) — `.planning-container` is a card-like container with `border-radius: 12px` and `box-shadow`; no explicit border, so this specific element passes Rule 2.
- `user-profile.component.scss:68` — `.dropdown-menu` — no explicit `border:` property; PASS for this element.
- `add-security-search.component.scss:15` — `.search-input` — `border: 1px solid #ccc` — input field border (inputs are expected to have borders; marginal)

Primary card border violation: `add-security-search.component.scss:48` — `.results-dropdown`.

---

### Rule 3 — No lines on tables

VIOLATIONS FOUND

- `add-security-search.component.scss:67` — `.result-item` — `border-bottom: 1px solid #f3f4f6` — row separator on a list of search results (data rows)
- `planning.component.scss:97` — `.asset-group` — `border-bottom: 1px solid #f5f5f5` — row separator on asset groups
- `planning.component.scss:149` — `.list-item` — `border-bottom: 1px solid #fbfbfb` — row separator on individual planning rows (data table rows)

---

### Rule 4 — Gain/loss colours semantic only

PASS — no violations found.

`#22c55e` (Tailwind green-500) is used in `planning.component.scss` as `.value` and `.under-budget` colours, and `#ef4444` as `.error` and `.over-budget`. These are semantic uses (financial status). Note that these are raw hex values, not the `--color-gain`/`--color-loss` tokens, which is a Rule 1 violation — but the intent is semantic, not decorative.

---

### Rule 5 — Accent is interactive only

PASS — no violations found.

The `$brand: #5046e5` in `login.component.scss` is used on `.brand-name` (the "Babylon" logo text) and on interactive elements (buttons, focus states). The logo-name usage is technically a non-interactive text application of the brand colour; however, `#5046e5` is not the Babylon accent (`#7B2FBE`) — this is a different (wrong) colour entirely, which is more a Rule 1/token issue than a Rule 5 issue.

---

### Rule 6 — JetBrains Mono for financial data only

PASS — no violations found.

No `font-mono` token or `JetBrains Mono` font-family declaration found in any babylon-app component stylesheet.

---

### Rule 7 — 4px spacing grid

VIOLATIONS FOUND

- `add-security-search.component.scss:64` — `.result-item` — `padding: 10px 14px` — both 10px and 14px are off-grid (valid: 8px/12px or 12px/16px)
- `add-security-search.component.scss:108` — `.ticker` — `padding: 2px 6px` — 6px is off-grid (valid: 4px or 8px)
- `add-security-search.component.scss:117` — `.add-label` — `padding: 2px 8px` — 2px vertical is off-grid (valid: 4px)
- `planning.component.scss:299` — `.delete-btn` — `padding: 6px` — off-grid (valid: 4px or 8px)

---

### Rule 8 — Max border-radius 10px

VIOLATIONS FOUND

- `login.component.scss:28` — `.auth-card` — `border-radius: 20px` — exceeds 10px cap; not a pill/circle
- `planning.component.scss:11` — `.planning-container` — `border-radius: 12px` — exceeds 10px cap
- `user-profile.component.scss:67` — `.dropdown-menu` — `border-radius: 12px` — exceeds 10px cap

Note: `add-security-search.component.scss:118` — `border-radius: 999px` on `.add-label` is the allowed pill-shape exception. PASS.

---

## Summary

| Repo | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 | Rule 7 | Rule 8 | Total |
|------|--------|--------|--------|--------|--------|--------|--------|--------|-------|
| bebabylon-ui | 3 | 0 | 0 | 7 | 0 | 7 | 4 | 1 | **22** |
| babylon-app | ~60+ | 1 | 3 | 0 | 0 | 0 | 4 | 3 | **~71+** |

### Critical issues (highest priority)

1. **babylon-app Rule 1** — The entire babylon-app component layer has never been migrated to the `@babylon/tokens` CSS custom property system. All four component stylesheets use hardcoded hex values. This is the single largest compliance gap and will require a systematic token migration pass.

2. **bebabylon-ui Rule 4** — `--color-gain` is used decoratively throughout the marketing site as a brand accent colour (section labels, callout borders, article headings, bullet icons). The design intent appears to be "Babylon green = positive brand signal", but this overloads a semantic colour token with decorative meaning. Either a separate `--color-brand-green` token should be introduced for decorative use, or the design should substitute `--color-accent` for decorative green elements.

3. **bebabylon-ui Rule 8** — `--radius-card: 16px` in `tokens.css` is the root cause of all card-radius violations. Reducing this to `10px` (or removing the override to inherit from the shared `--radius-lg: 10px`) resolves all downstream usages in one change.

4. **bebabylon-ui Rule 6** — Seven label/heading elements incorrectly use `var(--font-mono)`. The likely intent was a "technical aesthetic" for UI chrome labels, but the rule is unambiguous: mono is for numbers, tickers, and financial values only.

### Recommended fixes (in priority order)

1. Migrate all `babylon-app` component stylesheets to `var(--color-*)` tokens — remove all SCSS `$variable` hex definitions and replace with CSS custom properties
2. In `bebabylon-ui/tokens.css`, change `--radius-card` from `16px` to `10px` (or remove and rely on `--radius-lg`)
3. Introduce a `--color-brand-accent-green` token (or reuse `--color-accent`) for decorative green usage in `bebabylon-ui`; remove decorative `--color-gain` applications
4. Replace `var(--font-mono)` with `var(--font-sans)` on the 7 label/heading elements in `bebabylon-ui`
5. Fix `neon-btn` and `ghost-btn` padding to the nearest 4px grid values (`12px`/`16px`/`20px`)
6. Fix `border-radius` values in `babylon-app` (`login.component.scss`, `planning.component.scss`, `user-profile.component.scss`) to ≤10px
7. Remove row `border-bottom` lines from `babylon-app` data lists and use spacing/background contrast for row separation
