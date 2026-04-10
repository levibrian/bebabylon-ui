# /brand Page — Design Spec

**Date:** 2026-04-10  
**Status:** Approved  
**Author:** UX Agent

---

## Overview

A hidden brand reference page at `/brand` on bebabylon.com. Accessible via direct URL only — no links or mentions anywhere on the main site. Intended for Brian and anyone who knows the URL exists.

Purpose: a single, always-accurate reference for the Babylon visual identity — tokens, type scale, components, motion, and logo usage.

---

## Access & Routing

- URL: `bebabylon.com/brand`
- Implemented as `brand.html` at the project root (Vite picks it up as a multi-page entry automatically)
- No `<a>` tag, nav item, sitemap entry, or robots reference pointing to it
- No `noindex` needed — obscurity through omission is sufficient

---

## Layout

**Sidebar + scrollable content.** Fixed left sidebar (220px), content area fills the rest up to 860px max-width.

```
┌─────────────┬────────────────────────────────────┐
│  BABYLON    │                                    │
│  Brand Ref  │  Section content                   │
│             │                                    │
│  • Colours  │                                    │
│  • Type     │                                    │
│  • Spacing  │                                    │
│  • …        │                                    │
└─────────────┴────────────────────────────────────┘
```

Sidebar background: `--color-bg-surface` (`#101010`), separated from content by a single `rgba(255,255,255,0.06)` border. No shadow.

Active nav item: `rgba(123,47,190,0.15)` background, white text, purple dot indicator. Inactive: muted text, dark dot.

Scroll tracking via `IntersectionObserver` on the scrollable content pane (not `window`). `rootMargin: '-10% 0px -75% 0px'` — activates when a section enters the top ~25% of the viewport.

---

## Sections

Eight sections, in order. Each has a numbered label (`01 — Foundation`), a heading, and content specific to its topic.

### 01 — Colours

Three sub-groups with uppercase labels:

- **Backgrounds:** `--color-bg-base`, `--color-bg-surface`, `--color-bg-elevated`
- **Text:** `--color-text-primary`, `--color-text-secondary` (two variants — site `#D4D4D4` and app `#A3A3A3`), `--color-text-muted`, `--color-text-ghost`
- **Interactive & Semantic:** `--color-accent`, `--color-accent-hover`, `--color-gain`, `--color-loss`, `--color-warning`, `--color-info`

Each swatch: colour block (56px tall) + token name in JetBrains Mono + hex value. Note on `--color-accent`: "interactive only" annotation.

### 02 — Typography

Table of type styles, each row: token name / size / weight metadata (left, 160px, JetBrains Mono) + live rendered sample (right).

Rows: `display-1`, `display-2`, `heading-1`, `heading-2`, `body-lg`, `body`, `label`, `mono · data only`.

The mono row demonstrates financial data: `+£12,450.00` in white with gain value in `--color-gain`.

### 03 — Spacing

4px grid. All `--space-N` tokens shown as a left-aligned bar (purple, `opacity: 0.7`) with token name and pixel value. Bar width = the actual pixel value. Tokens: 1–32 (all values from both `@babylon/tokens` and site extensions).

### 04 — Components

Live, interactive components rendered in dark demo containers (`#0f0f0f`). Four blocks:

| Block | Contents |
|-------|----------|
| Buttons | `neon-btn` (default + lg), `ghost-btn` — **Inter font** (updated spec, see note below) |
| Badges | `badge--gain`, `badge--loss`, `badge--neutral` |
| Glass Card | Rendered card with label, mono value, badge |
| Allocation Bar | Coloured segments with legend |

### 05 — Motion

Three hover-demo boxes (80×80px, `--color-accent` fill) — one per duration token. Hovering scales to 1.2×. All use `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). Token name and ms value labelled below each box.

### 06 — Raw Tokens

All CSS variables resolved at runtime via `getComputedStyle(document.documentElement)`. Rendered as a scrollable list of rows: token name (purple, JetBrains Mono) | resolved value (muted) | "COPY" hint (ghost, turns purple on hover). Clicking a row copies the token name to clipboard via `navigator.clipboard.writeText()`.

Token names are read dynamically — the list stays accurate as `@babylon/tokens` is updated.

### 07 — Radii & Shadows

**Radii:** Six square boxes (72×72px, `--color-bg-elevated`) with increasing `border-radius`: `xs` (2px), `sm` (4px), `md` (6px), `lg` (10px), `card` (16px), `full`. Token name + value below each.

**Shadows:** Five demo cards showing `shadow-sm`, `shadow-card`, `shadow-modal`, `shadow-neon`, `shadow-focus`.

### 08 — Logo & Brand

Two logo lockups side by side:
- **On dark (preferred):** `#080808` background, `mix-blend-mode: lighten` on the PNG, white wordmark
- **On light:** `#f0f0f0` background, no blend mode, dark wordmark

Usage rules listed below (plain text, `--color-text-muted`):
- ✓ Always pair orb with BABYLON wordmark
- ✓ Minimum clear space: logo height on all sides
- ✗ Do not recolour the orb
- ✗ Do not use accent purple on body text
- ✗ Do not use logo on busy or coloured backgrounds

---

## Typography Rule Update

This page formalises a correction to the existing `components.css`:

| Element | Before | After |
|---------|--------|-------|
| `.neon-btn` | JetBrains Mono | **Inter** |
| `.ghost-btn` | JetBrains Mono | **Inter** |

**Rationale:** JetBrains Mono is reserved for financial data (numbers, tickers, values). Using it on action labels dilutes its semantic signal and is inconsistent with Checkout.com and Stripe, both key design references. Inter at 14px/600 is more legible on buttons, especially on mobile.

The `components.css` update ships as part of this ticket's implementation.

---

## Implementation Notes

- **File:** `brand.html` at project root. Imports existing `src/styles/index.css` (which pulls in tokens, reset, typography, components via `@import`).
- **Script:** Inline `<script>` at bottom of `brand.html` handles IntersectionObserver nav tracking, copy-to-clipboard, and dynamic token enumeration via `getComputedStyle`.
- **Logo:** `<img src="/babylon_logo.png">` — served from `public/` by Vite, same as on `index.html`.
- **No build config changes** — Vite auto-discovers HTML files at root as entry points.
- **`components.css`:** Update `.neon-btn` and `.ghost-btn` to use `var(--font-sans)` instead of `var(--font-mono)`.
- **`.superpowers/`** should be in `.gitignore`.

---

## Out of Scope

- No mobile layout (this is a personal reference tool, desktop only is acceptable)
- No search or filtering of tokens
- No dark/light mode toggle (always dark)
- No authentication or access control
